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

    <div
      class="clear"
      @click="clearDoneItems">
      <i class="iconfont">&#xe6d1;</i>
    </div>

    <ul>
      <div v-if="currentItems.length == 0" class="nothing">
        啥都木有哦(*/ω＼*)
      </div>

      <!-- 新增事项的输入框 -->
      <input
        key="item"
        ref="addItemInput"
        v-show="status == 0"
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

        <!-- 操作按钮 -->
        <div class="buttons">
          <span @click="changeTodoItemMark(list.items_id, list.mark)">
            <i class="iconfont" v-if="list.mark == 0">&#xe64e;</i>
            <i class="iconfont red" v-else>&#xe64d;</i>
          </span>
          <span class="line"></span>
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
        adding: false
      }
    },

    computed: {
      ...mapState([
        'currentIndex',
        'status',
        'showLoading'
      ]),
      ...mapGetters([
        'currentItems'
      ])
    },

    methods: {
      ...mapMutations([
        'changeStatus',
        'togglePrompt'
      ]),

      // 新增事项
      addTodoItem () {
        if (this.newItemValue === '') {
          this.$store.dispatch('toggleMessage', '你还什么都没写呢')
          return
        }

        if (this.showLoading) return

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
          value: this.editValue,
          key: 'content'
        })
      },

      // 改变事项状态
      changeTodoItemStatus (id, status) {
        this.$store.dispatch('editTodoItem', {
          item_id: id,
          value: 1 - status,
          key: 'status'
        })
      },

      changeTodoItemMark (id, mark) {
        this.$store.dispatch('editTodoItem', {
          item_id: id,
          value: 1 - mark,
          key: 'mark'
        })
      },

      // 删除事项
      removeTodoItem (id) {
        this.$store.dispatch('removeTodoItem', { item_id: id })
      },

      // 清除完成事项
      clearDoneItems () {
        this.togglePrompt({
          content: '你确认要清除此清单已完成的事项吗？',
          next: 'clearDoneItems'
        })
      }
    }
  }
</script>

<style scoped='scoped'>
  .clear {
    position: absolute;
    right: 0;
    width: 40px;
    height: 40px;
    border-radius: 40px;
    background: rgba(2, 182, 175, 0.62);
    text-align: center;
    line-height: 40px;
    right: -10px;
    top: -10px;
    box-shadow: 1px 1px 3px #c6d8d7;
    cursor: pointer;
  }
  .clear i {
    color: #fff;
    font-size: 22px;
  }
  .buttons {
    display: flex;
    align-content: center;
  }
  .buttons span {
    position: relative;
  }
  .buttons span {
    padding-right: 4px;
    padding-left: 4px;
  }
  .line {
    width: 1px;
    height: 15px;
    background: #ccc;
    position: absolute;
    margin: auto;
    top: 0;
    bottom: 0;
    right: 0;
    padding: 0 !important;
    display: inline-block;
  }
  .todo-list li {
    line-height: 20px;
  }
  .todo-list li i {
    vertical-align: middle;
  }
  .red {
    color: #01b9ae;
  }
</style>
