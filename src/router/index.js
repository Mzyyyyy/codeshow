import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/user'
import index from '@/views/dashboard'
// const login = () => import('@/views/user')

// const r = require.context()

Vue.use(VueRouter)

// function loadView (view) {
//   return () => import(`@/views/${view}.vue`)
// }
// const list = resolve => require.ensure([], () => resolve(require('../components/list/list')), 'list')

const routes = []
  .concat(login)
  .concat(index)

const router = new VueRouter({
  routes
})

export default router
