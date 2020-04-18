<template>
  <div>
    11111111111111
    <el-button @click="sendMessage('llallala')">发送</el-button>
  </div>
</template>

<script>
export default {
  components: {

  },
  data () {
    return {

    }
  },
  mounted () {
    this.$socket.emit('connection', 1)
    // this.sendMessage('mzy')
  },
  beforeDestroy () {
    this.$socket.emit('disconnect', 1)
  },
  methods: {
    sendMessage (val) {
      this.$socket.emit('chatmessage', { name: val, value: val })
      this.value = ''
    }
  },
  sockets: { // 名字不能改，服务触发方法的列表
    connect () {
      // 与socket.io连接后回调
      console.log('socket connected')
    },
    // user 名字，与服务端保持一致，data 后台返回数据
    user (data) {
      // 执行的操作
      // this.message.splice(this.message, 0, data)
      console.log('this.chat(methods):' + data)
      console.warn(data)
    }
  }
}
</script>

<style>
</style>
