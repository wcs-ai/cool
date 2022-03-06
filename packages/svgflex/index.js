import svgflex from "./svgflex.vue";

svgflex.install = function(vue){
  vue.component(svgflex.name,svgflex);
}

export default svgflex;