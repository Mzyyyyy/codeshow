<template>
  <div>
    <!-- <Code :codeInfo="codeInfo"></Code> -->
    <div class="save-btn"
         style="top:10rem"
         @click="getCode">getCode</div>
    <div class="save-btn"
         @click="save">save</div>
    <vueCode :code="code"
             :readOnly="false"
             @changeCode="changeCode"></vueCode>
  </div>
</template>

<script>
// import Code from '../../components/code/codemirror'
import vueCode from '../../components/code/vueCodemirror'
import { submitCode, getCode } from '@/api/article'

export default {
  components: {
    // Code,
    vueCode
  },
  data () {
    return {
      // 用户信息
      userInfo: JSON.parse(localStorage.getItem('userInfo')) || null,
      // 当前代码
      code: ''
    }
  },
  methods: {
    // 保存
    save () {
      // this.$ScreenLoading.show('加载中...', 'top')
      const params = {
        title: 'article1',
        authorId: this.userInfo.id,
        authorName: this.userInfo.name,
        createTime: new Date(),
        content: this.code
      }
      submitCode(params).then(res => {
        if (res.data.code === 200) {

        } else {
          console.log('failed')
        }
        this.$ScreenLoading.hide()
      }).catch(err => {
        console.log(err)
      })
    },
    // 代码修改
    changeCode (val) {
      this.code = val
    },
    // 获取代码
    getCode () {
      const params = {}
      getCode(params).then(res => {
        if (res.data.code === 200) {
          this.code = res.data.res.content
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

<style lan="scss" scoped>
.save-btn {
  top: 15rem;
  position: absolute;
  right: 5rem;
  cursor: pointer;
}
</style>
