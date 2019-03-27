<template>
  <div class="todo-list">
    <div class='todo-tab'>
      <div
        :class="['tab-item', index == choosetab ? 'tab-active': '']"
        @click='tabChange(index)' 
        v-for='(title, index) in tabtitles'
        :key="index">
        {{title}}
      </div>
    </div>

    <ul>
      <div v-if='items.length == 0' class='nothing'>啥都木有哦(*/ω＼*)</div>
      <input
        v-if="choosetab == 0"
        v-model.trim="val"
        @keyup.enter="addNewItem"
        class="addNewItem"
        placeholder="输入后enter新增" />
      <li
        v-for="(list, index) in items"
        :class="{ 'checked': list.status == 1 }"
        :key="index">
        <div class="checkRadio">
          <i
            @click="click(list.items_id)"
            :class="['iconfont', list.status == 1 ? check : uncheck]"></i>
        </div>
        <div>
          <span
            @click="editItem(list.items_id)"
            class="listContent">{{ list.content }}</span>
        </div>
        <div>
          <span
            @click="deleteItem(list.items_id)"
            class="deleteItem">
            <i class="iconfont icon-delete"></i>
          </span>
        </div>
        <input
          class="editInput"
          v-if="editIndex == list.items_id && list.status == 0"
          v-model.trim="editValue"
          v-focus="editIndex == list.items_id"
          @blur="confirmEdit(list.items_id)"
          @keyup.enter="confirmEdit(list.items_id)"/>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: {
      items: [Array]
    },

    data () {
      return {
        choosetab: 0,
        editIndex: 0,
        val: '',
        choosetab: 0,
        tabtitles: ['全部', '未完成', '已完成']
      }
    },

    methods: {
      addNewItem () {},

      click () {},

      editItem () {},

      deleteItem () {},

      confirmEdit () {},

      tabChange () {},

      check() {},

      uncheck () {},
    }
  }
</script>

<style scoped='scoped'>

</style>
