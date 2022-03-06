<template>
  <div class="tree_item_box" :class="{ level0: level == 0 }">
    <div
      class="column-start-start linkLine_default"
      v-for="(item, s_index) in list"
      :key="s_index"
      :class="{
        second_layer: !item.expand || !item[config.children]
      }"
    >
      <div
        class="row-flex-start basic_banner"
        :class="{
          active_color: item.expand,
          loading: loadingIx == s_index
        }"
        @contextmenu.prevent.stop="ability($event, item, s_index)"
        @click="nodeClick(item, s_index)"
      >
        <div
          class="reTree_icon"
          :class="{
            reTree_icon_level0: level === 0,
            loading: loadingIx == s_index
          }"
          @click.stop="itemClick(item, s_index)"
        >
          <i class="row"></i>
          <i class="colomn" v-show="iconStatus(item, s_index)"></i>
        </div>
        <div
          class="layer_text nowrap"
          :class="{
            active_color: item.expand,
            mark_color: isMark(item[config.key]) || markIndexs.includes(s_index)
          }"
        >
          {{ item[config.label] }}
        </div>
      </div>
      <!--右键菜单-->
      <div
        class="ability-menu"
        :style="{ left: menuLeft }"
        v-on:mouseover="hoverMenu"
        v-on:mouseleave="hiddenMenu"
        v-show="s_index == nowIndex"
      >
        <p
          v-hasPermi="['business:commodityType:add']"
          @click="op('append', item)"
        >
          添加
        </p>
        <p
          v-hasPermi="['business:commodityType:delete']"
          @click="op('delete', item)"
        >
          删除
        </p>
        <p
          v-hasPermi="['business:commodityType:edit']"
          @click="op('edit', item)"
        >
          编辑
        </p>
      </div>
      <!--:style="{ maxHeight: boxHeight + 'px' }"-->
      <div
        class="children-box"
        v-show="item.expand"
        :style="{ height: item._h }"
      >
        <p class="line" :style="lineStyle(s_index)"></p>
        <div class="hide-line" v-show="judgeLast(s_index) && isLast"></div>

        <line-item
          :ref="'node-' + item.id"
          :list.sync="item[config.children]"
          v-on="$listeners"
          :level="level + 1"
          :lazy="lazy"
          :config="config"
          :queryParams="queryParams"
          :isLast="judgeLast(s_index)"
          :parentNode="item"
          @op="op"
        ></line-item>
      </div>
    </div>
  </div>
</template>
<script>
import { categoryApi } from "@/api/goodsInfo/index.js";
var countTime = null;
export default {
  name: "line-item",
  inject: ["marKeyArray", "trag"],
  props: {
    list: {
      type: Array,
      default: () => {
        return [];
      }
    },
    // 懒加载（点击时加载）
    lazy: {
      type: Boolean,
      default: false
    },
    // 懒加载函数
    loadFunction: {
      type: Object
    },
    isLast: {
      type: Boolean,
      default: true
    },
    // 节点所处层级
    level: {
      type: Number,
      default: 0
    },
    parentNode: {
      type: Object,
      default: function() {
        return {
          id: "00",
          name: "root"
        };
      }
    },
    // 查询子节点接口参数
    queryParams: {
      type: Object,
      default: function() {
        return {
          pageNum: "",
          pageSize: "",
          merchantId: "",
          deptId: "",
          name: ""
        };
      }
    },
    // 配置
    config: {
      type: Object,
      default: function() {
        return {
          key: "id",
          children: "children",
          label: "name",
          rightMenu: false
        };
      }
    }
  },
  data() {
    return {
      loading: true,
      loadingIx: -1,
      boxHeight: 0,
      loaded: false,
      showMenu: false,
      nowIndex: -1,
      menuLeft: "100px",
      // 弹框
      open: false,
      opType: "alter",
      markIndexs: []
    };
  },
  methods: {
    // 查询
    isMark(id) {
      const keys = this.marKeyArray();
      return keys.includes(id);
    },
    async itemClick(item, ix) {
      let _c = this.config.children;

      // 判断是否懒加载
      if (this.lazy) {
        if (!item._loaded) {
          //加载
          let data = await this.lazyLoading(item, ix);
          let _exp = data.length > 0 ? true : false;
          let _c = this.config.children;

          this.$emit("loadEnd", data);
          // 添加数据
          this.$set(this.list[ix], "expand", _exp);
          this.$set(this.list[ix], _c, data);
          this.$set(this.list[ix], "_loaded", true);
          // update
          this.expandChildren(item, ix);
          //this.$forceUpdate();
          // 动画结束
          setTimeout(() => {
            this.loadingIx = -1;
          }, 500);
        } else {
          // 已加载过情况
          item.expand = !item.expand;
          this.expandChildren(item, ix);
        }
      } else {
        if (item[_c] instanceof Array && item[_c].length > 0)
          item.expand = !item.expand;
        else item.expand = false;
        // 展开
        this.$nextTick(() => {
          this.expandChildren(item, ix);
        });
      }

      setTimeout(() => {
        let arr = this.marKeyArray();
        this.markNodes(arr);
      }, 250);
    },
    lazyLoading(node, ix) {
      if (node._loaded) return;

      //动画开始
      this.loadingIx = ix;
      const _k = this.config.key;

      let _d = Object.assign({}, this.queryParams, {
        parentId: node[this.config.key]
      });
      return new Promise((resolve, reject) => {
        categoryApi
          .getChildrenList(_d)
          .then(res => {
            if (res.respCode == "00") {
              let c = res.rows || [];

              resolve(c);
            } else {
              reject([]);
            }
          })
          .catch(() => {
            reject([]);
          });
      });
    },
    // 展开子节点
    expandChildren(item, ix) {
      let _c = this.config.children;
      let ht = item.expand && item[_c] && item[_c].length > 0 ? "auto" : "0px";
      let _m = ht == "auto" ? "expand" : "collaps";

      this.$set(this.list[ix], "_h", ht);
      this.$emit("expand", _m);
    },
    iconStatus(node) {
      var _c = this.config.children;
      //console.info("ode--", node);
      if (!this.lazy) {
        if (node[_c] && node[_c].length > 0) return !node.expand;
        else if (!node[_c] || node[_c].length === 0) return false;
      } else {
        // 懒加载情况
        if (node._loaded) {
          return node[_c] && node[_c].length > 0 && !node.expand;
        } else {
          // 未懒加载过
          return true;
        }
      }
    },

    lineStyle(six) {
      if (six === this.list.length - 1) {
        return {
          height: "10px",
          bottom: "-2px",
          left: "-3px",
          border: "none",
          "background-color": "white"
        };
      } else {
        return {
          height: "21px",
          left: "-1px",
          "border-left": "1px dashed #dfdfdf",
          bottom: "-20px"
        };
      }
    },
    assitLineHeight(item) {
      let len;
      try {
        len = item[this.config.children].length;
      } catch (e) {
        len = 0;
      }
      return 36 * len + "px";
    },

    nodeClick(item, ix) {
      this.$emit("itemClick", item);
    },

    // 右键菜单部分
    ability(e, data, idx) {
      if (this.config.rightMenu === false) return;
      // 位置控制
      this.menuLeft = e.offsetX + 50 + "px";
      // 显示菜单
      this.$nextTick(() => {
        this.nowIndex = idx;
      });
      this.hiddenMenu();
    },
    // 隐藏右键菜单
    hiddenMenu() {
      countTime = setTimeout(() => {
        this.nowIndex = -1;
      }, 3000);
    },
    // 鼠标放在菜单时
    hoverMenu() {
      window.clearTimeout(countTime);
    },
    op(mark, node) {
      this.$emit("op", mark, node);
    },
    // 标记指定id
    markNodes(keys) {
      let _k = this.config["key"];
      // 父节点时使用其孩子
      let _ls = this.level == 0 ? this.list[0][_k] : this.list;

      this.markIndexs = [];

      for (let i = 0, len = _ls.length, fs, ix; i < len; i++) {
        ix = keys.indexOf(_ls[i][_k]);
        // 迭代调用
        fs = this.$refs["node-" + _ls[i][_k]] || [];

        fs.map(v => {
          v.markNodes(keys);
        });
        // 添加标记
        if (ix !== -1) {
          this.markIndexs.push(i);
        } else continue;
      }
    },
    appendNode(key, node) {
      let _ls = this.list;
      let _k = this.config["key"];

      if (key == this.parentNode[this.config.key]) {
        _ls.push(node);
      } else {
        // 执行每个组件的添加
        for (let i = 0, len = _ls.length, fs; i < len; i++) {
          fs = this.$refs["node-" + _ls[i][_k]] || [];
          fs.map(v => {
            v.appendNode(key, node);
          });
        }
      }
    },
    removeNode(key) {
      let _ls = this.list;
      let _k = this.config["key"];
      let _ix = -1;
      // 节点位置
      for (let i = 0, len = _ls.length; i < len; i++) {
        if (key == _ls[i][_k]) {
          _ix = i;
        }
      }

      if (_ix == -1) {
        // 执行每个组件的移除
        for (let i = 0, len = _ls.length, fs; i < len; i++) {
          fs = this.$refs["node-" + _ls[i][_k]] || [];
          fs.map(v => {
            v.removeNode(key);
          });
        }
      } else {
        _ls.splice(_ix, 1);
      }
    },
    updateNode(key, node) {
      let _ls = this.list;
      let _k = this.config["key"];
      //深度优先
      for (let i = 0, len = _ls.length, fs; i < len; i++) {
        if (key != _ls[i][_k]) {
          fs = this.$refs["node-" + _ls[i][_k]] || [];
          fs.map(v => {
            v.updateNode(key, node);
          });
        } else {
          Object.assign(_ls[i], node);
        }
      }
    },
    judgeLast(ix) {
      return ix === this.list.length - 1;
    }
  }
};
</script>
<style lang="scss">
@import "./node.scss";
</style>
