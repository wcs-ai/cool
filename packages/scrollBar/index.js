import scroll from "./scroll.vue";

scroll.install = function(vue){
  vue.component(scroll.name,scroll);
}

export default scroll;