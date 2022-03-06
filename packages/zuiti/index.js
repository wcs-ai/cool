import zuiti from "./zuiti.vue";

zuiti.install = function(vue){
  vue.component(zuiti.name,zuiti);
}

export default zuiti;

