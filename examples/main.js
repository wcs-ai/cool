import Vue from 'vue'
import App from './App'
import router from './router'
import cool from "../packages";
import "./assets/css/common.css";

Vue.use(cool);

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
