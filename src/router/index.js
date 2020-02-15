import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/user'

// const r = require.context()

Vue.use(VueRouter)

const routes = [].concat(login)

const router = new VueRouter({
  routes
})

export default router
