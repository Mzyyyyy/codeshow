<template>
  <div id="app">
    <Header v-if="this.$route.path!=='/login'||this.$route.path==='/registry'"></Header>
    <div :class="this.$route.path==='/login'||this.$route.path==='/registry'?'':'root-container'">
      <router-view :class="currentRoute==='/index'?'router-view':'router-view-top'" />
    </div>
    <!-- <el-backtop target=".root-container"></el-backtop> -->

  </div>
</template>
<script>
import Header from './components/common/Header'
export default {
  components: {
    Header
  },
  data () {
    return {
      userInfo: JSON.parse(localStorage.getItem('userInfo')) || null
    }
  },
  computed: {
    // 当前路由
    currentRoute () {
      return this.$route.path
    },
    // 消息提示开关
    ring () {
      return this.$store.state.ring
    }
  },

  mounted () {
    this.$socket.emit('connection', 1)
    // this.$socket.emit('chatmessage', { name: 999, value: 999 })
    // this.sendMessage('mzy')
  },
  methods: {

  },
  sockets: { // 名字不能改，服务触发方法的列表
    connect () {
      // 与socket.io连接后回调
      console.log('App socket connected')
    },
    // user 名字，与服务端保持一致，data 后台返回数据
    change (data) {
      // 执行的操作
      // this.message.splice(this.message, 0, data)
      // console.log('this.chat(methods):' + data)
      console.warn(data, data.authorId, this.userInfo.id)

      if (data.authorId === this.userInfo.id) {
        this.$store.commit('addMsgCount')
        if (this.ring) {
          this.$notify({
            title: '新消息',
            dangerouslyUseHTMLString: true,
            message: `<div>${data.content}《${data.articleTitle}》</div>
                      <div style="width:17rem;text-align:right">来自用户:${data.userName}</div>`
          })
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/css/common.scss";
* {
  margin: 0;
  padding: 0;
  // color: rgba(84, 200, 162, 1);
  // text-align: center;
}
#app {
  // background: $background-color;
  background: #f4f5f5;
  text-align: center;
}
.root-container {
  margin-top: $header-height;
  min-height: calc(100vh - 4rem);
  // max-width: calc(100vw - 40vw);
  display: flex;
  justify-content: center;
  .router-view {
    width: calc(100vw - 50vw);
    background: white;
    margin-top: 3rem;
    padding: 1rem 1.5rem;
  }
  .router-view-top {
    width: calc(100vw - 50vw);
    background: white;
    margin-top: 1rem;
    padding: 1rem 1.5rem;
  }
}
</style>
