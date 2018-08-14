Vue.directive('focus', {
  inserted (el, {value}) {
    console.log(value)
    if (value) {
      el.focus()
    }
  }
})

// 应用
Vue.component('todo-app', {
  props: {
    'todos': {
      type: Array
    }
  },
  template: `
    <div>
      <slot></slot>
      <slot
        name='content'
        v-for='(todo, index) in todos'
        :index='index'
        :todo='todo'></slot>
    </div>
  `
})

// 标题列表
Vue.component('todo-title', {
  props: {
    'todo': {
      type: Object
    },
    title: {
      type: Number || String
    },
    index: {
      type: Number
    }
  },
  template: `
    <li @click.self='handleListTitle(index)' :class='{"titleActive": index == title}'>
      <span @click.self='handleListTitle(index)'>{{todo.name}}</span>
      <span class='deleteList' @click='deleteList(index)'>
        <i class='iconfont icon-delete'></i>
      </span>
      <span class='editList' @click='editList(index)'>
        <i class='iconfont icon-edit'></i>
      </span>
    </li>
  `,
  methods: {
    handleListTitle (index) {
      this.$emit('handlelisttitle', index)
    },
    editList (index) {
      this.$emit('editlist', index)
    },
    deleteList (index) {
      this.$emit('deletelist', index)
    }
  }
})

// 清单列表
Vue.component('list', {
  props: {
    lists: {
      type: Array,
      default () {
        return []
      }
    },
    count: {
      type: [Number, String]
    },
    title: {
      type: [Number, String]
    },
    inputval: {
      type: [Number, String]
    },
    editval: {
      type: [Number, String]
    },
    editindex: {
      type: [Number, String]
    },
    choosetab: {
      type: [Number, String]
    }
  },
   // v-if='lists.length > 0'
  template: `
    <div class='todo-list' v-if='count == title'>
      <slot></slot>
      <ul>
        <li v-for='(list, index) in lists' :class='{ "checked": list.status == 1 }'>
          <input
            class='editInput'
            v-if='editIndex == index && list.status == 0'
            v-model='editValue'
            v-focus='editIndex == index'
            @blur='confirmEdit(index)'
            @keyup.enter='confirmEdit(index)'/>
          <div class='checkRadio'>
            <i 
              @click='click(index)' 
              :class='["iconfont", list.status == 1 ? check : uncheck]'></i>
          </div>
          <div>
            <span
              @click='editItem(index)'
              class='listContent'>{{ list.content }}</span>
          </div>
          <div>
            <span
              @click='deleteItem(index)'
              class='deleteItem'>
              <i class='iconfont icon-delete'></i>
            </span>
          </div>
        </li>
        <div v-if='lists.length == 0' class='tips'>啥都木有哦(*/ω＼*)</div>
        <input
          v-if='choosetab == 0'
          v-model='val'
          @keyup.enter='addNewItem'
          class='addNewItem'
          placeholder='输入后enter新增'></input>
      </ul>
    </div>
  `,
  data () {
    return {
      choose: [],
      check: "icon-check",
      uncheck: "icon-weixuanyuanquan",
      val: this.inputval,
      editValue: this.editval,
      editIndex: this.editindex,
    }
  },
  computed: {

  },
  watch: {
    inputval () {
      this.val = this.inputval
    },
    editval () {
      this.editValue = this.editval
    },
    editindex () {
      this.editIndex = this.editindex
    }
  },
  methods: {
    click (index) {
      this.$emit('changestatus', index)
    },
    editItem (index) {
      this.$emit('edititem', index)
    },
    deleteItem (index) {
      this.$emit('deleteitem', index)
    },
    addNewItem () {
      this.$emit('addnewitem', this.val)
      this.val = ''
    },
    confirmEdit (index) {
      this.$emit('confirmedit', { index, val: this.editValue })
    }
  }
})

// Vue.dialog
Vue.component('todo-dialog', {
  template: `
    <div class='dialog'>
      <div class='dialog-body'>
        <div class='dialog-header'></div>
        <slot></slot>
      </div>
    </div>
  `
})

Vue.component('list-dialog', {
  props: {
    listdata: {
      type: [Object, String]
    }
  },
  data () {
    return {
      editListValue: this.listdata.name || '',
      online: this.listdata.online == false ? false : true
    }
  },
  template: `
    <div>
      <div class='dialog-content'>
        <div>
          <label>清单名称</label>
          <input
            v-focus='true'
            maxlength='10' 
            @keyup.enter='submit' 
            v-model='editListValue' />
        </div>
        <div>
          <label>云端同步</label>
          <input v-model='online' type='checkbox' />
        </div>
      </div>
      <div class='dialog-footer'>
        <button @click='cancel'>取消</button>
        <button @click='submit'>确认</button>
      </div>
    </div>
  `,
  methods: {
    cancel () {
      this.$emit('cancel')
    },
    submit () {
      this.$emit('submitlist', {
        name: this.editListValue,
        online: this.online
      })
    },
  }
})

Vue.component('login-dialog', {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  template: `
    <div class='dialog-content'>
      <div>
        <label>用户名</label>
        <input
          placeholder='用户名'
          v-focus='true'
          maxlength='10' 
          v-model='username' />
      </div>
      <div>
        <label>密码</label>
        <input
          type='password'
          placeholder='密码'
          maxlength='10' 
          @keyup.enter='submit' 
          v-model='password' />
      </div>
    </div>
  `,
  methods: {
    submit () {
      this.$emit('submit', {
        name: this.username,
        pass: this.password
      })
    }
  }
})

// 标签切换
Vue.component('todo-tab', {
  props: {
    titles: {
      type: Array
    }, 
    choosetab: {
      type: [Number, String]
    }
  },
  template: `
    <div class='todo-tab'>
      <div
        :class="['tab-item', index == choosetab ? 'tab-active': '']"
        @click='tabChange(index)' 
        v-for='(title, index) in titles'>
        {{title}}
      </div>
    </div>
  `,
  methods: {
    tabChange (index) {
      this.$emit('tabchange', index)
    }
  }
})


const Todo = new Vue({
  el: '#app',
  data: {
    todoData: [],
    // todos: [],
    titles: ['全部', '未完成', '已完成'],
    title: 0,
    inputVal: '',
    editVal: '',
    editIndex: null,
    listData: '',
    showDialog: false,
    chooseTab: 0,
    searchValue: '',
    showLogin: false
  },
  methods: {
    changeStatus (i) {
      var list = this.todoData.todos[this.title].lists[i]
      list.status = Math.abs(list.status - 1)

      this.saveData()
    },
    handleListTitle (i) {
      this.title = i
    },
    addNewList () {
      this.showDialog = true

      this.saveData()
    },
    editList (i) {
      this.title = i
      this.listData = this.todoData.todos[i]
      this.showDialog = true

      this.saveData()
    },
    deleteList (i) {
      this.todoData.todos.splice(i, 1)
    
      if (this.title == i && !this.todoData.todos[i]) {
        this.title = i - 1
      }

      this.saveData()
    },

    addNewItem (val) {
      this.todoData.todos[this.title].lists.push({
        content: val,
        status: 0
      })

      this.saveData()
    },
    editItem (i) {
      this.editVal = this.todoData.todos[this.title].lists[i].content
      this.editIndex = i

      this.saveData()
    },
    deleteItem (i) {
      this.todoData.todos[this.title].lists.splice(i, 1)

      this.saveData()
    },
    confirmEdit (data) {
      this.editIndex = null
      this.todoData.todos[this.title].lists[data.index].content = data.val

      this.saveData()
    },
    cancel () {
      this.listData = ''
      this.showDialog = false
    },
    submitList (data) {
      if (this.listData) {
        this.todoData.todos[this.title].name = data.name
        this.todoData.todos[this.title].online = data.online
      } else {
        this.todoData.todos.push({
          name: data.name,
          online: data.online,
          lists: []
        })
        this.title = this.todoData.todos.length - 1
      }
      this.listData = ''
      this.showDialog = false
      this.saveData()
    },
    tabChange (i) {
      this.chooseTab = i
    },
    search () {

    },
    clearSearchValue () {
      this.searchValue = ''
    },

    saveData () {
      localStorage.setItem('todoData', JSON.stringify(this.todoData))
    },

    login (data) {

    }
  },
  watch: {
    
  },
  computed: {
    todos () {
      if (this.chooseTab == 0) {
        return this.todoData.todos
      } else {
        var todoList = JSON.parse(JSON.stringify(this.todoData.todos))
        var arr = todoList[this.title].lists.filter(ele => {
          return (ele.status + 1) == this.chooseTab
        })
        todoList[this.title].lists = arr
        return todoList
      }
    }
  },
  mouted () {},
  created () {
    var todoData
    var obj = localStorage.getItem('todoData')

    if (obj) {
      todoData = JSON.parse(obj)
    } else {
      todoData = {
        todos: [
        //  {
        //    name: '学习计划1',
        //    lists: [
        //      {
        //        content: '学习学习计划1学习计划1学习计划1学习计划1学习计划1学习计划1学习计划1学习计划1学习计划1学习计划1学习计划1学习计划1学习计划1学习计划1学习计划1学习计划1学习计划1学习计划1学习计划1学习计划1学习计划1学习计划1学习计划1学习计划1学习计划1学习计划1学习计划1学习计划1学习计划1学习计划1学习计划1学习计划1计划1',
        //        status: 0
        //      }
        //    ],
        //    online: true
        //  },
        //  {
        //    name: '学习计划2',
        //    lists: [
        //      {
        //        content: '学习计划1',
        //        status: 0
        //      },
        //      {
        //        content: '学习计划1',
        //        status: 0
        //      }
        //    ],
        //    online: false
        //  }
        ]
      }
    }
    this.todoData = todoData

    // axios.get('/vue-todo/server/db.php', {
    //   params: {
    //     id: 1
    //   }
    // })
    // .then(data => {
    //   console.log(data)
    // })
    // .catch(function (error) {
    //   console.log(error);
    // })
  }


})