<template>
  <div :class="['todo-title', 'hideLeft', showMenu ? 'showLeft' : '']">
    <div class="todo-title-header">清单列表</div>
    <ul>
      <li
        v-for="(list, index) in lists"
        @click.self="_changeCurrentIndex(index)"
        @touchend="touchStart(index)"
        :class="{'titleActive': index == currentIndex}"
        :key="index">
        <div @click.self="_changeCurrentIndex(index)">{{ list.list_name }}</div>
        <div>
          <span class="deleteList" @click="removeTodoList(index, list.list_name)">
            <i class="iconfont icon-delete"></i>
          </span>
          <span class="editList" @click="toggleEditForm(index)">
            <i class="iconfont icon-edit"></i>
          </span>
        </div>
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
        title: 's'
      }
    },

    computed: {
      ...mapState([
        'lists',
        'currentIndex',
        'showMenu'
      ])
    },

    methods: {
      removeTodoList (index, list_name) {
        this.togglePrompt({
          content: `你确认要删除${list_name}吗？`,
          next: 'removeTodoList',
          data: index
        })
      },

      touchStart () {},

      deleteList () {},

      _changeCurrentIndex (index) {
        this.changeCurrentIndex(index)
        this.toggleShowMenu(false)
      },

      ...mapMutations([
        'changeCurrentIndex',
        'toggleEditForm',
        'toggleShowMenu',
        'togglePrompt'
      ])
    }
  }
</script>

<style scoped="scoped">

</style>
