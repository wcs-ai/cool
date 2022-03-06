import tree from "./tree.vue";

tree.install = function(vue){
  vue.component(tree.name,tree);
}

export default tree;

