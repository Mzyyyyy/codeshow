<template>
  <div class="dashboard-list">
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
            <el-button v-if="del"
                       @click.stop="deleteArticle(item,$event)"
                       type="danger"
                       size="small"
                       style="margin-left:2rem"
                       plain>删除</el-button>
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
  </div>
</template>

<script>
import { collect, deleteArticle } from '@/api/article'
// import { parseTime } from '@/utils/common'

export default {
  props: {
    list: {
      type: Array,
      required: true
    },
    del: {
      type: Boolean,
      required: false
    }
  },
  components: {

  },

  created () {
    console.log(this.list)
  },
  data () {
    return {
      userInfo: JSON.parse(localStorage.getItem('userInfo')) || null
    }
  },
  methods: {
    // 查看文章详情
    showArticle (item) {
      this.$router.push({ path: '/read', query: { articleId: item.id } })
    },
    // 收藏、取消收藏
    collect (item) {
      console.log(this.userInfo.id, item.id)
      collect({ userId: this.userInfo.id, articleId: item.id }).then(res => {
        if (res.data.code === 200) {
          this.tagList = res.data.res
          item.isCollected = !item.isCollected
        } else {
          console.log('failed')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 删除文章
    deleteArticle (item, event) {
      event.preventDefault()
      console.log(item)
      this.$confirm('确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteArticle({ articleId: item.id }).then(res => {
          if (res.data.code === 200) {
            this.$emit('deleteCb')
          } else {
            console.log('failed')
          }
        }).catch(err => {
          console.log(err)
        })
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消删除'
        // })
      })
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
  display: flex;
  align-items: center;
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
// .my-heart {
//   display: block;
//   width: 100px;
//   height: 100px;
//   // border: 1px solid red;
//   background: url("../../assets/images/love.png") no-repeat;
//   background-position: left;
// }
// .my-heart-animation {
//   animation: heart-animated 0.8s 1 steps(28);
//   -webkit-animation-fill-mode: forwards;
// }

// @keyframes heart-animated {
//   0% {
//     background-position: left;
//   }
//   100% {
//     background-position: right;
//   }
// }
</style>
