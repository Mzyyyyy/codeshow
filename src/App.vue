<template>
  <div id="app">
    <Header v-if="this.$route.path!=='/login'"></Header>
    <div :class="this.$route.path==='/login'?'':'root-container'">
      <router-view class="router-view" />
    </div>

  </div>
</template>
<script>
import Header from './components/common/Header'
export default {
  components: {
    Header
  },
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>

<style lang="scss">
@import "@/assets/css/common.scss";
* {
  margin: 0;
  padding: 0;
  // color: rgba(84, 200, 162, 1);
  // text-align: center;
}
#app {
  // background: $background-color;
  background: #f4f5f5;
  text-align: center;
}
.root-container {
  margin-top: $header-height;
  min-height: calc(100vh - 5rem);
  // max-width: calc(100vw - 40vw);
  display: flex;
  justify-content: center;
  .router-view {
    width: calc(100vw - 40vw);
    background: white;
    padding: 2rem 1.5rem;
  }
}
</style>
