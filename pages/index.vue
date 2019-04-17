<template>
  <div>
    <!-- 登录框 -->
    <login-form></login-form>

    <!-- 消息弹窗 -->
    <message></message>

    <!-- 加载动画 -->
    <loading></loading>

    <!-- 编辑弹窗 -->
    <edit-form></edit-form>

    <!-- 小贴士 -->
    <tips></tips>

    <!-- 导出清单弹窗 -->
    <export-form></export-form>

    <!-- 确认弹窗 -->
    <prompt></prompt>

    <div class="grey" v-show="showMenu" @click="toggleShowMenu(false)"></div>

    <!-- todo主体 -->
    <div class="todo-app">
      <!-- 清单列表 -->
      <todo-list></todo-list>

      <!-- 事项列表 -->
      <todo-item v-if="lists.length > 0"></todo-item>
      <div class="nothing" v-if="USER_ID != null && lists.length == 0">还没有清单呢</div>
    </div>

    <!-- 未登录提示信息 -->
    <div class="nothing" v-if="USER_ID == null">请先先登录或注册哦</div>
  </div>
</template>

<script>
  import TodoList from '@/components/todo/list'
  import TodoItem from '@/components/todo/item'
  import Loading from '@/components/toast/loading'
  import Message from '@/components/toast/message'
  import LoginForm from '@/components/login'
  import EditForm from '@/components/toast/form'
  import Tips from '@/components/toast/tips'
  import ExportForm from '@/components/toast/export-form'
  import Prompt from '@/components/toast/prompt'

  import { getTodoLists } from '~/assets/api/todo'

  import { mapState, mapMutations } from 'vuex'

  export default {
    name: 'TodoApp',

    components: {
      TodoList,
      TodoItem,
      Loading,
      Message,
      LoginForm,
      Tips,
      EditForm,
      ExportForm,
      Prompt,
    },

    data () {
      return {
      }
    },

    computed: {
      currentItems () {
        return this.items
      },

      ...mapState([
        'USER_ID',
        'lists',
        'showMenu'
      ])
    },

    methods: {
      ...mapMutations([
        'toggleShowMenu'
      ])
    },

    mounted () {
      if (this.USER_ID) {
        this.$store.dispatch('listInit', this.USER_ID)
      }
    }
  }
</script>

<style>

</style>
