<template>
  <div>
    <div class="wrapper">
      <div class="container">
        <h1 style="color:white">Welcome</h1>

        <div class="form">
          <input type="text"
                 v-model="user.account"
                 placeholder="账号">
          <input v-if="this.$route.path==='/registry'"
                 type="text"
                 v-model="user.name"
                 placeholder="用户名">
          <input type="
                 password"
                 v-model="user.password"
                 placeholder="密码">
          <button v-if="this.$route.path==='/login'"
                  type="submit"
                  id="login-button"
                  @click="login">登录</button>
          <button v-else
                  type="submit"
                  id="login-button"
                  @click="registry">注册</button>
        </div>
      </div>

      <ul class="bg-bubbles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  </div>
</template>

<script>
import { login, registry } from '@/api/user'
// console.log(login)
export default {
  components: {

  },
  data () {
    return {
      user: {
        // 用户名
        name: '',
        // 账号
        account: null,
        // 密码
        password: null
      }
    }
  },
  created () {

  },
  mounted () {

  },
  methods: {
    // 登录
    login (event) {
      event.preventDefault()
      // document.getElementsByClassName('form')[0].fadeOut(500)
      // document.getElementsByClassName('wrapper')[0].addClass('form-success')
      login({ ...this.user }).then(res => {
        if (res.data.code === 200) {
          if (res.data.res.length > 0) {
            localStorage.setItem('userInfo', JSON.stringify(res.data.res[0]))
            this.$router.push('index')
          } else {
            console.log(res.data.msg)
          }
        } else {
          console.log('登录失败')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 注册
    registry (event) {
      event.preventDefault()
      registry({ ...this.user }).then(res => {
        if (res.data.msg === '注册成功') {
          this.$router.push('login')
        } else {
          console.log(res.data.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.wrapper {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-weight: 300;
  font-family: "Source Sans Pro", sans-serif;
  color: white;
  font-weight: 300;
}

.wrapper ::-webkit-input-placeholder {
  /* WebKit browsers */
  font-family: "Source Sans Pro", sans-serif;
  color: white;
  font-weight: 300;
}
.wrapper :-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  font-family: "Source Sans Pro", sans-serif;
  color: white;
  opacity: 1;
  font-weight: 300;
}
.wrapper ::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  font-family: "Source Sans Pro", sans-serif;
  color: white;
  opacity: 1;
  font-weight: 300;
}
.wrapper :-ms-input-placeholder {
  /* Internet Explorer 10+ */
  font-family: "Source Sans Pro", sans-serif;
  color: white;
  font-weight: 300;
}
.wrapper {
  background: #50a3a2;
  background: -webkit-linear-gradient(top left, #50a3a2 0%, #53e3a6 100%);
  background: -moz-linear-gradient(top left, #50a3a2 0%, #53e3a6 100%);
  background: -o-linear-gradient(top left, #50a3a2 0%, #53e3a6 100%);
  background: linear-gradient(to bottom right, #50a3a2 0%, #53e3a6 100%);
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.wrapper.form-success .container h1 {
  transform: translateY(85px);
}
.container {
  position: relative;
  top: 25%;
  margin: 0 auto;
  max-width: 600px;
  padding: 80px 0;
  height: 400px;
  text-align: center;
}
.container h1 {
  font-size: 40px;
  transition-duration: 1s;
  transition-timing-function: ease-in-put;
  font-weight: 200;
}
.form {
  padding: 20px 0;
  position: relative;
  z-index: 2;
}
.form input {
  appearance: none;
  outline: 0;
  border: 1px solid rgba(255, 255, 255, 0.4);
  background-color: rgba(255, 255, 255, 0.2);
  width: 250px;
  border-radius: 3px;
  padding: 10px 15px;
  margin: 0 auto 10px auto;
  display: block;
  text-align: center;
  font-size: 18px;
  color: white;
  transition-duration: 0.25s;
  font-weight: 300;
}
.form input:hover {
  background-color: rgba(255, 255, 255, 0.4);
}
.form input:focus {
  background-color: white;
  width: 300px;
  color: #53e3a6;
}
.form button {
  appearance: none;
  outline: 0;
  background-color: white;
  border: 0;
  padding: 10px 15px;
  color: #53e3a6;
  border-radius: 3px;
  width: 282px;
  cursor: pointer;
  font-size: 18px;
  transition-duration: 0.25s;
}
.form button:hover {
  background-color: #f5f7f9;
}
.bg-bubbles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
.bg-bubbles li {
  position: absolute;
  list-style: none;
  display: block;
  width: 40px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.15);
  bottom: -160px;
  -webkit-animation: square 25s infinite;
  animation: square 25s infinite;
  -webkit-transition-timing-function: linear;
  transition-timing-function: linear;
}
.bg-bubbles li:nth-child(1) {
  left: 10%;
}
.bg-bubbles li:nth-child(2) {
  left: 20%;
  width: 80px;
  height: 80px;
  animation-delay: 2s;
  animation-duration: 17s;
}
.bg-bubbles li:nth-child(3) {
  left: 25%;
  animation-delay: 4s;
}
.bg-bubbles li:nth-child(4) {
  left: 40%;
  width: 60px;
  height: 60px;
  animation-duration: 22s;
  background-color: rgba(255, 255, 255, 0.25);
}
.bg-bubbles li:nth-child(5) {
  left: 70%;
}
.bg-bubbles li:nth-child(6) {
  left: 80%;
  width: 120px;
  height: 120px;
  animation-delay: 3s;
  background-color: rgba(255, 255, 255, 0.2);
}
.bg-bubbles li:nth-child(7) {
  left: 32%;
  width: 160px;
  height: 160px;
  animation-delay: 7s;
}
.bg-bubbles li:nth-child(8) {
  left: 55%;
  width: 20px;
  height: 20px;
  animation-delay: 15s;
  animation-duration: 40s;
}
.bg-bubbles li:nth-child(9) {
  left: 25%;
  width: 10px;
  height: 10px;
  animation-delay: 2s;
  animation-duration: 40s;
  background-color: rgba(255, 255, 255, 0.3);
}
.bg-bubbles li:nth-child(10) {
  left: 90%;
  width: 160px;
  height: 160px;
  animation-delay: 11s;
}
@-webkit-keyframes square {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-1080px) rotate(600deg);
  }
}
@keyframes square {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-1080px) rotate(600deg);
  }
}
</style>
