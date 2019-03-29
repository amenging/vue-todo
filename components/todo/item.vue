<template>
  <div class="todo-list">
    <div class='todo-tab'>
      <div
        :class="['tab-item', index == status ? 'tab-active': '']"
        @click="changeStatus(index)"
        v-for="(title, index) in tabtitles"
        :key="index">
        {{title}}
      </div>
    </div>

    <ul>
      <div v-if="currentItems.length == 0" class="nothing">
        啥都木有哦(*/ω＼*)
      </div>

      <!-- 新增事项的输入框 -->
      <input
        v-if="status == 0"
        v-model.trim="newItemValue"
        @keyup.enter="addTodoItem"
        class="addNewItem"
        placeholder="输入后enter新增" />
      <li
        v-for="(list, index) in currentItems"
        :class="{ 'checked': list.status == 1 }"
        :key="index">

        <!-- 状态按钮 -->
        <div class="checkRadio">
          <i
            @click="changeTodoItemStatus(list.items_id, list.status)"
            :class="['iconfont icon-weixuanyuanquan', list.status == 1 ? check : uncheck]"></i>
        </div>

        <!-- 内容 -->
        <div>
          <span
            @click="editTodoItem(list.items_id, list.content)"
            class="listContent">{{ list.content }}</span>
        </div>

        <!-- 删除按钮 -->
        <div>
          <span
            @click="removeTodoItem(list.items_id)"
            class="deleteItem">
            <i class="iconfont icon-delete"></i>
          </span>
        </div>

        <!-- 编辑框 -->
        <input
          class="editInput"
          v-if="editIndex == list.items_id && list.status == 0"
          v-model.trim="editValue"
          v-focus="editIndex == list.items_id"
          @blur="confirmEdit(list.items_id)"
          @keyup.enter="editIndex = null"/>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapMutations } from 'vuex'

  export default {
    props: {
    },

    data () {
      return {
        editIndex: 0,
        editValueTmp: '',
        editValue: '',
        newItemValue: '',
        tabtitles: ['全部', '未完成', '已完成'],
        check: "icon-check",
        uncheck: "icon-weixuanyuanquan",
      }
    },

    computed: {
      ...mapState([
        'currentIndex',
        'status'
      ]),
      ...mapGetters([
        'currentItems'
      ])
    },

    methods: {
      addTodoItem () {
        if (this.currentEditListValue === '') {
          this.$store.dispatch('toggleMessage', '你还什么都没写呢')
          return
        }

        this.$store.dispatch('addTodoItem', {
          content: this.newItemValue
        })

        this.newItemValue = ''
      },

      // 编辑框
      editTodoItem (id, content) {
        this.editIndex = id
        this.editValue = this.editValueTmp = content
      },

      // 确认编辑
      confirmEdit (id) {
        this.editIndex = null
        if (this.editValue == this.editValueTmp) return

        this.$store.dispatch('editTodoItem', {
          item_id: id,
          content: this.editValue
        })

      },

      changeTodoItemStatus (id, status) {
        this.$store.dispatch('changeTodoItemStatus', {
          item_id: id,
          status: 1 - status
        })
      },

      removeTodoItem (id) {
        this.$store.dispatch('removeTodoItem', { item_id: id })
      },

      tabChange () {},

      ...mapMutations([
        'changeStatus',
        // 'editTodoItem',
        // 'changeTodoItemStatus',
      ])
    }
  }
</script>

<style scoped='scoped'>

</style>
