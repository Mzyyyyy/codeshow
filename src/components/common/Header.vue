<template>
  <div class="header">
    <div class="header-container">
      <div style="width:10rem">
        logo
      </div>
      <div class="
           head-center">
        <div class="header-item">首页</div>
        <div class="header-item">热点</div>
        <div class="header-item">专栏</div>
        <div class="header-item">活动</div>
      </div>
      <div class="search-box">
        <el-input placeholder="请输入搜索内容"
                  suffix-icon="el-icon-search"
                  v-model="searchContent">
        </el-input>
      </div>
      <div class="login-box">
        <div class="point"
             @click="goLogin">登录</div>
        <div class="split-line">|</div>
        <div class="point">注册</div>
      </div>
    </div>
    <div class="header-tag">
      <div class="tag-type">
        <div class="tag-item"
             v-for="(item,index) in codeType"
             :key="index">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {

  },
  data () {
    return {
      // 搜索内容
      searchContent: '',
      // 代码分类
      codeType: [
        {
          name: 'javaScript'
        },
        {
          name: 'css'
        }
      ]
    }
  },
  methods: {
    goLogin () {
      this.$router.push('/login')
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
  color: rgba(84, 200, 162, 1);
  height: $header-height;
  background: white;
  border-bottom: 1px solid $border-color;
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
    // margin-left: 5rem;
  }
  .login-box {
    display: flex;
    font-size: 1.2rem;
    .split-line {
      margin: 0 0.5rem;
    }
  }
  .header-item {
    margin: 0 1rem;
    font-size: 1.2rem;
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
    box-shadow: 0px 2px 2px $gray;
    // -webkit-box-shadow: 0px 5px 10px $gray;
    // text-align: center;
    display: flex;
    justify-content: center;
    height: 2rem;
    line-height: 2rem;
    border-bottom: 1px solid $border-color;
    .tag-type {
      // box-sizing: border-box;
      width: calc(100vw - 37vw);
      display: flex;
      text-align: left;
      .tag-item {
        margin-right: 2rem;
        cursor: pointer;
      }
    }
  }
}
</style>
