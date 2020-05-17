import Vue from 'vue'
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import '../src/assets/theme/index.css'
import App from './App.vue'
import router from './router'
import store from './store'

import VueCodeMirror from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'

import ScreenLoading from 'screenloading'

import Socket from 'vue-socket.io'
Vue.use(ScreenLoading) // 引入全局loading组件
Vue.use(new Socket({
  debug: false, // 开启提示
  connection: 'ws://localhost:3000' // 后台服务地址
  // vuex: {
  //   store,
  //   mutationPrefix: 'SOCKET_',
  //   actionPrefix: 'SOCKET_'
  // }
}))

// console.log(VueCodeMirror.CodeMirror.prototype)
// VueCodeMirror.CodeMirror.prototype.setOption('theme', 'dracula')
Vue.use(VueCodeMirror)

Vue.use(ElementUI)
Vue.config.productionTip = false
// Vue.prototype.$axios = axios
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
