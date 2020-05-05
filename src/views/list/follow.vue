<template>
  <div class="list-box">
    <div v-for="(item,index) in list"
         :key="index"
         class="item-box">
      <div class="item-left">
        <div class="item-avator"
             @click="goUserDetail(item)">
          <el-avatar style="width:5rem;height:5rem;cursor:pointer"
                     :src="`http://localhost:3000/images/${item.avator}`"></el-avatar>
        </div>
        <div class="item-content">
          <div>
            <div class="item-name">{{item.name}}</div>
            <div class="item-desc">{{item.desc}}</div>
          </div>
        </div>
      </div>
      <div class="item-right">
        <el-button v-if="item.isFollowed"
                   type="primary"
                   @click="followChange(item)">已关注</el-button>
        <el-button v-if="!item.isFollowed"
                   @click="followChange(item)">关注</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getFollowUsers, followUser } from '@/api/user'

export default {
  inject: ['routerRefresh'],
  components: {

  },
  data () {
    return {
      // 列表数据
      list: [],
      // 用户信息
      userInfo: JSON.parse(localStorage.getItem('userInfo')) || null

    }
  },
  created () {
    this.getFollowUsers()
  },
  methods: {
    // 获取主页文章列表
    getFollowUsers () {
      console.log(this.userInfo)
      const params = { userId: this.userInfo.id } || {}
      getFollowUsers(params).then(res => {
        if (res.data.code === 200) {
          const list = res.data.res
          list.map(item => {
            item.isFollowed = true
          })
          this.list = list
          console.log(this.listArr)
        } else {
          console.log('failed')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 修改关注状态
    followChange (item) {
      const params = {
        userId: this.userInfo.id,
        targetUserId: item.id
      }
      followUser(params).then(res => {
        if (res.data.code === 200) {
          item.isFollowed = !item.isFollowed
        } else {
          console.log('failed')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 前往用户主页
    goUserDetail (item) {
      console.log(item)
      this.$router.push({ path: '/user/home', query: { userId: item.id } })
      // this.$router.push({ path: '/read', query: { articleId: item.id } })

      this.routerRefresh()
    }
  }
}
</script>

<style lang="scss" scoped>
.list-box {
  text-align: left;
  // cursor: pointer;
}
.item-box {
  display: flex;
  border-bottom: 1px solid rgba(187, 187, 187, 0.3);
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
</style>
