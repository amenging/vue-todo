<template>
  <header>
    <div class="nav">
      <div class="menu" @click='showMenu = true'>
        <i class="iconfont icon-menu"></i>
      </div>
      <div class="title">
        <!-- <img src="t.png"> -->
        TODO
      </div>
      <!-- 搜索 -->
      <!-- <div class="search">
        <input v-model='searchValue' @keyup.enter='search'></input>
        <i
          @click='clearSearchValue'
          :class="['iconfont', searchValue ? 'icon-delete' : 'icon-search']"></i>
        <div>
          
        </div>
      </div> -->
      <!-- 用户 -->
      <div>
        <div 
          v-if='!username' 
          class="login" 
          @click='showLogin = true'>
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
    <!-- 登录框 -->
    <!-- <todo-dialog @hidedialog='showLogin = false' v-if='showLogin'>
      <login-dialog 
        @login='userAction' 
        @reg='userAction'>
      </login-dialog>
    </todo-dialog> -->
  </header>
</template>

<script>
  export default {
    props: {
      showMenu: false,
      username: '',
      showLogin: false,
    },

    data () {
      return {

      }
    },
    
    methods: {
      logout () {}
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