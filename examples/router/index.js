import Vue from 'vue'
import Router from 'vue-router'
import table from '@/pages/excelTable';
import map from "@/pages/map";
import antvDemo from "@/pages/antvDemo";
Vue.use(Router);


export default new Router({
  routes: [
    {
      path: '/antvDemo',
      name: 'antvDemo',
      component: antvDemo
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
      path: '/eye',
      name: 'eye',
      component: ()=>import("@/pages/eye.vue")
    },
    {
      path: '/flex',
      name: 'flex',
      component: ()=>import("@/pages/flex.vue")
    },
    {
      path: '/zuiti',
      name: 'zuiti2',
      component: ()=>import("@/pages/zuiti.vue")
    },
    {
      path: '/tree',
      name: 'tree',
      component: ()=>import("@/pages/tree.vue")
    },{
      path: '/',
      name: 'chess',
      component: ()=>import("@/pages/chess/index.vue")
    }
  ]
})
