<template>
  <div class="dashboard">
    <!-- <div class="tab-bar">
      <el-tabs v-model="activeName"
               @tab-click="handleClick"
               style="width:100%">
        <el-tab-pane label="javaScript"
                     name="first"></el-tab-pane>
      </el-tabs>
    </div> -->
    <List :list="listArr"></List>
    <div class="menu-box">
      <Menu :menuList="menuList"></Menu>
    </div>
    <el-dialog title="提示"
               :visible.sync="centerDialogVisible"
               width="30%"
               center>
      <!-- <span></span> -->
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- <el-backtop target=".dashboard-list"></el-backtop> -->
  </div>
</template>

<script>
import List from '@/components/dashboard/List'
import Menu from '@/components/dashboard/Menu'
import { getArticleList } from '@/api/article'
import { parseTime } from '@/utils/common'

// import { formatTime } from '@/utils/common'

export default {
  components: {
    List,
    Menu
  },
  data () {
    return {
      // activeName: 'first'
      // 列表数据
      listArr: [],
      // 弹窗控制
      centerDialogVisible: false,
      // 菜单按钮列表
      menuList: [
        {
          // value: 12,
          icon: 'el-icon-star-off',
          text: '我的收藏',
          func: this.getMyCollected
        },
        // {
        //   // value: 12,
        //   icon: 'el-icon-star-off',
        //   text: '我的参与',
        //   func: () => {

        //   }
        // },
        {
          // value: 12,
          icon: 'el-icon-star-off',
          text: '我的关注',
          func: this.getMyFollows
        },
        {
          // value: 12,
          icon: 'el-icon-star-off',
          text: '开始创作',
          func: () => {
            // this.centerDialogVisible = true
            this.$router.push('/config')
          }
        }
      ],
      // 用户信息
      userInfo: JSON.parse(localStorage.getItem('userInfo'))
    }
  },
  created () {
    this.$store.commit('changeTagId', 0)
    this.getArticleList({ userId: this.userInfo.id })
  },
  computed: {
    // 动态监听tag变化
    getTagId () {
      return this.$store.state.tagId
    }
  },
  watch: {
    getTagId (newVal, oldVal) {
      this.getArticleList({ id: newVal, userId: this.userInfo.id })
    }
  },
  methods: {
    // 获取主页文章列表
    getArticleList (obj) {
      const params = obj || {}
      getArticleList(params).then(res => {
        if (res.data.code === 200) {
          const list = res.data.res
          list.map(item => {
            if (item.collectors.includes(this.userInfo.id)) {
              item.isCollected = true
            } else {
              item.isCollected = false
            }
            item.createTime = parseTime(item.createTime)
          })
          this.listArr = list
          console.log(this.listArr)
        } else {
          console.log('failed')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 修改文章类型查询
    handleClick (tab, event) {
      console.log(tab, event)
    },
    // 获取我的收藏列表
    getMyCollected () {
      this.$store.commit('changeTagId', 0)
      this.$router.push('./collect')
    },
    // 获取关注列表
    getMyFollows () {
      this.$store.commit('changeTagId', 0)
      this.$router.push('./follow')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/common.scss";
.dashboard {
  color: black;
  .tab-bar {
    // border-bottom: 1px solid $border-color;
    color: $gray;
    display: flex;
    height: 1.8rem;
  }
  .list-box {
    text-align: left;
  }
  .list-item {
    padding: 1rem 0;
    display: flex;
    border-bottom: 1px solid $border-color;
  }
  .item-info {
    flex: 1;
  }
  .list-content {
    color: $gray;
  }
  .list-btn {
    margin-top: 1rem;
  }
  .list-photo {
    width: 15rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .menu-box {
    position: absolute;
    left: 12rem;
    top: 9rem;
  }
}
</style>
