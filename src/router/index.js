import Vue from 'vue'
import Router from 'vue-router'
// import FrontPage from '@/components/FrontPage'
import Console from '@/components/Console'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'FrontPage',
      component: Console
    }
    // {
    //   path: '/cmd/',
    //   name: 'Console',
    //   component: Console
    // }
  ]
})
