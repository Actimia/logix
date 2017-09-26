import Vue from 'vue'
import Router from 'vue-router'
// import FrontPage from '@/components/FrontPage'
import Console from '@/components/Console'
import CssTest from '@/components/CssTest'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'FrontPage',
      component: Console
    },
    {
      path: '/test/',
      name: 'CssTest',
      component: CssTest
    },
    {
      path: '*',
      component: {
        template: '<h1>404 Page not Found</h1>'
      }
    }
  ]
})
