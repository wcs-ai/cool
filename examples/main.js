import Vue from 'vue'
import App from './App'
import router from './router'
import cool from "../packages";

Vue.use(cool);

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
