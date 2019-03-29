<template>
  <div :class="['todo-title', 'hideLeft', showMenu ? 'showLeft' : '']">
    <div class="todo-title-header">清单列表</div>
    <ul>
      <li
        v-for="(list, index) in lists"
        @click.self="changeCurrentIndex(index)"
        @touchend="touchStart(index)"
        :class="{'titleActive': index == currentIndex}"
        :key="index">
        <span @click.self="changeCurrentIndex(index)">{{ list.list_name }}</span>
        <span class="deleteList" @click="removeTodoList(index)">
          <i class="iconfont icon-delete"></i>
        </span>
        <span class="editList" @click="toggleEditForm(index)">
          <i class="iconfont icon-edit"></i>
        </span>
      </li>
    </ul>
    <!-- 工具列表 -->
    <todo-menu></todo-menu>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'

  import TodoMenu from '@/components/todo/menu'

  export default {
    components: { TodoMenu },

    props: {
    },

    data () {
      return {
        index: 0,
        showMenu: false,
        title: 's'
      }
    },

    computed: {
      ...mapState([
        'lists',
        'currentIndex',
      ])
    },

    methods: {
      removeTodoList (index) {
        this.$store.dispatch('removeTodoList', index)
      },

      touchStart () {},

      deleteList () {},

      ...mapMutations([
        'changeCurrentIndex',
        'toggleEditForm'
      ])
    }
  }
</script>

<style scoped="scoped">

</style>
