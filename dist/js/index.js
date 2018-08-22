const url = '/vue-todo/server/'

Vue.directive('focus', {
  inserted (el, {value}) {
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
    <li 
      @click.self='handleListTitle(index)' 
      @touchend='touchStart(index)'
      :class='{"titleActive": index == title}'>
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
    },
    touchStart (index) {
      this.$emit('touch', index)
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
        <div v-if='lists.length == 0' class='nothing'>啥都木有哦(*/ω＼*)</div>
        <input
          v-if='choosetab == 0'
          v-model.trim='val'
          @keyup.enter='addNewItem'
          class='addNewItem'
          placeholder='输入后enter新增'></input>
        <li v-for='(list, index) in lists' :class='{ "checked": list.status == 1 }'>
          <div class='checkRadio'>
            <i
              @click='click(list.items_id)' 
              :class='["iconfont", list.status == 1 ? check : uncheck]'></i>
          </div>
          <div>
            <span
              @click='editItem(list.items_id)'
              class='listContent'>{{ list.content }}</span>
          </div>
          <div>
            <span
              @click='deleteItem(list.items_id)'
              class='deleteItem'>
              <i class='iconfont icon-delete'></i>
            </span>
          </div>
          <input
            class='editInput'
            v-if='editIndex == list.items_id && list.status == 0'
            v-model.trim='editValue'
            v-focus='editIndex == list.items_id'
            @blur='confirmEdit(list.items_id)'
            @keyup.enter='confirmEdit(list.items_id)'/>
        </li>
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
      </div>
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
        // console.log(res)
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
          content: JSON.stringify(content),
          action: 'add'
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
        // console.log(res)
        const arr = []
        const lists = res.data.lists || [], items = res.data.items || []

        const list_id = lists.map(ele => {
          return ele.list_id
        })
        const list_name = lists.map(ele => {
          return ele.list_name
        })

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

        const obj = localStorage.getItem(name)

        let u_id = 'u_0'

        if (obj) {
          const json = JSON.parse(obj)
          const todos = json.todos
          // if (json.username == name) {
            for (let i in todos) {
              if (list_name.indexOf(todos[i].name) == -1) {
                arr.push(todos[i])
              }
            }
          // }
          if (json.u_id) u_id = json.u_id
        }

        resolve({ arr, u_id })

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
          data,
          action: 'out'
        }
      })
      .then(res => {
        const a = document.createElement('a')
        a.href = url + res.data.filename

        const date = new Date()
        const n = '' + date.getFullYear() + (date.getMonth() + 1) + date.getDate() + 
                  date.getHours() + date.getMinutes() + date.getSeconds()

        a.setAttribute('download', 'TODO-' + n + '.json')
        a.click()

        setTimeout(() => {
          axios.post(url + 'json.php', {
            params: {
              name: res.data.filename,
              action: 'del'
            }
          })
          .then(data => {
            // console.log(data)
          })
        }, 2000)

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
    },
    file: '',
    showMenu: false,
    u_id: 'u_0'
  },
  methods: {
    changeStatus (id) {
      const lists = this.todoData.todos[this.title].lists

      let item
      for (let i in lists) {
        if (lists[i].items_id == id) {
          item = lists[i]
        }
      }

      const newStatus = Math.abs(item.status - 1)

      if (this.todos[this.title].online) {
        Cloud.changeStatus(newStatus, item.items_id)
        .then(data => {
          if (data.code == 0) {
            item.status = newStatus
          }
          this.saveData()
        })
      } else {
        item.status = newStatus
      }

      this.saveData()
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

      // this.saveData()
    },
    //编辑清单
    editList (i) {
      this.title = i
      this.listData = this.todoData.todos[i]
      this.showDialog = true

      // this.saveData()
    },
    //删除清单
    deleteList (i) {
      const list_id = this.todos[i].list_id, online = this.todos[i].online

      if (online) {
        Cloud.deleteList(list_id)
        .then((data) => {
          if (data.code == 0) {
            this.todoData.todos.splice(i, 1)

            if (this.title >= this.todos.length) this.title = this.title - 1

            if (this.title == i && !this.todoData.todos[i]) {
              this.title = i - 1
            }

            this.saveData()
          }
        })
      } else {
        this.todoData.todos.splice(i, 1)
        
        if (this.title >= this.todos.length) this.title = this.title - 1

        if (this.title == i && !this.todoData.todos[i]) {
          this.title = i - 1
        }

        this.saveData()
      }

      
    },

    // 事项操作
    // 新增事项
    addNewItem (val) {
      if (val == '') {
        this.showWarning()
        return
      }

      let u_id = 'u_' + (this.u_id.substr(2) / 1 + 1)
      this.u_id = u_id

      this.todoData.u_id = u_id
      

      
      const list = this.todos[this.title]
      if (list.online) {
        Cloud.addNewItem(list.list_id, [{
          content: val,
          status: 0
        }])
        .then(data => {
          if (data.code == 0) {
            this.todoData.todos[this.title].lists.unshift({
              content: val,
              status: 0,
              items_id: data.items_id
            })
            this.saveData()
          }
        })
      } else {
        this.todoData.todos[this.title].lists.unshift({
          content: val,
          status: 0,
          items_id: u_id
        })
        this.saveData()
        this.showWarning('新增本地清单事项成功')
      }
    },
    // 编辑事项
    editItem (id) {
      const lists = this.todoData.todos[this.title].lists

      let item, index
      for (let i in lists) {
        if (lists[i].items_id == id) {
          item = lists[i]
          index = i
        }
      }

      this.editVal = item.content
      // this.editIndex = index
      this.editIndex = item.items_id

      // this.saveData()
    },
    // 删除事项
    deleteItem (id) {
      const lists = this.todoData.todos[this.title].lists

      let item, index
      for (let i in lists) {
        if (lists[i].items_id == id) {
          item = lists[i]
          index = i
        }
      }

      const items_id = item.items_id

      if (this.todos[this.title].online) {
        Cloud.deleteItem(items_id)
        .then(data => {
          if (data.code == 0) {
            this.todoData.todos[this.title].lists.splice(index, 1)
            this.saveData()
          }
        })
      } else {
        this.todoData.todos[this.title].lists.splice(index, 1)
        this.saveData()
      }

    },

    // 编辑事项
    confirmEdit (data) {
      const id = data.index

      const lists = this.todoData.todos[this.title].lists

      let item, index
      for (let i in lists) {
        if (lists[i].items_id == id) {
          item = lists[i]
          index = i
        }
      }

      if (data.val == '') {
        this.showWarning()
        return
      }
      this.editIndex = null

      if (this.editVal == data.val) return

      if (this.todos[this.title].online) {
        Cloud.confirmEdit(data.val, item.items_id)
        .then(res => {
          if (res.code == 0) {
            item.content = data.val
            this.saveData()
          }
        })
      } else {
        item.content = data.val
        this.saveData()
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

        if (beforeOnline && !data.online) {
          // 从线上删除
          Cloud.deleteList(this.todos[this.title].list_id)
          .then((res) => {
            if (res.code == 0) {
              this.todoData.todos[this.title].name = data.name
              this.$set(this.todoData.todos[this.title], 'online', data.online)
              this.saveData()
            }
          })
        } else if (!beforeOnline && data.online){
          // 从本地添加到线上
          Cloud.addNewList(this.username, this.todos[this.title].name)
          .then(res => {
            if (res.code == 0) {
              this.todoData.todos[this.title].name = data.name
              this.todos[this.title].list_id = res.list_id
              const lists = this.todoData.todos[this.title].lists

              Cloud.addNewItem(res.list_id, lists)
              this.todoData.todos[this.title].online = data.online
              this.saveData()
            }
          })
        } else if (beforeOnline && data.online) {
          Cloud.submitListEdit(data.name, this.todos[this.title].list_id)
          .then(res => {
            this.todoData.todos[this.title].name = data.name
            this.saveData()
          })
        } else {
          this.todoData.todos[this.title].name = data.name
          this.showWarning('编辑本地清单成功')
        }
      } else { // 新增
        if (data.online) {
          Cloud.addNewList(this.username, data.name)
          .then(res => {
            if (res.code == 0) {
              this.todoData.todos.push({
                name: data.name,
                online: data.online,
                lists: [],
                list_id: res.list_id
              })
              this.title = this.todoData.todos.length - 1
              this.saveData()
            }
          })
        } else {
          this.todoData.todos.push({
            name: data.name,
            online: data.online,
            lists: []
          })
          this.title = this.todoData.todos.length - 1
          this.showWarning('新增本地清单成功')
        }
      }

      this.saveData()
      this.listData = ''
      this.showDialog = false
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
      localStorage.setItem(this.username, JSON.stringify(this.todoData))
    },

    clearStorage () {
      localStorage.removeItem(this.username)

      Cloud.getAll(this.username)
      .then(data => {
        this.todoData.todos = data.arr
        this.title = 0
      })
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

      const action = data.action

      axios.post(url + 'user.php', {
        params: {
          ...data
        }
      })
      .then(res => {

        if (res.data.code == 0) {
          axios.get(url + 'cookie.php', {
            params: {
              action: 'login',
              username: data.name
            }
          })
          .then(res => {
            // console.log(res)
          })

          if (action == 'login') {
            this.showLogin = false
            this.username = data.name
            Cloud.getAll(data.name)
            .then(data => {
              const a = data.arr
              const todoData = {
                todos: a,
                u_id: data.u_id
              }
              this.todoData = todoData
            })
          }

        }
      })
      .catch(function (error) {
        console.log(error);
      })
    },

    logout () {
      axios.get(url + 'cookie.php', {
        params: {
          action: 'logout'
        }
      })
      .then((res) => {
        // console.log(res)
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
      const file = JSON.parse(JSON.stringify(this.todoData.todos))
      file.forEach(ele => {
        ele.online = false
      })
      File.exportFile(JSON.stringify(file))
    },

    importFile (e) {
      const file = this.$refs.fileInput.files[0]

      const reg = /.json$/
      if (!reg.test(file.name)) {
        this.showWarning('请提交json文件哦')
        return
      }

      const _this = this

      const reader = new FileReader()
      reader.readAsText(file, 'uft-8')
      reader.onload = function (e) {
        console.log(e.target.result)
        _this.todoData.todos = JSON.parse(e.target.result)
        _this.saveData()
      }

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
    },

    touchStart (i) {
      this.title = i
      setTimeout(() => {
        this.showMenu = false
      }, 100)
    }
  },
  watch: {
    
  },
  computed: {
    todos () {
      if (this.chooseTab == 0) {
        return this.todoData.todos
      } else {
        const todoList = JSON.parse(JSON.stringify(this.todoData.todos))
        const arr = todoList[this.title].lists.filter(ele => {
          return (ele.status/1 + 1) == this.chooseTab
        })
        todoList[this.title].lists = arr
        return todoList
      }
    }
  },
  mouted () {},
  created () {
    let todoData

    axios.get(url + 'cookie.php', {
      params: {
        action: 'relogin'
      }
    })
    .then(res => {
      if (res.data) {
        this.username = res.data.name

        this.waiting = true
        Cloud.getAll(res.data.name)
        .then(data => {
          const a = data.arr
          todoData = {
            todos: a,
            u_id: data.u_id
          }

          this.u_id = data.u_id
          this.todoData = todoData
        })
        
      }
    })
  }


})

axios.interceptors.request.use((config) => {
  Vue.set(Todo, 'waiting', true)
  return config
}, err => {
  return Promise.reject(err)
})

axios.interceptors.response.use((res) => {
  Vue.set(Todo, 'waiting', false)
  if (res.data.message && Todo.waiting == false) {
    Todo.showWarning(res.data.message)
  }
  return res
}, err => {
  return Promise.reject(err)
})

// axios.post('http://yapi.demo.qunar.com/mock/16752/post', {

// })
// .then(res => {
//   console.log(res)
// })