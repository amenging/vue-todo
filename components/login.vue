<template>
  <div class="messageDiv">
    <div class="dialog-body">
      <form class='dialog-content login-form'>
        <div class='form-control'>
          <label>用户名</label>
          <input
            autocomplete='username'
            placeholder='用户名（10个字符以内）'
            v-focus='true'
            maxlength='10' 
            v-model.trim='username' />
        </div>
        <div class='form-control'>
          <label>密码</label>
          <input
            type='password'
            autocomplete='current-password'
            placeholder='密码（12个字符以内）'
            maxlength='12' 
            v-model.trim='password' />
        </div>
        <div class='form-control'>
          <label></label>
          <button @click.stop.prevent='login' class='login'>登录</button>
          <button @click.stop.prevent='reg' class='reg'>注册</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    props: {

    },

    data () {
      return {
        username: '',
        password: ''
      }
    },
    
    methods: {
      login () {},

      reg () {},
    }
  }
</script>

<style scoped='scoped'>
  .messageDiv {
    background: rgba(0, 0, 0, 0.6);
  }
</style>