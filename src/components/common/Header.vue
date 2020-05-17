<template>
  <div class="header">
    <div class="header-container">
      <div class="logo-box">
        <img src="@/assets/images/logo.png">
      </div>
      <div class="
           head-center">
        <div class="header-item"
             :style="currentRoute!=='/index'?'color:gray':''"
             @click="clickHead('/index')">首页</div>
        <!-- <div class="header-item"
             :style="currentRoute!=='/hot'?'color:gray':''"
             @click="clickHead('/hot')">热点</div> -->
        <div class="header-item"
             :style="currentRoute!=='/myTeam'?'color:gray':''"
             @click="clickHead('/myTeam')">团队</div>
        <!-- <div class="header-item"
             style="color:gray">专题</div>
        <div class="header-item"
             style="color:gray">活动</div> -->
      </div>
      <div class="search-box">
        <el-input :disabled="false"
                  placeholder="请输入搜索内容"
                  suffix-icon="el-icon-search"
                  @change="searchAll"
                  v-model="searchContent">
        </el-input>
      </div>
      <div v-if="userInfo"
           class="login-box">
        <img v-if="ring"
             @click="changeRing(false)"
             class="ring-msg"
             src="@/assets/images/ring.png">
        <img v-if="!ring"
             @click="changeRing(true)"
             class="ring-msg"
             src="@/assets/images/noring.png">
        <el-dropdown @command="handleCommand"
                     trigger="click">
          <!-- <span class="el-dropdown-link"> -->
          <!-- 个人中心 -->
          <!-- <img class="ring-msg"
               src="@/assets/images/ring.png"> -->
          <el-avatar size="large"
                     class="el-dropdown-link"
                     style="margin-top:0.75rem;"
                     :src="`http://localhost:3000/images/${userInfo.avator}`"></el-avatar>
          <!-- <i class="el-icon-arrow-down el-icon--right"></i> -->
          <!-- </span> -->

          <el-dropdown-menu style="z-index:10000;top:20rem"
                            slot="dropdown">
            <el-dropdown-item command="a">写代码</el-dropdown-item>
            <el-dropdown-item command="b">我的主页</el-dropdown-item>
            <el-dropdown-item command="c">
              <div>
                <el-badge :value="msgCount"
                          :hidden="msgCount===0"
                          class="item">
                  <div @click="goMsgList">消息列表</div>
                </el-badge>
              </div>
            </el-dropdown-item>
            <el-dropdown-item command="d">标签管理</el-dropdown-item>

            <!-- <el-dropdown-item command="d"
                              disabled>草稿</el-dropdown-item> -->
            <!-- <el-dropdown-item command="d"
                              divided>管理</el-dropdown-item> -->
            <el-dropdown-item command="e"
                              divided
                              @click="logout">登出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <!-- <div v-if="!userInfo"
           class="login-box">
        <div class="point"
             @click="goLogin">登录</div>
        <div class="split-line">|</div>
        <div class="point"
             @click="goRegistry">注册</div>
        <div>
        </div>
      </div> -->

    </div>
    <div v-if="currentRoute==='/index'"
         class="header-tag">
      <div class="tag-type">
        <div :class="currentTag===item.id?'tag-item-active':'tag-item'"
             v-for="(item,index) in codeType"
             :key="index"
             @click="goRoute(item)">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getTags } from '@/api/article'

export default {
  inject: ['routerRefresh'],

  components: {

  },
  data () {
    return {
      // 登录用户信息
      userInfo: JSON.parse(localStorage.getItem('userInfo')) || null,
      // 搜索内容
      searchContent: '',
      // 代码分类
      codeType: [
        {
          id: 0,
          name: 'All'
        }
        // {
        //   id: 1,
        //   name: 'javaScript'
        // },
        // {
        //   id: 2,
        //   name: 'HTML'
        // },
        // {
        //   id: 3,
        //   name: 'CSS'
        // },
        // {
        //   id: 4,
        //   name: '设计模式'
        // },
        // {
        //   id: 5,
        //   name: '数据结构和算法'
        // }
      ],
      // 当前选中tag
      activeItem: 0
    }
  },
  computed: {
    // 当前路由
    currentRoute () {
      return this.$route.path
    },
    // 当前代码标签栏tagId
    currentTag () {
      return this.$store.state.tagId
    },
    // 消息提示开关
    ring () {
      return this.$store.state.ring
    },
    // 未读消息数量
    msgCount () {
      return this.$store.state.msgCount
    }
  },
  created () {
    console.log(this.$route.path)
    this.getTags()
    // console.log(this.$store.state.tagId, '111')
  },
  methods: {
    // 全局搜索
    searchAll () {
      this.$router.push(`/index?keyword=${this.searchContent}`)
      this.routerRefresh()
      console.log(this.searchContent)
    },
    goLogin () {
      this.$router.push('/login')
    },
    goRegistry () {
      this.$router.push('/registry')
    },
    // 选择代码类型
    goRoute (item) {
      this.searchContent = ''
      this.activeItem = item.id
      this.$store.commit('changeTagId', item.id)
    },
    // 点击个人中心下拉菜单
    handleCommand (command) {
      switch (command) {
        case 'a':
          this.goWrite()
          break
        case 'e':
          this.logout()
          break
        case 'b':
          this.$router.push('/user/home')
          this.routerRefresh()
          break
        case 'c':
          this.$router.push('/user/message')
          break
        case 'd':
          this.$router.push('/user/tag')
          break
      }
    },
    // 写代码
    goWrite () {
      this.$router.push('/config')
    },
    // 登出
    logout () {
      localStorage.removeItem('userInfo')
      this.$router.push('/login')
    },
    // head路由跳转
    clickHead (item) {
      // this.activeItem = item.value
      this.$router.push(item)
    },
    // 消息静音提示修改
    changeRing (bool) {
      this.$store.commit('changeRing', bool)
    },
    // 跳转至消息列表
    goMsgList () {
      // this.$store.commit('clearMsgCount') // 未读消息标记已读
      this.$router.push('/user/message')
    },
    // 获取该用户关注标签
    getTags () { // {userId:查询该用户||不传查全部}
      getTags({ userId: this.userInfo.id }).then(res => {
        if (res.data.code === 200) {
          this.codeType = this.codeType.concat(res.data.res)
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
@import "@/assets/css/common.scss";
.header {
  position: fixed;
  top: 0;
  width: 100%;
  // color: rgba(84, 200, 162, 1);
  color: #00bcd4;
  height: $header-height;
  background: white;
  border-bottom: 1px solid rgba(187, 187, 187, 0.3);
  z-index: 999;
  // z-index: 10000;
  // font-size: 1.2rem;
  .header-container {
    display: flex;
    justify-content: center;
    line-height: $header-height;
    padding: 0 9rem;
  }
  .head-center {
    display: flex;
    box-sizing: border-box;
    flex: 1;
    max-width: calc(100vw - 40vw);
  }
  .login-box {
    display: flex;
    font-size: 1.2rem;
    width: 8rem;
    justify-content: center;
    // align-items: center;
    .split-line {
      margin: 0 0.5rem;
    }
  }
  .header-item {
    margin: 0 1rem;
    font-size: 1.2rem;
    min-width: 3rem;
    cursor: pointer;
  }
  .search-box {
    width: 30rem;
    ::v-deep .el-input {
      width: 60%;
    }
  }
  .header-tag {
    background: white;
    // box-shadow: 0px 2px 2px $gray;
    -webkit-box-shadow: 0px 5px 10px rgba(187, 187, 187, 0.3);
    // text-align: center;
    display: flex;
    justify-content: center;
    height: 3rem;
    line-height: 1.5rem;
    border-bottom: 1px solid $border-color;
    .tag-type {
      // box-sizing: border-box;
      width: calc(100vw - 47vw);
      overflow-x: scroll;
      display: flex;
      flex-wrap: nowrap;
      text-align: left;
      align-items: center;
      .tag-item,
      .tag-item-active {
        padding: 0 5px;
        height: 50%;
        margin-right: 1rem;
        // min-width: 5rem;
      }
      .tag-item {
        cursor: pointer;
      }
      .tag-item-active {
        cursor: pointer;
        background: #00bcd4;
        color: white;
        border-radius: 5px;
      }
    }
  }
  .el-dropdown-link {
    cursor: pointer;
    // color: #54c8a2;
    color: #00bcd4;
    font-size: 1.2rem;
  }
  .el-icon-arrow-down {
    font-size: 1.2rem;
  }
  ::v-deep .el-dropdown {
    height: 3rem;
    display: block;
  }
  ::v-deep .el-dropdown-menu .el-popper {
    top: 5rem;
  }
  .ring-msg {
    width: 1.8rem;
    height: 1.8rem;
    opacity: 0.5;
    cursor: pointer;
    margin-right: 2rem;
    margin-top: 1.1rem;
  }
}
// ::v-deep .el-badge__content .el-badge__content--undefined .is-fixed {
//   top: 1rem !important;
//   right: 0rem;
// }
::v-deep .el-badge__content {
  top: 1.1rem;
  right: -0.1rem;
}
// ::v-deep.is-fixed {
//   top: 1rem !important;
//   right: 0rem;
// }
.logo-box {
  display: flex;
  align-items: center;
  img {
    width: 12rem;
  }
}
</style>
