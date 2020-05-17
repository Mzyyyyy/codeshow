<template>
  <div>
    <div class="menu-box">
      <div v-for="(item,index) in menuList"
           :key="index"
           class="menu-item">
        <el-badge :value="item.value||null"
                  class="item">
          <!-- <el-button :circle="item.text?false:true"
                     :icon="item.text?null:item.icon"
                     @click="item.func"
                     size="large">{{item.text}}</el-button> -->
          <div class="wrapper">
            <a href="#"
               class="button"
               @click="item.func">{{item.text}}</a>
          </div>
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
  height: 3rem;
}
// $color: #2194e0;
$color: #00bcd4;
@keyframes sheen {
  0% {
    transform: skewY(-45deg) translateX(0);
  }
  100% {
    transform: skewY(-45deg) translateX(12.5em);
  }
}

.wrapper {
  // display: block;
  // position: absolute;
  // top: 50%;
  // left: 50%;
  // transform: translate(-50%, -50%);
  position: relative;
}
.button {
  position: absolute;
  padding: 0.4rem 0.8rem;
  text-align: center;
  text-decoration: none;
  color: $color;
  border: 2px solid $color;
  font-size: 1.2rem;
  display: inline-block;
  border-radius: 0.3em;
  transition: all 0.2s ease-in-out;
  position: relative;
  overflow: hidden;
  &:before {
    content: "";
    background-color: rgba(255, 255, 255, 0.5);
    height: 100%;
    width: 3em;
    display: block;
    position: absolute;
    top: 0;
    left: -4.5em;
    transform: skewX(-45deg) translateX(0);
    transition: none;
  }
  &:hover {
    background-color: $color;
    color: #fff;
    border-bottom: 4px solid darken($color, 10%);
    &:before {
      transform: skewX(-45deg) translateX(13.5em);
      transition: all 0.5s ease-in-out;
    }
  }
}
</style>
