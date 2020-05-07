<template>
  <div>
    <div class="team-title">
      <div :class="tabId===0?'title-text title-active':'title-text'"
           @click="chooseTeam(0)">已关注标签</div>
      <div :class="tabId===1?'title-text title-active':'title-text'"
           @click="chooseTeam(1)">全部标签</div>
    </div>
    <div class="tag-box">
      <el-row>
        <el-col v-for="(item,index) in tagList"
                :key="index"
                :span="6">
          <div>
            <el-image v-if="item.img"
                      style="width: 5rem; height: 5rem"
                      :src="`http://localhost:3000/images/${item.img}`"
                      :fit="'fit'"></el-image>
          </div>
          <div class="tag-name">{{item.name}}</div>
          <div class="tag-count">{{JSON.parse(item.follows).length}}关注 0文章</div>
          <div class="tag-btn">
            <el-button v-if="!item.followed"
                       size="small"
                       @click="changeTag(item)">关注</el-button>
            <el-button v-if="item.followed"
                       type="primary"
                       size="small"
                       @click="changeTag(item)">已关注</el-button>
          </div>
        </el-col>
      </el-row>
      <!-- <div v-for="(item,index) in tagList"
           :key="index">
        <div>
          <el-image v-if="item.img"
                    style="width: 5rem; height: 5rem"
                    :src="`http://localhost:3000/images/${item.img}`"
                    :fit="fit"></el-image>
        </div>
        <div>{{item.name}}</div>
        <div>{{JSON.parse(item.follows).length}}关注</div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { getTags, changeTag } from '@/api/article'
export default {
  components: {

  },
  data () {
    return {
      userInfo: JSON.parse(localStorage.getItem('userInfo')) || null,
      // 标签ID
      tabId: 0,
      // 标签列表
      tagList: []
    }
  },
  created () {
    this.getTags({ userId: this.userInfo.id })
  },
  methods: {
    // 选择标签
    chooseTeam (num) {
      this.tabId = num
      if (num === 0) {
        console.log('已关注')
        this.getTags({ userId: this.userInfo.id })
      } else {
        console.log('全部')
        this.getTags()
      }
    },
    // 获取标签
    getTags (obj) { // {userId:查询该用户||不传查全部}
      getTags(obj || {}).then(res => {
        if (res.data.code === 200) {
          this.tagList = res.data.res
          this.tagList.map(item => {
            if (JSON.parse(item.follows).includes(this.userInfo.id)) {
              item.followed = true
            } else {
              item.followed = false
            }
          })
        } else {
          console.log('failed')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 修改标签关注状态
    changeTag (item) {
      console.log({ userId: this.userInfo.id, tagId: item.id })
      changeTag({ userId: this.userInfo.id, tagId: item.id }).then(res => {
        if (res.data.code === 200) {
          if (this.tabId === 0) {
            this.getTags({ userId: this.userInfo.id })
          } else {
            this.getTags()
          }
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
.team-title {
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
.tag-box {
  padding: 1rem;
}
.tag-name {
  font-size: 1.2rem;
}
.tag-count {
  color: gray;
  font-size: 0.8rem;
}
.tag-btn {
  margin: 0.3rem 0 1.2rem 0;
}
</style>
