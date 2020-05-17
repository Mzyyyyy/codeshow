<template>
  <div class="list-box">
    <div v-for="(item,index) in list"
         :key="index"
         @click="showArticle(item)"
         class="list-item">
      <div class="item-info">
        <div>{{item.authorName}}·{{item.createTime}}</div>
        <div class="title-text">{{item.title}}</div>
        <div class="list-content">{{item.desc}}</div>
        <div class="list-btn">
          <img v-if="item.isCollected"
               class="icon-img"
               @click.stop="collect(item)"
               src="@/assets/images/collected.png">
          <img v-if="!item.isCollected"
               class="icon-img"
               @click.stop="collect(item)"
               src="@/assets/images/collect.png">
          <img class="icon-img"
               style="margin-left:1rem;width:1.8rem"
               src="@/assets/images/comment2.png">
        </div>
      </div>
      <div class="list-photo">
        <!-- <el-image :src="`http://localhost:3000/images/${item.imgName}`">
            <div slot="placeholder"
                 class="image-slot">
              加载中<span class="dot">...</span>
              <div slot="error"
                   class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </div>
          </el-image> -->
        <el-image style="width: 8rem; height: 8rem"
                  :src="item.imgName?`http://localhost:3000/images/${item.imgName}`:null"
                  fit="cover">
          <div slot="error"
               class="image-slot">
            <!-- <i class="el-icon-picture-outline"></i> -->
          </div>
        </el-image>
      </div>
    </div>
  </div>
</template>

<script>
import { getCollectList } from '@/api/article'

export default {
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
    this.getCollectList()
  },
  methods: {
    // 获取主页文章列表
    getCollectList () {
      // this.$ScreenLoading.show('加载中...', 'top')
      console.log(this.userInfo)
      const params = { userId: this.userInfo.id } || {}
      getCollectList(params).then(res => {
        if (res.data.code === 200) {
          const list = res.data.res
          list.map(item => {
            if (item.collectors.includes(this.userInfo.id)) {
              item.isCollected = true
            } else {
              item.isCollected = false
            }
          })
          this.list = list
          console.log(this.listArr)
        } else {
          console.log('failed')
        }
        this.$ScreenLoading.hide()
      }).catch(err => {
        console.log(err)
      })
    },
    // 查看文章详情
    showArticle (item) {
      this.$router.push({ path: '/read', query: { articleId: item.id } })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/common.scss";
.list-box {
  text-align: left;
  // cursor: pointer;
}
.list-item {
  padding: 1rem 0 0.2rem 0;
  display: flex;
  border-bottom: 1px solid $border-color;
  cursor: pointer;
}
.item-info {
  flex: 1;
  .title-text {
    font-size: 1.4rem;
    font-weight: 600;
    line-height: 1.2;
    margin: 0.5rem 0 0.3rem 0;
  }
}
.list-content {
  color: $gray;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  padding-right: 1rem;
}
.list-btn {
  margin-top: 0.4rem;
}
.list-photo {
  // width: 15rem;
  // height: 10rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.icon-img {
  width: 2rem;
}
</style>
