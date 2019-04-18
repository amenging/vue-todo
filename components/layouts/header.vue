<template>
  <header>
    <div class="nav">
      <div class="menu" @click="toggleShowMenu(true)">
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
          class="username"
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
    },

    data () {
      return {
        showMenu: false
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
        'toggleShowMenu'
      ])
    }
  }
</script>

<style scoped='scoped'>
</style>
