<template>
  <div :class="['todo-title', 'hideLeft', showMenu ? 'showLeft' : '']">
    <div class="todo-title-header">清单列表</div>
    <ul>
      <li
        v-for="(list, index) in lists"
        @click.self="handleListTitle(index)"
        @touchend="touchStart(index)"
        :class="{'titleActive': index == title}"
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
  </div>
</template>

<script>
  export default {
    props: {
      lists: [Array]
    },

    data () {
      return {
        index: 0,
        showMenu: false,
        title: 's'
      }
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
