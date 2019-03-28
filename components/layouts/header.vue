<template>
  <header>
    <div class="nav">
      <div class="menu" @click='showMenu = true'>
        <i class="iconfont icon-menu"></i>
      </div>
      <div class="title">
        TODO
      </div>

      <div>
        <div v-if="username === null" class="login" @click='toggleLogin'>
          Login
        </div>
        <div
          class='username'
          v-else>
          <span class="username-text">{{ username }}<span class="arrow"></span></span>
          <span class="username-icon"><i class="iconfont icon-caidan08"></i></span>
          <div class="userMenu">
            <span class="triangle"></span>
            <ul>
              <li class="phone-username">{{ username }}</li>
              <li @click='logout'>退出登录</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  import { userLogout } from '@/assets/api/user_action'

  export default {
    props: {
      showMenu: false
    },

    data () {
      return {

      }
    },

    computed: {
      ...mapState({
        username: 'USER_NAME'
      })
    },

    methods: {
      logout () {
        userLogout().then(res => {
          console.log(res)
          if (res.data.code == 0) {
            this.setUserInfo({
              userid: null,
              username: null
            })

            this.setLists([])
            this.setItems([])
          }
        })
      },

      ...mapMutations([
        'toggleLogin',
        'setUserInfo',
        'setLists',
        'setItems',
      ])
    }
  }
</script>

<style scoped='scoped'>
header {
  background: #444c5f;
  background: linear-gradient(to right, #02AAB0, #00cdac);
  height: 70px;
  letter-spacing: 2px;
}
.title {
  font-size: 1.6em;
}
.title img {
  width: 28px;
}
.nav, .todo-app {
  width: 80%;
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.login, .username {
  cursor: pointer;
  position: relative;
}
.arrow {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-bottom: 1px solid #fff;
  border-right: 1px solid #fff;
  transform: rotate(45deg) translateY(-2px);
  margin-left: 5px;
}
</style>
