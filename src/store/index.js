import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 标签栏id
    tagId: 0,
    // 消息提示开关
    ring: true,
    // 未读消息数量
    msgCount: 0
  },
  mutations: {
    // 修改tag栏类型
    changeTagId (state, id) {
      state.tagId = parseInt(id)
      console.log('idchanged', state.tagId)
    },
    // 消息提示开关
    changeRing (state, ring) {
      state.ring = ring
      console.log(state.ring)
    },
    // 加1未读消息数
    addMsgCount (state) {
      state.msgCount += 1
      console.log('新增一条未读消息！注意查看哦！')
    },
    // 减1未读消息数
    reduceMsgCount (state) {
      state.msgCount -= 1
      console.log('已查看一条未读消息！')
    },
    // 未读消息清零
    clearMsgCount (state) {
      state.msgCount = 0
      console.log('未读消息已查看')
    },
    // 未读消息设置数值
    resetMsgCount (state, num) {
      state.msgCount = num
      console.log('未读消息数已重置')
    }
  },
  actions: {
  },
  modules: {
  }
})
