<template>
  <div>
    <!-- 登录框 -->
    <login-form></login-form>

    <!-- 消息弹窗 -->
    <message></message>

    <!-- 加载动画 -->
    <loading></loading>

    <!-- todo主体 -->
    <div class="todo-app" v-if="USER_ID != null">
      <!-- 清单列表 -->
      <todo-list></todo-list>

      <!-- 事项列表 -->
      <todo-item v-if="lists.length > 0"></todo-item>
      <div class="nothing" v-else>还没有清单呢</div>
    </div>

    <!-- 未登录提示信息 -->
    <div class="nothing" v-else>请先先登录或注册哦</div>
  </div>
</template>

<script>
  import TodoList from '@/components/todo/list'
  import TodoItem from '@/components/todo/item'
  import Loading from '@/components/toast/loading'
  import Message from '@/components/toast/message'
  import LoginForm from '@/components/login'
  import Tips from '@/components/toast/tips'

  import { getTodoLists } from '~/assets/api/todo'

  import { mapState } from 'vuex'

  export default {
    name: 'TodoApp',

    components: {
      TodoList,
      TodoItem,
      Loading,
      Message,
      LoginForm,
      Tips,
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
        'lists'
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
