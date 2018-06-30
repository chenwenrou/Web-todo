import Vue from 'vue'
import Router from 'vue-router'
import todo from '@/components/todo'
import list from '@/components/list'
import index from '@/components/index'
import login from '@/components/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: login
    },
    {
      path: '/todo',
      component: index
    }
  ]
})
