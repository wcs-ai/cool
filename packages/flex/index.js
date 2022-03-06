import flex from "./flex.vue";

flex.install = function(vue){
  vue.component(flex.name,flex);
}

export default flex;