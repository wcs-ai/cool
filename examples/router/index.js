import Vue from 'vue'
import Router from 'vue-router'
import table from '@/pages/excelTable';
import map from "@/pages/map";

Vue.use(Router);


export default new Router({
  routes: [
    {
      path: '/',
      name: 'map',
      component: map
    },
    {
      path: '/table',
      name: 'table',
      component: table
    },
    {
      path: '/draggle',
      name: 'draggle',
      component: ()=>import("@/pages/draggle.vue")
    },
    {
      path: '/tree',
      name: 'tree',
      component: ()=>import("@/pages/tree.vue")
    }
  ]
})
