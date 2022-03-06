import eye from "./eye.vue";

eye.install = function(vue){
  vue.component(eye.name,eye);
}

export default eye;