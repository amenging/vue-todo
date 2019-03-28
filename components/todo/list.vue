<template>
  <div :class="['todo-title', 'hideLeft', showMenu ? 'showLeft' : '']">
    <div class="todo-title-header">清单列表</div>
    <ul>
      <li
        v-for="(list, index) in lists"
        @click.self="handleListTitle(index)"
        @touchend="touchStart(index)"
        :class="{'titleActive': index == currentIndex}"
        :key="index">
        <span @click.self="handleListTitle(index)">{{ list.list_name }}</span>
        <span class="deleteList" @click="deleteList(index)">
          <i class="iconfont icon-delete"></i>
        </span>
        <span class="editList" @click="editList(index)">
          <i class="iconfont icon-edit"></i>
        </span>
      </li>
    </ul>
    <!-- 工具列表 -->
    <todo-menu></todo-menu>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

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
      handleListTitle () {},

      touchStart () {},

      deleteList () {},

      editList () {},
    }
  }
</script>

<style scoped="scoped">

</style>
