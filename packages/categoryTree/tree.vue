<template>
  <div class="content column-start-center reTree_box">
    <lineItem
      ref="node-00"
      v-on="$listeners"
      :list.sync="formatData"
      :lazy="lazy"
      :level="0"
      :config="config"
      :queryParams="queryParams"
      :parentNode="parentNode"
      @itemClick="nodeClick"
      @loadEnd="loadEnd"
      @expand="expand"
      @op="ops"
    ></lineItem>
  </div>
</template>
<script>
import lineItem from "./lineItem.vue";
export default {
  inheritAttrs: false,
  props: {
    data: {
      type: Array,
      default: function() {
        return [];
      }
    },
    config: {
      type: Object,
      default: function() {
        return {
          key: "id",
          children: "list",
          label: "name",
          rightMenu: true,
          // 标记的节点，keys
          markNodes: []
        };
      }
    },
    parentNode: {
      type: Object,
      default: function() {
        return {
          id: "root",
          name: "root"
        };
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
    }
  },
  components: { lineItem },
  data() {
    return {
      selectedDetail: {},
      timer: {},
      formatData: [],
      rootNode: {
        id: "root",
        label: "根节点(不显示)"
      }
    };
  },
  watch: {
    data(n, o) {
      console.info("n--", n);
      this.formatData = this.preDealData(n);
    }
  },
  created() {
    this.formatData = this.preDealData(this.data);
  },

  methods: {
    preDealData(list) {
      list.forEach(x => {
        if (!x.expand) this.$set(x, "expand", false);
        if (x.children && x.children.length > 0) this.preDealData(x.children);
      });
      return list;
    },
    // 根据id展开树的具体项
    expandTreeItemById(idList) {
      let _this = this;

      function loopTree(list) {
        list.forEach(x => {
          if (idList.includes(x.id)) {
            _this.$set(x, "expand", true);
          } else {
            _this.$set(x, "expand", false);
          }
          if (x.children && x.children.length > 0) loopTree(x.children);
        });
        return list;
      }
      this.formatData = loopTree(this.data);
    },
    nodeClick(item) {
      this.$emit("nodeClick", item);
    },
    // 菜单功能点击
    ops(mark, node) {
      this.$emit("op", mark, node);
    },
    loadEnd(data) {
      this.$emit("loadEnd", data);
    },
    expand(m) {
      this.$emit("expand", m);
    },
    // 标记指定id
    markNodes(keys) {
      this.$refs["node-00"].markNodes(keys);
    },
    appendNode(key, data) {
      this.$refs["node-00"].appendNode(key, data);
    },
    updateNode(key, data) {
      this.$refs["node-00"].updateNode(key, data);
    },
    removeNode(key) {
      this.$refs["node-00"].removeNode(key);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./node.scss";

.active_color {
  color: #409eff;
}
.reTree_box {
  overflow-y: auto;
  height: 100%;
  margin-left: -30px;
  overflow: visible;
}
.reTree_icon {
  &::before {
    display: none;
  }
}

.first_vertical_line {
  content: "";
  position: absolute;
  width: 1px;
  left: 6px;
  top: 17px;
  background: #c3c5c8;
}

.second_layer {
  position: relative;
  width: 100%;
  cursor: pointer;
  padding-left: 25px;
}
.third_layer {
  position: relative;
  padding-bottom: 15px;
  width: 100%;
  padding-left: 40px;
  color: #999999;
}

.second_layer::before {
  content: "";
  position: absolute;
  height: 1px;
  width: 16px;
  left: 9px;
  top: 9px;
  background: #c3c5c8;
}
.third_layer::before {
  content: "";
  position: absolute;
  height: 1px;
  width: 20px;
  left: 9px;
  top: 9px;
  background: #c3c5c8;
}

.linkLine_default::after {
  content: "";
  position: absolute;
  height: 100%;
  width: 1px;
  left: 9px;
  top: 0px;
  background: #c3c5c8;
}
.linkLine_first::after {
  content: "";
  position: absolute;
  /* 为了触顶 */
  top: -14px;
  height: calc(100% + 14px);
  width: 1px;
  left: 9px;
  background: #c3c5c8;
}
// 上半截
.linkLine_half_top::after {
  content: "";
  position: absolute;
  height: 24px;
  top: -14px;
  width: 1px;
  left: 9px;
  background: #c3c5c8;
}
.linkLine_last::after {
  content: "";
  position: absolute;
  height: 9px;
  width: 1px;
  left: 9px;
  top: 0px;
  background: #c3c5c8;
}
</style>
