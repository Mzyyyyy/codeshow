<template>
  <div class="personal-center">
    <h2>个人主页</h2>
    <div class="item-box">
      <div class="item-left">
        <div class="item-avator">
          <el-avatar style="width:5rem;height:5rem"
                     :src="`http://localhost:3000/images/${imageUrl}`"></el-avatar>
        </div>
        <div class="item-content">
          <div>
            <div class="item-name">{{userDetail.name}}</div>
            <div class="item-desc">{{userDetail.desc}}</div>
          </div>
        </div>
      </div>
      <!-- <div v-if="notMyself"
           class="item-right">
        <el-button v-if="isFollowed"
                   type="primary"
                   @click="followChange()">已关注</el-button>
        <el-button v-if="!isFollowed"
                   @click="followChange()">关注</el-button>
      </div> -->
      <div v-if="!notMyself"
           class="item-right">
        <el-button @click="goEdit()">编辑资料</el-button>
      </div>
    </div>
    <div>
      <el-tabs tab-position="left"
               @tab-click="handleClick"
               style="height: 30rem">
        <el-tab-pane :label="ortherId?'ta的发布':'我的发布'">
          <List :list="myList"></List>
        </el-tab-pane>
        <el-tab-pane v-if="!ortherId"
                     :label="ortherId?'收藏':'我的收藏'">
          <List :list="myList"></List>
        </el-tab-pane>
        <el-tab-pane v-if="!ortherId"
                     :label="ortherId?'关注':'我的关注'">
          <follow></follow>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'
import { getArticlesById, getCollectList } from '@/api/article'
import List from '@/components/dashboard/List'
import follow from '../list/follow'
import { parseTime } from '@/utils/common'

export default {
  inject: ['routerRefresh'],
  components: {
    List,
    follow
  },
  data () {
    return {
      // 用户登录信息
      userInfo: JSON.parse(localStorage.getItem('userInfo')) || null,
      // 用户详细信息
      userDetail: { name: '', desc: '' },
      // 头像url
      imageUrl: 'default.png',

      // 他人主页id
      ortherId: null,
      // 是否关注
      isFollowed: false,
      // 判断当前是否为自己主页
      notMyself: false,
      // 我的发布
      myList: []

    }
  },
  created () {
    console.log(this.$route)
    this.ortherId = this.$route.query.userId || null
    this.getArticles()
    this.getUserInfo()
  },
  methods: {
    // 获取用户信息
    getUserInfo () {
      getUserInfo({ id: this.ortherId || this.userInfo.id }).then(res => {
        if (res.data.code === 200) {
          if (res.data.res.id === this.userInfo.id) {
            this.notMyself = false
          } else {
            this.notMyself = true
          }

          this.userDetail = res.data.res
          this.imageUrl = this.userDetail.avator
          if (JSON.parse(res.data.res.follows).includes(this.userInfo.id)) {
            this.isFollowed = true
          }
        } else {
          console.log('failed')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 点击tab栏事件
    handleClick (tab, event) {
      console.log(tab, event)
      if (tab.label === '我的发布') {
        this.getArticles()
      } else if (tab.label === '我的收藏') {
        this.getCollectList()
      } else {

      }
    },
    // 跳转编辑个人资料
    goEdit () {
      this.$router.push('/user/edit')
    },
    // 获取该用户发布文章
    getArticles () {
      getArticlesById({ authorId: this.ortherId || this.userInfo.id }).then(res => {
        if (res.data.code === 200) {
          this.myList = res.data.res
          this.myList.map(item => {
            item.createTime = parseTime(item.createTime)
            if (item.collectors.includes(this.userInfo.id)) {
              item.isCollected = true
            } else {
              item.isCollected = false
            }
          })
        } else {
          console.log('failed')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取我的收藏
    getCollectList () {
      getCollectList({ userId: this.ortherId || this.userInfo.id }).then(res => {
        if (res.data.code === 200) {
          this.myList = res.data.res
          this.myList.map(item => {
            item.createTime = parseTime(item.createTime)
            if (item.collectors.includes(this.userInfo.id)) {
              item.isCollected = true
            } else {
              item.isCollected = false
            }
          })
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

<style lang="scss" scoped >
.personal-center {
  padding: 2rem;
  text-align: left;
  .item-box {
    display: flex;
    padding: 1rem 0;
  }
  .item-left {
    flex: 1;
    display: flex;
    .item-avator {
      width: 7rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .item-content {
      flex: 1;
      align-items: center;
      display: flex;
      align-items: center;
      padding-left: 1rem;
      .item-name {
        font-size: 1.4rem;
        font-weight: 600;
        color: #2e3135;
      }
      .item-desc {
        color: #b9c0c8;
        font-size: 1rem;
        font-weight: 500;
      }
    }
  }
  .item-right {
    width: 10rem;
    padding: 2rem;
    text-align: center;
  }

  ::v-deep .el-tabs--left,
  .el-tabs--right {
    overflow-y: scroll;
  }

  ::v-deep .el-tabs__content {
    padding: 1rem;
    overflow-y: scroll;
  }
}
</style>
