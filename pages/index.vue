<template>
  <div>
    <div class="todo-app">
      <todo-list :lists="lists"></todo-list>
      <todo-item :items="currentItems"></todo-item>
    </div>
  </div>
</template>

<script>
import TodoList from '~/components/todo/list.vue'
import TodoItem from '~/components/todo/item.vue'

import { getTodoLists } from '~/assets/api/todo'

export default {
  name: 'index',

  components: {
    TodoList,
    TodoItem
  },

  asyncData () {
    return getTodoLists().then(res => {
      console.log(res)
      return {
        items: res.data.data.items,
        lists: res.data.data.lists
      }  
    })
    .catch (e => {
      console.log(e)
    })

  },

  data () {
    return {
      // lists: '',
    }
  },

  computed: {
    currentItems () {
      return this.items
    }
  },

  mounted () {
  //  getTodoLists().then(res => {
  //     console.log(res)
  //     return res.data
  //   }) 
  }
}
</script>

<style>

</style>
