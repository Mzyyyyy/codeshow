<template>
  <div>
    111
  </div>
</template>

<script>
import { login } from '@/api/user'
console.log(login)
export default {
  components: {

  },
  data () {
    return {

    }
  },
  created () {
    login({ name: 1 }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {

  }
}
</script>

<style>
</style>
