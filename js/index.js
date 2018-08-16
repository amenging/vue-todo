const url = '/vue-todo/server/'

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
            v-model.trim='editValue'
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
          v-model.trim='val'
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
    <div class='dialog' @click.self='hideDialog'>
      <div class='dialog-body'>
        <div class='dialog-header'></div>
        <slot></slot>
      </div>
    </div>
  `,
  methods: {
    hideDialog () {
      this.$emit('hidedialog')
    }
  }
})

// 编辑清单框
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
        <div class='form-control'>
          <label>清单名称</label>
          <input
            v-focus='true'
            maxlength='10' 
            @keyup.enter='submit' 
            v-model.trim='editListValue' />
        </div>
        <div class='form-control'>
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

// 登录框
Vue.component('login-dialog', {
  props: ['message', 'beforesend'],
  data () {
    return {
      username: '',
      password: ''
    }
  },
  template: `
    <form class='dialog-content login-form'>
      <div class='form-control'>
        <label>用户名</label>
        <input
          autocomplete='username'
          placeholder='用户名（10个字符以内）'
          v-focus='true'
          maxlength='10' 
          v-model.trim='username' />
      </div>
      <div class='form-control'>
        <label>密码</label>
        <input
          type='password'
          autocomplete='current-password'
          placeholder='密码（12个字符以内）'
          maxlength='12' 
          v-model.trim='password' />
      </div>
      <div class='form-control'>
        <label></label>
        <button @click.stop.prevent='login' class='login'>登录</button>
        <button @click.stop.prevent='reg' class='reg'>注册</button>
        <i v-if='beforesend' class='iconfont icon-loading load'></i>
      </div>
      <div class='userMessage' v-if='message'>{{ message }}</div>
    </form>
  `,
  methods: {
    login () {
      this.$emit('login', {
        name: this.username,
        pass: this.password,
        action: 'login'
      })
    },
    reg () {
      this.$emit('reg', {
        name: this.username,
        pass: this.password,
        action: 'reg'
      })
    }
  }
})

// 标签切换
Vue.component('todo-tab', {
  props: {
    tabtitles: {
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
        v-for='(title, index) in tabtitles'>
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

const Cloud = {
  changeStatus (status, items_id) {
    return new Promise((resolve, reject) => {
      axios.post(url + 'post.php', {
        params: {
          status,
          items_id,
          action: 'edit'
        }
      })
      .then(res => {
        resolve(res.data)
      })
    })
  },
  addNewList (user, list_name) {
    return new Promise((resolve, reject) => {
      axios.post(url + 'post.php', {
        params: {
          user,
          list_name,
          action: 'add'
        }
      })
      .then(res => {
        resolve(res.data)
      })
    })
  },
  deleteList (list_id) {
    return new Promise((resolve, reject) => {
      axios.post(url + 'post.php', {
        params: {
          action: 'del',
          list_id
        }
      })
      .then(res => {
        resolve(res.data)
      })
    })
  },
  addNewItem (list_id, content, status) {
    return new Promise((resolve, reject) => {
      axios.post(url + 'post.php', {
        params: {
          list_id,
          content,
          action: 'add',
          status: status || 0
        }
      })
      .then(res => {
        console.log(res)
        resolve(res.data)
      })
    })
  },
  deleteItem (items_id) {
    return new Promise((resolve, reject) => {
      axios.post(url + 'post.php', {
        params: {
          action: 'del',
          items_id
        }
      })
      .then(res => {
        resolve(res.data)
      })
    })
  },
  confirmEdit (content, items_id) {
    return new Promise((resolve, reject) => {
      axios.post(url + 'post.php', {
        params: {
          content,
          items_id,
          action: 'edit'
        }
      })
      .then(res => {
        resolve(res.data)
      })
    })
  },
  submitListEdit (list_name, list_id) {
    return new Promise((resolve, reject) => {
      axios.post(url + 'post.php', {
        params: {
          list_name,
          list_id,
          action: 'edit'
        }
      })
      .then(res => {
        resolve(res.data)
      })
    })
  },
  getAll (name) {
    return new Promise((resolve, reject) => {
      axios.get(url + 'query.php', {
        params: {
          name
        }
      })
      .then(res => {
        const lists = res.data.lists || [], items = res.data.items || []

        const list_id = lists.map(ele => {
          return ele.list_id
        })
        const list_name = lists.map(ele => {
          return ele.list_name
        })

        const arr = []
        lists.forEach(ele => {
          arr.push({
            name: ele.list_name,
            online: true,
            lists: [],
            list_id: ele.list_id
          })
        })

        items.forEach(ele => {
          arr[list_id.indexOf(ele.list_id)].lists.push(ele)
        })

        var obj = localStorage.getItem('todoData')

        if (obj) {
          var json = JSON.parse(obj).todos
          for (var i in json) {
            if (list_name.indexOf(json[i].name) == -1) {
              arr.push(json[i])
            }
          }
        }

        resolve(arr)

      })
      .catch(function (error) {
        console.log(error);
      })

    })
  }
}

const File = {
  exportFile (data) {
    return new Promise((resolve, reject) => {
      axios.post(url + 'json.php', {
        params: {
          data
        }
      })
      .then(res => {
        var a = document.createElement('a')
        a.href = url + 'newfile.json'
        a.setAttribute('download', 'TODO' + Math.random().toString().substr(2) + '.json')
        a.click()
        resolve(res.data)
      })
    })
  },
  importFile () {}
}

const Todo = new Vue({
  el: '#app',
  data: {
    todoData: {todos: []},
    tabTitles: ['全部', '未完成', '已完成'],
    title: 0,
    inputVal: '',
    editVal: '',
    editIndex: null,
    listData: '',
    showDialog: false,
    chooseTab: 0,
    searchValue: '',
    showLogin:  0,
    userStatus: ['登录', '注册'],
    username: '',
    userMessage: '',
    beforeSend: false,
    warning: false,
    warningText: '你还什么都没有写呢٩(๑`^´๑)۶',
    waiting: false,
    tipsData: {
      words: '',
      style: {
        top: 0,
        left: 0
      },
      show: false
    }
  },
  methods: {
    changeStatus (i) {
      var list = this.todoData.todos[this.title].lists[i]
      list.status = Math.abs(list.status - 1)

      this.saveData()
      if (this.todos[this.title].online) {
        this.waiting = true
        Cloud.changeStatus(list.status, list.items_id)
        .then(data => {
          this.waiting = false
          if (data.code == 0) {
            this.showWarning(data.message)
          } else {
            this.showWarning('好像出错了呢')
          }
        })
      }
    },
    handleListTitle (i) {
      this.title = i
    },
    // 清单操作
    // 新增清单 => submitList
    addNewList () {
      if (!this.username) {
        this.showWarning('清先登录哦')
        this.showLogin = true
        return
      }
      this.showDialog = true

      this.saveData()
    },
    //编辑清单
    editList (i) {
      this.title = i
      this.listData = this.todoData.todos[i]
      this.showDialog = true

      this.saveData()
    },
    //删除清单
    deleteList (i) {
      const list_id = this.todos[i].list_id, online = this.todos[i].online

      this.todoData.todos.splice(i, 1)
    
      if (this.title == i && !this.todoData.todos[i]) {
        this.title = i - 1
      }

      this.saveData()

      if (online) {
        this.waiting = true
        Cloud.deleteList(list_id)
        .then((data) => {
          this.waiting = false
          if (data.code == 0) {
            this.showWarning(data.message)
          } else {
            this.showWarning('好像出错了呢')
          }
        })
      }
    },

    // 事项操作
    // 新增事项
    addNewItem (val) {
      if (val == '') {
        this.showWarning()
        return
      }

      this.todoData.todos[this.title].lists.push({
        content: val,
        status: 0
      })

      this.saveData()
      const list = this.todos[this.title]
      if (list.online) {
        this.waiting = true
        Cloud.addNewItem(list.list_id, val)
        .then(data => {
          this.waiting = false
          if (data.code == 0) {
            list.lists[list.lists.length - 1].items_id = data.items_id
            this.showWarning(data.message)
          } else {
            this.showWarning('好像出错了呢')
          }
        })
      } else {
        this.showWarning('新增本地清单事项成功')
      }
    },
    // 编辑事项
    editItem (i) {
      this.editVal = this.todoData.todos[this.title].lists[i].content
      this.editIndex = i

      this.saveData()
    },
    // 删除事项
    deleteItem (i) {
      const items_id = this.todoData.todos[this.title].lists[i].items_id

      this.todoData.todos[this.title].lists.splice(i, 1)

      this.saveData()

      if (this.todos[this.title].online) {
        this.waiting = true
        Cloud.deleteItem(items_id)
        .then(data => {
          this.waiting = false
          if (data.code == 0) {
            this.showWarning(data.message)
          } else {
            this.showWarning('好像出错了呢')
          }
        })
      }
    },

    // 编辑事项
    confirmEdit (data) {
      if (data.val == '') {
        this.showWarning()
        return
      }
      this.editIndex = null

      const item = this.todoData.todos[this.title].lists[data.index]
      item.content = data.val

      if (this.todos[this.title].online) {
        this.waiting = true
        Cloud.confirmEdit(data.val, item.items_id)
        .then(data => {
          this.waiting = false
          if (data.code == 0) {
            this.showWarning(data.message)
          } else {
            this.showWarning('好像出错了呢')
          }
        })
      }
    },

    cancel () {
      this.listData = ''
      this.showDialog = false
    },

    // 新增和编辑清单
    submitList (data) {
      if (data.name == '') {
        this.showWarning()
        return
      }

      // 编辑
      if (this.listData) {
        const beforeOnline = this.todoData.todos[this.title].online

        this.todoData.todos[this.title].name = data.name
        // this.todoData.todos[this.title].online = data.online


        if (beforeOnline && !data.online) {
          // 从线上删除
          this.waiting = true
          Cloud.deleteList(this.todos[this.title].list_id)
          .then((res) => {
            this.waiting = false
            if (res.code == 0) {
              console.log(data)
              this.todoData.todos[this.title].online = data.online
              this.showWarning('删除云端清单成功')
            } else {
              this.showWarning('好像出错了呢')
            }
          })
        } else if (!beforeOnline && data.online){
          // 从本地添加到线上
          this.waiting = true
          Cloud.addNewList(this.username, this.todos[this.title].name)
          .then(res => {
            this.waiting = false
            if (res.code == 0) {
              // console.log(res)
              this.todos[this.title].list_id = res.list_id
              const lists = this.todos[this.title].lists
              for (var i in lists) {
                Cloud.addNewItem(res.list_id, lists[i].content, lists[i].status)
              }
              this.todoData.todos[this.title].online = data.online
              this.showWarning('添加云端清单成功')
            } else {
              this.showWarning('好像出错了呢')
            }
          })
        } else if (beforeOnline && data.online) {
          this.waiting = true
          Cloud.submitListEdit(data.name, this.todos[this.title].list_id)
          .then(res => {
            this.waiting = false
            if (res.code == 0) {
              this.showWarning(res.message)
            } else {
              this.showWarning('好像出错了呢')
            }
          })
        } else {
          this.showWarning('编辑本地清单成功')
        }
      } else { // 新增
        this.todoData.todos.push({
          name: data.name,
          online: data.online,
          lists: []
        })
        this.title = this.todoData.todos.length - 1

        if (data.online) {
          this.waiting = true
          Cloud.addNewList(this.username, data.name)
          .then(res => {
            this.waiting = false
            if (res.code == 0) {
              this.showWarning(res.message)
              this.todos[this.title].list_id = res.list_id
            } else {
              this.showWarning('好像出错了呢')
            }
          })
        } else {
          this.showWarning('新增本地清单成功')
        }
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

    // 登录注册
    userAction (data) {
      if (data.name == '') {
        this.showWarning('你倒是写个名字呀')
        return
      }
      if (data.pass == '') {
        this.showWarning('你倒是输入密码呀')
        return
      }
      this.beforeSend = true

      const action = data.action

      axios.post(url + 'user.php', {
        params: {
          ...data
        }
      })
      .then(res => {
        console.log(res)
        this.beforeSend = false
        this.userMessage = res.data.message

        setTimeout(() => {
          this.userMessage = ''
        }, 2000)

        if (res.data.code == 0) {
          if (action == 'login') {
            this.showLogin = false
            this.username = data.name
          }

          Cloud.getAll(data.name)
          .then(data => {
            todoData = {
              todos: data
            }
            this.todoData = todoData
          })
        }
      })
      .catch(function (error) {
        console.log(error);
      })
    },

    clearStorage () {
      localStorage.removeItem('todoData')

      Cloud.getAll(this.username)
      .then(data => {
        this.todoData.todos = data
      })
    },
    logout () {
      axios.get(url + 'cookie.php?action=logout')
      .then((res) => {
        console.log(res)
        this.username = ''
        this.todoData.todos = []
      })
    },

    showWarning (t) {
      this.warningText = t || '你还什么都没有写呢٩(๑`^´๑)۶'

      this.warning = true
      setTimeout(() => {
        this.warning = false
      }, 1000)
    },

    exportFile () {
      File.exportFile(JSON.stringify(this.todos))
    },

    importFile () {

    },

    showTips (txt, e) {
      this.tipsData = {
        words: txt,
        style: {
          top: e.y + 20 + 'px',
          left: e.x + 'px'
        },
        show: true
      }
      setTimeout(() => {
        this.tipsData.show = false
      }, 1000)
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

    let todoData

    axios.get(url + 'cookie.php?action=login')
    .then(res => {
      if (res.data) {
        this.username = res.data

        this.waiting = true
        Cloud.getAll(res.data)
        .then(data => {
          this.waiting = false
          todoData = {
            todos: data
          }
          this.todoData = todoData
        })
        
      }
    })
 
  }


})