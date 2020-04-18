<template>
  <div>
    <div class="menu-box">
      <div v-for="(item,index) in menuList"
           :key="index"
           class="menu-item">
        <el-badge :value="item.value||null"
                  class="item">
          <el-button :circle="item.text?false:true"
                     :icon="item.text?null:item.icon"
                     @click="item.func"
                     size="large">{{item.text}}</el-button>
        </el-badge>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  props: {
    menuList: {
      type: Array,
      required: true
    }
  },
  components: {

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
.menu-box {
  text-align: center;
}
.menu-item {
  margin-bottom: 2rem;
}
</style>
