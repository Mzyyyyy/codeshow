<template>
  <div class="dasgboard-list">
    <div class="list-box">
      <div v-for="(item,index) in list"
           :key="index"
           class="list-item">
        <div class="item-info">
          <div>专栏·作者·时间</div>
          <h1>剖析Vue.js内部运行机制</h1>
          <div class="list-content">想要进入大厂，除了专业知识准备充分之余，如果可以了解内部的技术，就可以更有针对性地进行准备和学习。想要进入大厂，除了专业知识准备充分之余，如果可以了解内部的技术，就可以更有针对性地进行准备和学习。</div>
          <div class="list-btn">
            <el-button icon="el-icon-star-off"
                       type="small"></el-button>
            <!-- <el-button icon="el-icon-star-on"
                       type="small"></el-button> -->
            <el-button icon="el-icon-chat-dot-square"
                       type="small"></el-button>
          </div>
        </div>
        <div class="list-photo">图片</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      required: true
    }
  },
  components: {

  },
  created () {
    console.log(this.list)
  },
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/common.scss";

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
</style>
