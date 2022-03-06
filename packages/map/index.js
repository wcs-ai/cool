import map from "./map.vue";

map.install = function(vue){
  vue.component(map.name,map);
}

export default map;