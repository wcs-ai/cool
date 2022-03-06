<template>
  <div class="cool-tree">
    <div class="tree--row" v-if="nodes" v-for="(m,x) in nodes" :key="x">
      <!--路径展示部分-->
      <div class="label">{{ m.label }}</div>
      <p class="children">
        <cool-tree :nodes="m.children"/>
      </p>
    </div>
  </div>
</template>
<script>
// 移动端，树形选择组件
export default {
  name: "cool-tree",
  props: {
    // 已选节点
    checkedList: {},
    // 节点数据
    nodes: {
      type: Array,
      default: function(){
        return [];
      }
    },
    // 属性配置
    props: {
      type: Object,
      default: function() {
        return {
          // 指定使用的label-key
          label: "",
          // 指定使用的value-key
          value: ""
        };
      }
    },
  }
};
</script>
<style scoped></style>
