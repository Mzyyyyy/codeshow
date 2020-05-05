<template>
  <div>
    <div class="menu-box">
      <div class="menu-item">
        <el-badge v-if="!isCollected"
                  :value="null"
                  class="item">
          <el-button @click="collect"
                     size="large">收藏该文</el-button>
        </el-badge>
        <el-badge v-if="isCollected"
                  :value="null"
                  class="item">
          <el-button type="primary"
                     @click="collect"
                     size="large">√已收藏</el-button>
        </el-badge>
      </div>

      <div class="menu-item"
           v-if="!(userInfo.id===authorId)">
        <!-- <el-badge v-if="!isFollowed"
                  :value="null"
                  class="item">
          <el-button @click="follow"
                     size="large">关注作者</el-button>
        </el-badge> -->
        <!-- <el-badge v-if="isFollowed"
                  :value="null"
                  class="item">
          <el-button type="primary"
                     @click="follow"
                     size="large">√已关注</el-button>
        </el-badge> -->
        <el-badge class="item">
          <el-button @click="goHome"
                     size="large">访问主页</el-button>
        </el-badge>
      </div>
      <!-- <div v-for="(item,index) in menuList"
           :key="index"
           class="menu-item">
        <el-badge :value="item.value||null"
                  class="item">
          <el-button :circle="item.text?false:true"
                     :icon="item.text?null:item.icon"
                     @click="item.func"
                     size="large">{{item.text}}</el-button>
        </el-badge>
      </div> -->
    </div>

    <div v-if="url"
         class="demo-image__preview show-img">
      <el-image style="width: 10rem; height: 10rem"
                :src="url"
                :preview-src-list="srcList">
      </el-image>
      <!-- <div style="color:gray;font-size:0.5rem">点击图片预览</div> -->
      <div class="title-box">
        <div class="title">{{info.title}}</div>
        <div class="desc">{{info.desc}}</div>
      </div>
    </div>
    <codemirror ref="mycode"
                v-model="code"
                :options="cmOptions"
                class="code">
    </codemirror>

    <div class="comment-box">
      <div v-for="(item,index) in commentList"
           :key="index"
           class="comment-item">
        <div>
          <el-avatar :size="'small'"
                     :src="`http://localhost:3000/images/${item.userAvator}`"></el-avatar>
        </div>
        <div class="comment-right">
          <div class="text-light">{{item.userName}}<img v-if="item.userId==teamDetail.ownerId"
                 class="vip"
                 src="@/assets/images/vip.png"></div>
          <div :class="item.userId==teamDetail.ownerId?'comment-content comment-highlight':'comment-content'">{{item.content}}</div>
          <div>
            <div class="text-light">{{item.createTime}}</div>
          </div>
        </div>
      </div>
      <div v-if="commentList.length===0"
           class="comment-bg">
        <img src="@/assets/images/comment.png">
        <div>暂无评论</div>
      </div>
      <div class="comment-input">
        <el-input placeholder="说点儿什么叭"
                  v-model="myComment">
          <el-button slot="append"
                     icon="el-icon-chat-dot-square"
                     @click="pulishComments"></el-button>
        </el-input>

      </div>
    </div>
  </div>
</template>

<script>
// import Code from '../../components/code/codemirror'
// import vueCode from '../../components/code/codemirrorReadOnly'
import { getCode, pulishComments, getComments, collect } from '@/api/article'
import { codemirror } from 'vue-codemirror'
import { followUser, getFollowUsers } from '@/api/user'
import { parseTime } from '@/utils/common'
import { getTeamDetail } from '@/api/team'

export default {
  components: {
    // Code,
    codemirror
  },
  data () {
    const optionsConfig = JSON.parse(localStorage.getItem('currentConfig')) || JSON.parse(localStorage.getItem('defaltConfig'))
    return {
      // 用户信息
      userInfo: JSON.parse(localStorage.getItem('userInfo')) || null,
      // 当前代码
      code: '',
      // 文章id
      id: null,
      curCode: '',
      cmOptions: Object.assign({
        // mode: 'text/javascript', // 选择对应代码编辑器的语言，我这边选的是数据库，根据个人情况自行设置即可
        value: '',
        mode: 'text/javascript', // 模式
        theme: 'ambiance', // 主题
        lineSeparator: '/LF', // 行分隔符
        readOnly: true,
        indentWithTabs: true,
        indentUnit: 4,
        smartIndent: true,
        // lineNumbers: true,
        matchBrackets: true,
        // theme: theme,
        autofocus: true,
        extraKeys: { Ctrl: 'autocomplete' }, // 自定义快捷键
        hintOptions: { // 自定义提示选项
          tables: {
            users: ['name', 'score', 'birthDate'],
            countries: ['name', 'population', 'size']
          }
        }
        // gutters: ['cssName']
      }, optionsConfig),
      // cmOptions: JSON.parse(localStorage.getItem('currentConfig')) || JSON.parse(localStorage.getItem('defaltConfig'))
      commentList: [],
      // 发表评论信息
      myComment: '',
      // 左侧按钮组
      menuList: [
        // {
        //   // value: 12,
        //   icon: 'el-icon-star-off',
        //   text: '点赞',
        //   func: () => {

        //   }
        // },
        // {
        //   // value: 12,
        //   icon: 'el-icon-star-off',
        //   text: '收藏该文',
        //   func: this.collect
        // },
        {
          // value: 12,
          icon: 'el-icon-star-off',
          text: '关注作者',
          func: () => {

          }
        }
      ],
      // 该文作者id
      authorId: '',
      // 该文标题
      articleTitle: '',
      // 是否收藏
      isCollected: false,
      // 是否收藏
      isFollowed: false,
      // 预览图片列表
      srcList: null,
      // 图片预览初始
      url: null,
      // 所有信息
      info: null,
      // 团队发布文章的团队详情
      teamDetail: {}
    }
  },
  created () {
    // this.$socket.emit('connection', 1)
    console.log('id', this.$route.query.articleId)
    this.id = this.$route.query.articleId
    if (this.$route.query.teamId) {
      this.getTeamDetail()
    }
    this.getCode()
    this.getComments()
  },
  methods: {
    // 获取代码
    getCode () {
      getCode({ id: this.id }).then(res => {
        if (res.data.code === 200) {
          this.info = res.data.res
          this.code = res.data.res.content
          this.authorId = res.data.res.authorId
          this.articleTitle = res.data.res.title
          if (res.data.res.imgList.length > 0) {
            const temp = res.data.res.imgList
            for (let i = 0; i < temp.length; i++) {
              temp[i] = 'http://localhost:3000/images/' + temp[i]
            }
            this.srcList = temp
            this.url = this.srcList[0]
          } else {
            this.srcList = ['http://localhost:3000/images/' + res.data.res.imgName]
            this.url = 'http://localhost:3000/images/' + res.data.res.imgName
          }

          if (JSON.parse(res.data.res.collectors).includes(this.userInfo.id)) {
            this.isCollected = true
          }
          // 获取作者的关注者列表
          getFollowUsers({ userId: this.userInfo.id }).then(result => {
            if (result.data.code === 200) {
              const list = result.data.res
              const temp = list.filter(item => {
                return item.id === res.data.res.authorId
              })
              if (temp.length > 0) {
                this.isFollowed = true
              } else {
                this.isFollowed = false
              }
            } else {
              console.log('failed')
            }
          }).catch(err => {
            console.log(err)
          })
        } else {
          console.log('failed')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 发布评论
    pulishComments () {
      const params = {
        content: this.myComment,
        articleId: this.id,
        authorId: this.authorId,
        articleTitle: this.articleTitle,
        userId: this.userInfo.id,
        userName: this.userInfo.name,
        userAvator: this.userInfo.avator,
        createTime: new Date()

      }
      pulishComments(params).then(res => {
        if (res.data.code === 200) {
          console.log(res.data.res)
          this.myComment = ''
          // console.log(this.$socket, '555')
          this.$socket.emit('pulish', params)
          this.getComments()
        } else {
          console.log('failed')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取该文章所有评论信息
    getComments () {
      getComments({ articleId: this.id }).then(res => {
        if (res.data.code === 200) {
          this.commentList = res.data.res
          this.commentList.map(item => {
            item.createTime = parseTime(item.createTime)
          })
        } else {
          console.log('failed')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 修改收藏状态
    collect () {
      console.log(this.userInfo.id, this.id)
      collect({ userId: this.userInfo.id, articleId: this.id }).then(res => {
        if (res.data.code === 200) {
          this.isCollected = !this.isCollected
        } else {
          console.log('failed')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 修改关注状态
    follow () {
      const params = {
        userId: this.userInfo.id,
        targetUserId: this.authorId
      }
      followUser(params).then(res => {
        if (res.data.code === 200) {
          this.isFollowed = !this.isFollowed
        } else {
          console.log('failed')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 访问主页
    goHome () {
      this.$router.push(`/user/orther?userId=${this.authorId}`)
    },
    // 获取团队详情
    getTeamDetail () {
      getTeamDetail({ teamId: this.$route.query.teamId }).then(res => {
        if (res.data.code === 200) {
          this.teamDetail = res.data.res
        } else {
          console.log('failed')
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.codesql {
  font-size: 11pt;
  text-align: left;
  font-family: Consolas, Menlo, Monaco, Lucida Console, Liberation Mono,
    DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;
}
::v-deep .CodeMirror {
  min-height: calc(100vh - 7rem);
  height: 20rem;
  /* height: 100%; */
  z-index: 1;
}
.CodeMirror-scroll {
  text-align: left;
}
.save-btn {
  top: 15rem;
  position: absolute;
  right: 5rem;
  cursor: pointer;
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
  font-size: 12px;
  display: flex;
  padding: 1rem;
  margin: 0 0.5rem;
  border-bottom: 1px solid rgba(187, 187, 187, 0.3);
}
.comment-right {
  margin-left: 1rem;
  text-align: left;
}
.text-light {
  color: gray;
  display: flex;
}
.vip {
  width: 0.9rem;
  height: 0.9rem;
  margin-left: 0.5rem;
}
.comment-content {
  margin: 0.5rem 0;
}
.comment-highlight {
  color: red;
  font-weight: bold;
}
.comment-input {
  position: fixed;
  height: 2rem;
  /* top: 80px; */
  width: inherit;
  bottom: 1rem;
  /* right: 0;
  left: 0; */
}
::v-deep .el-input__inner {
  border-radius: 0;
}
::v-deep .el-input-group__append,
.el-input-group__prepend {
  border-radius: 0;
}
.menu-box {
  position: absolute;
  left: 12rem;
  top: calc(100vh - 10rem);
}
.show-img {
  position: absolute;
  left: 8rem;
  top: 6rem;
  max-width: 10rem;
}
.title-box {
  /* position: absolute;
  left: 8rem;
  top: 20rem; */
  // margin-top: 1rem;
  .title {
    font-size: 1.4rem;
    margin: 1rem 0;
    max-width: 10rem;
    overflow-x: scroll;
  }
  .desc {
    text-align: left;
    color: gray;
    max-height: 16rem;
    overflow-y: scroll;
  }
}
.menu-item {
  margin-bottom: 2rem;
}
.comment-bg {
  text-align: center;
  padding-top: 5rem;
  color: gray;
  opacity: 0.4;
}
</style>
