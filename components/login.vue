<template>
  <div class="messageDiv" v-show="showLogin" @click="toggleLogin">
    <div class="dialog-body" @click.stop.prevent="stop">
      <form class="dialog-content login-form">
        <div class="form-control">
          <label>用户名</label>
          <input
            key="username"
            v-if="showLogin"
            autocomplete="username"
            placeholder="用户名（10个字符以内）"
            v-focus="true"
            maxlength="10"
            v-model.trim="username" />
        </div>
        <div class="form-control">
          <label>密码</label>
          <input
            type="password"
            autocomplete="current-password"
            placeholder="密码（12个字符以内）"
            maxlength="12"
            v-model.trim="password" />
        </div>
        <div class="form-control" v-show="!loginform">
          <label>确认密码</label>
          <input
            type="password"
            placeholder="请再次输入密码"
            maxlength="12"
            v-model.trim="rePassword" />
        </div>
        <div class="form-control" v-show="loginform">
          <label></label>
          <button @click.stop.prevent="login" class="login">登录</button>
        </div>
        <div class="form-control" v-show="!loginform">
          <label></label>
          <button @click.stop.prevent="reg" class="reg">注册</button>
        </div>
        <div class="form-control">
          <label></label>
          <div class="changeLoginForm" @click="loginform = !loginform">{{ loginform ? "没有账号？注册一个吧" :"已有账号？马上登录" }}</div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  import { userLogin, userReg } from '@/assets/api/user_action'

  export default {
    props: {

    },

    data () {
      return {
        username: '',
        password: '',
        rePassword: '',
        status: 'login',
        loginform: true
      }
    },

    computed: {
      ...mapState([
        'showLogin',
      ])
    },

    methods: {
      stop () {},

      login () {
        if (this.username == '' || this.password == '') {
          this.toggleMessage('请输入用户名和密码')
          return
        }

        this.toggleLoading()

        userLogin({
          username: this.username,
          password: this.password
        }).then(res => {
          this.toggleLoading()

          if (res.data.code == 0) {
            this.setUserInfo({
              userid: res.data.data.userid,
              username: this.username
            })
            this.toggleMessage('登录成功')
            this.toggleLogin()

            this.$store.dispatch('listInit', res.data.data.userid)
          } else {
            this.toggleMessage(res.data.msg)
          }
        })
      },

      reg () {
        if (this.username == '' || this.password == '') {
          this.toggleMessage('请输入用户名和密码')
          return
        }

        if (!this.loginform && this.password != this.rePassword) {
          this.toggleMessage('两次输入的密码不一样')
          return
        }

        this.toggleLoading()

        userReg({
          username: this.username,
          password: this.password
        }).then(res => {
          this.toggleLoading()

          if (res.data.code == 0) {
            this.toggleMessage('注册成功')
            this.toggleLogin()
            this.loginform = false
          } else {
            this.toggleMessage(res.data.msg)
          }

          setTimeout(() => {
            this.toggleMessage()
          }, 1000)
        })
      },

      toggleMessage (data) {
        this.$store.dispatch('toggleMessage', data || null)
      },

      ...mapMutations([
        'toggleLogin',
        'toggleLoading',
        'setUserInfo',
      ])
    },

    mounted () {

    }
  }
</script>

<style scoped='scoped'>
  .messageDiv {
    background: rgba(0, 0, 0, 0.6);
  }
  .changeLoginForm {
    text-decoration: underline;
    font-size: 13px;
    text-align: center;
    cursor: pointer;
    display: inline-block;
  }
  .changeLoginForm:hover {
    color: #0f9280;
  }
</style>
