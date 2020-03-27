<template>
  <div class="dashboard">
    <!-- <div class="tab-bar"> -->
    <!-- <el-tabs v-model="activeName"
               @tab-click="handleClick"
               style="width:100%">
        <el-tab-pane label="javaScript"
                     name="first"></el-tab-pane>
      </el-tabs> -->
    <!-- </div> -->
    <List :list="listArr"></List>
  </div>
</template>

<script>
import List from '@/components/dashboard/List'
export default {
  components: {
    List
  },
  data () {
    return {
      // activeName: 'first'
      // 列表数据
      listArr: [1]
    }
  },
  created () {

  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
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
}
</style>
