<template>
  <div class="user-message">
    <div class="menu-box">
      <Menu :menuList="menuList"></Menu>
    </div>

    <div class="message-title">
      <div :class="tabId===0?'title-text title-active':'title-text'"
           @click="chooseType(0)">未读消息</div>
      <div :class="tabId===1?'title-text title-active':'title-text'"
           @click="chooseType(1)">消息记录</div>
    </div>
    <div class="message-content">
      <div v-for="(item,index) in messageList"
           :key="index"
           class="comment-item">
        <div>
          <el-avatar :size="'large'"
                     :src="`http://localhost:3000/images/${item.userAvator}`"></el-avatar>
        </div>
        <div class="comment-right">
          <div class="text-light">{{item.userName}}</div>
          <div class="comment-content">{{item.content}}</div>
          <div>
            <div class="text-light">{{item.createTime}} ——《{{item.articleTitle}}》</div>
          </div>
        </div>
        <div class="comment-btn">
          <el-button type="primary"
                     @click="goDetail(item)">查看详情</el-button>
        </div>
      </div>
      <div v-if="messageList.length===0"
           class="comment-bg">
        <img src="@/assets/images/comment.png">
        <div>暂无消息</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getMessage, readComment } from '@/api/article'
import { parseTime } from '@/utils/common'
import Menu from '@/components/dashboard/Menu'

export default {
  components: {
    Menu
  },
  created () {
    this.getMessage('unRead')
  },
  data () {
    return {
      userInfo: JSON.parse(localStorage.getItem('userInfo')) || null,
      // 消息类型列表
      tabId: 0,
      // 左侧按钮列表
      menuList: [
        {
          // value: 12,
          icon: 'el-icon-star-off',
          text: '全部标为已读',
          func: this.readAllComment
        }
      ],
      // 消息列表
      messageList: []
    }
  },
  methods: {
    // 获取消息列表
    getMessage (type) {
      // this.$ScreenLoading.show('加载中...', 'top')
      getMessage({ userId: this.userInfo.id }).then(res => {
        if (res.data.code === 200) {
          this.messageList = res.data.res[type]
          this.messageList.map(item => {
            item.createTime = parseTime(item.createTime)
          })
          console.log(this.messageList, '999')
        } else {
          console.log('failed')
        }
      }).catch(err => {
        console.log(err)
      })
      this.$ScreenLoading.hide()
    },
    // 查看消息详情
    readComment (obj) { // {commentId||userId}
      readComment(obj).then(res => {
        if (res.data.code === 200) {
          this.messageList = res.data.res
        } else {
          console.log('failed')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 全部标为已读
    readAllComment () {
      readComment({ userId: this.userInfo.id }).then(res => {
        if (res.data.code === 200) {
          this.getMessage('unRead')
          this.$store.commit('clearMsgCount')
        } else {
          console.log('failed')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 选择团队标签
    chooseType (num) {
      this.tabId = num
      if (num === 0) {
        this.getMessage('unRead')
      } else {
        this.getMessage('read')
      }
    },
    // 查看评论详情
    goDetail (item) {
      this.$router.push({ path: '/read', query: { articleId: item.articleId } })
      if (this.tabId === 0) {
        this.readComment({ commentId: item.id })
        this.$store.commit('reduceMsgCount')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.user-message {
  .menu-box {
    position: absolute;
    right: 10rem;
    top: 6rem;
  }
  .message-title {
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
  }
  .title-text {
    margin: 0 0.5rem;
    padding: 0.5rem 0;
    cursor: pointer;
  }
  .title-active {
    color: #00bcd4;
    border-bottom: 2px solid #00bcd4;
  }
  .comment-box {
    background: white;
    position: absolute;
    right: 1rem;
    top: 5rem;
    /* height: calc(100vh - 10rem); */
    height: calc(100vh - 6rem);
    width: 18rem;
    overflow-y: scroll;
    /* padding-bottom: 3rem; */
    /* padding: 0 0 2rem 0; */
    /* position: relative; */
  }
  .comment-item {
    font-size: 1rem;
    display: flex;
    padding: 1rem;
    margin: 0 0.5rem;
    border-bottom: 1px solid rgba(187, 187, 187, 0.3);
  }
  .comment-right {
    margin-left: 1rem;
    text-align: left;
    flex: 1;
  }
  .text-light {
    color: gray;
    display: flex;
  }
  .comment-content {
    margin: 0.5rem 0;
  }
  .comment-btn {
    width: 5rem;
    display: flex;
    align-items: center;
  }
  .comment-bg {
    text-align: center;
    padding-top: 5rem;
    color: gray;
    opacity: 0.4;
  }
}
</style>
