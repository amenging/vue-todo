'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var url = '/vue-todo/server/';

Vue.directive('focus', {
  inserted: function inserted(el, _ref) {
    var value = _ref.value;

    if (value) {
      el.focus();
    }
  }
});

// 应用
Vue.component('todo-app', {
  props: {
    'todos': {
      type: Array
    }
  },
  template: '\n    <div>\n      <slot></slot>\n      <slot\n        name=\'content\'\n        v-for=\'(todo, index) in todos\'\n        :index=\'index\'\n        :todo=\'todo\'></slot>\n    </div>\n  '
});

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
  template: '\n    <li \n      @click.self=\'handleListTitle(index)\' \n      @touchend=\'touchStart(index)\'\n      :class=\'{"titleActive": index == title}\'>\n      <span @click.self=\'handleListTitle(index)\'>{{todo.name}}</span>\n      <span class=\'deleteList\' @click=\'deleteList(index)\'>\n        <i class=\'iconfont icon-delete\'></i>\n      </span>\n      <span class=\'editList\' @click=\'editList(index)\'>\n        <i class=\'iconfont icon-edit\'></i>\n      </span>\n    </li>\n  ',
  methods: {
    handleListTitle: function handleListTitle(index) {
      this.$emit('handlelisttitle', index);
    },
    editList: function editList(index) {
      this.$emit('editlist', index);
    },
    deleteList: function deleteList(index) {
      this.$emit('deletelist', index);
    },
    touchStart: function touchStart(index) {
      this.$emit('touch', index);
    }
  }
});

// 清单列表
Vue.component('list', {
  props: {
    lists: {
      type: Array,
      default: function _default() {
        return [];
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
  template: '\n    <div class=\'todo-list\' v-if=\'count == title\'>\n      <slot></slot>\n      <ul>\n        <input\n          v-if=\'choosetab == 0\'\n          v-model.trim=\'val\'\n          @keyup.enter=\'addNewItem\'\n          class=\'addNewItem\'\n          placeholder=\'\u8F93\u5165\u540Eenter\u65B0\u589E\'></input>\n        <li v-for=\'(list, index) in lists\' :class=\'{ "checked": list.status == 1 }\'>\n          <input\n            class=\'editInput\'\n            v-if=\'editIndex == list.items_id && list.status == 0\'\n            v-model.trim=\'editValue\'\n            v-focus=\'editIndex == list.items_id\'\n            @blur=\'confirmEdit(list.items_id)\'\n            @keyup.enter=\'confirmEdit(list.items_id)\'/>\n          <div class=\'checkRadio\'>\n            <i\n              @click=\'click(list.items_id)\' \n              :class=\'["iconfont", list.status == 1 ? check : uncheck]\'></i>\n          </div>\n          <div>\n            <span\n              @click=\'editItem(list.items_id)\'\n              class=\'listContent\'>{{ list.content }}</span>\n          </div>\n          <div>\n            <span\n              @click=\'deleteItem(list.items_id)\'\n              class=\'deleteItem\'>\n              <i class=\'iconfont icon-delete\'></i>\n            </span>\n          </div>\n        </li>\n        <div v-if=\'lists.length == 0\' class=\'nothing\'>\u5565\u90FD\u6728\u6709\u54E6(*/\u03C9\uFF3C*)</div>\n      </ul>\n    </div>\n  ',
  data: function data() {
    return {
      choose: [],
      check: "icon-check",
      uncheck: "icon-weixuanyuanquan",
      val: this.inputval,
      editValue: this.editval,
      editIndex: this.editindex
    };
  },

  computed: {},
  watch: {
    inputval: function inputval() {
      this.val = this.inputval;
    },
    editval: function editval() {
      this.editValue = this.editval;
    },
    editindex: function editindex() {
      this.editIndex = this.editindex;
    }
  },
  methods: {
    click: function click(index) {
      this.$emit('changestatus', index);
    },
    editItem: function editItem(index) {
      this.$emit('edititem', index);
    },
    deleteItem: function deleteItem(index) {
      this.$emit('deleteitem', index);
    },
    addNewItem: function addNewItem() {
      this.$emit('addnewitem', this.val);
      this.val = '';
    },
    confirmEdit: function confirmEdit(index) {
      this.$emit('confirmedit', { index: index, val: this.editValue });
    }
  }
});

// Vue.dialog
Vue.component('todo-dialog', {
  template: '\n    <div class=\'dialog\' @click.self=\'hideDialog\'>\n      <div class=\'dialog-body\'>\n        <div class=\'dialog-header\'></div>\n        <slot></slot>\n      </div>\n    </div>\n  ',
  methods: {
    hideDialog: function hideDialog() {
      this.$emit('hidedialog');
    }
  }
});

// 编辑清单框
Vue.component('list-dialog', {
  props: {
    listdata: {
      type: [Object, String]
    }
  },
  data: function data() {
    return {
      editListValue: this.listdata.name || '',
      online: this.listdata.online == false ? false : true
    };
  },

  template: '\n    <div>\n      <div class=\'dialog-content\'>\n        <div class=\'form-control\'>\n          <label>\u6E05\u5355\u540D\u79F0</label>\n          <input\n            v-focus=\'true\'\n            maxlength=\'10\' \n            @keyup.enter=\'submit\' \n            v-model.trim=\'editListValue\' />\n        </div>\n        <div class=\'form-control\'>\n          <label>\u4E91\u7AEF\u540C\u6B65</label>\n          <input v-model=\'online\' type=\'checkbox\' />\n        </div>\n      </div>\n      <div class=\'dialog-footer\'>\n        <button @click=\'cancel\'>\u53D6\u6D88</button>\n        <button @click=\'submit\'>\u786E\u8BA4</button>\n      </div>\n    </div>\n  ',
  methods: {
    cancel: function cancel() {
      this.$emit('cancel');
    },
    submit: function submit() {
      this.$emit('submitlist', {
        name: this.editListValue,
        online: this.online
      });
    }
  }
});

// 登录框
Vue.component('login-dialog', {
  props: ['message', 'beforesend'],
  data: function data() {
    return {
      username: '',
      password: ''
    };
  },

  template: '\n    <form class=\'dialog-content login-form\'>\n      <div class=\'form-control\'>\n        <label>\u7528\u6237\u540D</label>\n        <input\n          autocomplete=\'username\'\n          placeholder=\'\u7528\u6237\u540D\uFF0810\u4E2A\u5B57\u7B26\u4EE5\u5185\uFF09\'\n          v-focus=\'true\'\n          maxlength=\'10\' \n          v-model.trim=\'username\' />\n      </div>\n      <div class=\'form-control\'>\n        <label>\u5BC6\u7801</label>\n        <input\n          type=\'password\'\n          autocomplete=\'current-password\'\n          placeholder=\'\u5BC6\u7801\uFF0812\u4E2A\u5B57\u7B26\u4EE5\u5185\uFF09\'\n          maxlength=\'12\' \n          v-model.trim=\'password\' />\n      </div>\n      <div class=\'form-control\'>\n        <label></label>\n        <button @click.stop.prevent=\'login\' class=\'login\'>\u767B\u5F55</button>\n        <button @click.stop.prevent=\'reg\' class=\'reg\'>\u6CE8\u518C</button>\n        <i v-if=\'beforesend\' class=\'iconfont icon-loading load\'></i>\n      </div>\n      <div class=\'userMessage\' v-if=\'message\'>{{ message }}</div>\n    </form>\n  ',
  methods: {
    login: function login() {
      this.$emit('login', {
        name: this.username,
        pass: this.password,
        action: 'login'
      });
    },
    reg: function reg() {
      this.$emit('reg', {
        name: this.username,
        pass: this.password,
        action: 'reg'
      });
    }
  }
});

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
  template: '\n    <div class=\'todo-tab\'>\n      <div\n        :class="[\'tab-item\', index == choosetab ? \'tab-active\': \'\']"\n        @click=\'tabChange(index)\' \n        v-for=\'(title, index) in tabtitles\'>\n        {{title}}\n      </div>\n    </div>\n  ',
  methods: {
    tabChange: function tabChange(index) {
      this.$emit('tabchange', index);
    }
  }
});

var Cloud = {
  changeStatus: function changeStatus(status, items_id) {
    return new Promise(function (resolve, reject) {
      axios.post(url + 'post.php', {
        params: {
          status: status,
          items_id: items_id,
          action: 'edit'
        }
      }).then(function (res) {
        console.log(res);
        resolve(res.data);
      });
    });
  },
  addNewList: function addNewList(user, list_name) {
    return new Promise(function (resolve, reject) {
      axios.post(url + 'post.php', {
        params: {
          user: user,
          list_name: list_name,
          action: 'add'
        }
      }).then(function (res) {
        resolve(res.data);
      });
    });
  },
  deleteList: function deleteList(list_id) {
    return new Promise(function (resolve, reject) {
      axios.post(url + 'post.php', {
        params: {
          action: 'del',
          list_id: list_id
        }
      }).then(function (res) {
        resolve(res.data);
      });
    });
  },
  addNewItem: function addNewItem(list_id, content, status) {
    return new Promise(function (resolve, reject) {
      axios.post(url + 'post.php', {
        params: {
          list_id: list_id,
          content: content,
          action: 'add',
          status: status || 0
        }
      }).then(function (res) {
        resolve(res.data);
      });
    });
  },
  deleteItem: function deleteItem(items_id) {
    return new Promise(function (resolve, reject) {
      axios.post(url + 'post.php', {
        params: {
          action: 'del',
          items_id: items_id
        }
      }).then(function (res) {
        resolve(res.data);
      });
    });
  },
  confirmEdit: function confirmEdit(content, items_id) {
    return new Promise(function (resolve, reject) {
      axios.post(url + 'post.php', {
        params: {
          content: content,
          items_id: items_id,
          action: 'edit'
        }
      }).then(function (res) {
        resolve(res.data);
      });
    });
  },
  submitListEdit: function submitListEdit(list_name, list_id) {
    return new Promise(function (resolve, reject) {
      axios.post(url + 'post.php', {
        params: {
          list_name: list_name,
          list_id: list_id,
          action: 'edit'
        }
      }).then(function (res) {
        resolve(res.data);
      });
    });
  },
  getAll: function getAll(name) {
    // console.log(name)
    return new Promise(function (resolve, reject) {
      axios.get(url + 'query.php', {
        params: {
          name: name
        }
      }).then(function (res) {
        var arr = [];
        var lists = res.data.lists || [],
            items = res.data.items || [];

        var list_id = lists.map(function (ele) {
          return ele.list_id;
        });
        var list_name = lists.map(function (ele) {
          return ele.list_name;
        });

        lists.forEach(function (ele) {
          arr.push({
            name: ele.list_name,
            online: true,
            lists: [],
            list_id: ele.list_id
          });
        });

        items.forEach(function (ele) {
          arr[list_id.indexOf(ele.list_id)].lists.push(ele);
        });

        var obj = localStorage.getItem(name);

        var u_id = 'u_0';

        if (obj) {
          var json = JSON.parse(obj);
          var todos = json.todos;
          // if (json.username == name) {
          for (var i in todos) {
            if (list_name.indexOf(todos[i].name) == -1) {
              arr.push(todos[i]);
            }
          }
          // }
          if (json.u_id) u_id = json.u_id;
        }

        resolve({ arr: arr, u_id: u_id });
      }).catch(function (error) {
        console.log(error);
      });
    });
  }
};

var File = {
  exportFile: function exportFile(data) {
    return new Promise(function (resolve, reject) {
      axios.post(url + 'json.php', {
        params: {
          data: data,
          action: 'out'
        }
      }).then(function (res) {
        var a = document.createElement('a');
        a.href = url + res.data.filename;

        var date = new Date();
        var n = '' + date.getFullYear() + (date.getMonth() + 1) + date.getDate() + date.getHours() + date.getMinutes() + date.getSeconds();

        a.setAttribute('download', 'TODO-' + n + '.json');
        a.click();

        axios.post(url + 'json.php', {
          params: {
            name: res.data.filename,
            action: 'del'
          }
        }).then(function (data) {
          // console.log(data)
        });
        resolve(res.data);
      });
    });
  },
  importFile: function importFile() {}
};

var Todo = new Vue({
  el: '#app',
  data: {
    todoData: { todos: [] },
    tabTitles: ['全部', '未完成', '已完成'],
    title: 0,
    inputVal: '',
    editVal: '',
    editIndex: null,
    listData: '',
    showDialog: false,
    chooseTab: 0,
    searchValue: '',
    showLogin: 0,
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
    },
    file: '',
    showMenu: false,
    u_id: 'u_0'
  },
  methods: {
    changeStatus: function changeStatus(id) {
      var _this2 = this;

      var lists = this.todoData.todos[this.title].lists;

      var item = void 0;
      for (var i in lists) {
        if (lists[i].items_id == id) {
          item = lists[i];
        }
      }
      item.status = Math.abs(item.status - 1);
      this.saveData();

      if (this.todos[this.title].online) {
        this.waiting = true;
        Cloud.changeStatus(item.status, item.items_id).then(function (data) {
          _this2.waiting = false;
          if (data.code == 0) {
            _this2.showWarning(data.message);
          } else {
            _this2.showWarning('好像出错了呢');
          }
        });
      }
    },
    handleListTitle: function handleListTitle(i) {
      this.title = i;
    },

    // 清单操作
    // 新增清单 => submitList
    addNewList: function addNewList() {
      if (!this.username) {
        this.showWarning('清先登录哦');
        this.showLogin = true;
        return;
      }
      this.showDialog = true;

      // this.saveData()
    },

    //编辑清单
    editList: function editList(i) {
      this.title = i;
      this.listData = this.todoData.todos[i];
      this.showDialog = true;

      // this.saveData()
    },

    //删除清单
    deleteList: function deleteList(i) {
      var _this3 = this;

      var list_id = this.todos[i].list_id,
          online = this.todos[i].online;

      this.todoData.todos.splice(i, 1);

      if (this.title == i && !this.todoData.todos[i]) {
        this.title = i - 1;
      }

      this.saveData();

      if (online) {
        this.waiting = true;
        Cloud.deleteList(list_id).then(function (data) {
          _this3.waiting = false;
          if (data.code == 0) {
            _this3.showWarning(data.message);
          } else {
            _this3.showWarning('好像出错了呢');
          }
        });
      }
    },


    // 事项操作
    // 新增事项
    addNewItem: function addNewItem(val) {
      var _this4 = this;

      if (val == '') {
        this.showWarning();
        return;
      }

      var u_id = 'u_' + (this.u_id.substr(2) / 1 + 1);
      this.u_id = u_id;

      this.todoData.u_id = u_id;
      this.todoData.todos[this.title].lists.unshift({
        content: val,
        status: 0,
        items_id: u_id
      });

      this.saveData();
      var list = this.todos[this.title];
      if (list.online) {
        this.waiting = true;
        Cloud.addNewItem(list.list_id, val).then(function (data) {
          _this4.waiting = false;
          if (data.code == 0) {
            list.lists[list.lists.length - 1].items_id = data.items_id;
            _this4.showWarning(data.message);
          } else {
            _this4.showWarning('好像出错了呢');
          }
        });
      } else {
        this.showWarning('新增本地清单事项成功');
      }
    },

    // 编辑事项
    editItem: function editItem(id) {
      var lists = this.todoData.todos[this.title].lists;

      var item = void 0,
          index = void 0;
      for (var i in lists) {
        if (lists[i].items_id == id) {
          item = lists[i];
          index = i;
        }
      }

      this.editVal = item.content;
      // this.editIndex = index
      this.editIndex = item.items_id;

      this.saveData();
    },

    // 删除事项
    deleteItem: function deleteItem(id) {
      var _this5 = this;

      var lists = this.todoData.todos[this.title].lists;

      var item = void 0,
          index = void 0;
      for (var i in lists) {
        if (lists[i].items_id == id) {
          item = lists[i];
          index = i;
        }
      }

      // const items_id = this.todoData.todos[this.title].lists[i].items_id
      var items_id = item.items_id;

      this.todoData.todos[this.title].lists.splice(index, 1);

      this.saveData();

      if (this.todos[this.title].online) {
        this.waiting = true;
        Cloud.deleteItem(items_id).then(function (data) {
          _this5.waiting = false;
          if (data.code == 0) {
            _this5.showWarning(data.message);
          } else {
            _this5.showWarning('好像出错了呢');
          }
        });
      }
    },


    // 编辑事项
    confirmEdit: function confirmEdit(data) {
      var _this6 = this;

      var id = data.index;

      var lists = this.todoData.todos[this.title].lists;

      var item = void 0,
          index = void 0;
      for (var i in lists) {
        if (lists[i].items_id == id) {
          item = lists[i];
          index = i;
        }
      }

      if (data.val == '') {
        this.showWarning();
        return;
      }
      this.editIndex = null;

      if (this.editVal == data.val) return;

      // const item = this.todoData.todos[this.title].lists[data.index]
      item.content = data.val;

      if (this.todos[this.title].online) {
        this.waiting = true;
        Cloud.confirmEdit(data.val, item.items_id).then(function (data) {
          _this6.waiting = false;
          if (data.code == 0) {
            _this6.showWarning(data.message);
          } else {
            _this6.showWarning('好像出错了呢');
          }
        });
      }
    },
    cancel: function cancel() {
      this.listData = '';
      this.showDialog = false;
    },


    // 新增和编辑清单
    submitList: function submitList(data) {
      var _this7 = this;

      if (data.name == '') {
        this.showWarning();
        return;
      }

      // 编辑
      if (this.listData) {
        var beforeOnline = this.todoData.todos[this.title].online;

        this.todoData.todos[this.title].name = data.name;
        // this.todoData.todos[this.title].online = data.online


        if (beforeOnline && !data.online) {
          // 从线上删除
          this.waiting = true;
          Cloud.deleteList(this.todos[this.title].list_id).then(function (res) {
            _this7.waiting = false;
            if (res.code == 0) {
              console.log(data);
              _this7.$set(_this7.todoData.todos[_this7.title], 'online', data.online);
              // this.todoData.todos[this.title].online = data.online
              _this7.showWarning('删除云端清单成功');
            } else {
              _this7.showWarning('好像出错了呢');
            }
          });
        } else if (!beforeOnline && data.online) {
          // 从本地添加到线上
          this.waiting = true;
          Cloud.addNewList(this.username, this.todos[this.title].name).then(function (res) {
            _this7.waiting = false;
            if (res.code == 0) {
              _this7.todos[_this7.title].list_id = res.list_id;
              var lists = _this7.todoData.todos[_this7.title].lists;

              var _loop = function _loop(i) {
                Cloud.addNewItem(res.list_id, lists[i].content, lists[i].status).then(function (data) {
                  _this7.$set(_this7.todoData.todos[_this7.title].lists[i], 'items_id', data.items_id);
                });
              };

              for (var i in lists) {
                _loop(i);
              }
              _this7.todoData.todos[_this7.title].online = data.online;
              _this7.showWarning('添加云端清单成功');
            } else {
              _this7.showWarning('好像出错了呢');
            }
          });
        } else if (beforeOnline && data.online) {
          this.waiting = true;
          Cloud.submitListEdit(data.name, this.todos[this.title].list_id).then(function (res) {
            _this7.waiting = false;
            if (res.code == 0) {
              _this7.showWarning(res.message);
            } else {
              _this7.showWarning('好像出错了呢');
            }
          });
        } else {
          this.showWarning('编辑本地清单成功');
        }
      } else {
        // 新增
        this.todoData.todos.push({
          name: data.name,
          online: data.online,
          lists: []
        });
        this.title = this.todoData.todos.length - 1;

        if (data.online) {
          this.waiting = true;
          Cloud.addNewList(this.username, data.name).then(function (res) {
            _this7.waiting = false;
            if (res.code == 0) {
              _this7.showWarning(res.message);
              _this7.todos[_this7.title].list_id = res.list_id;
            } else {
              _this7.showWarning('好像出错了呢');
            }
          });
        } else {
          this.showWarning('新增本地清单成功');
        }
      }
      this.listData = '';
      this.showDialog = false;
      this.saveData();
    },
    tabChange: function tabChange(i) {
      this.chooseTab = i;
    },
    search: function search() {},
    clearSearchValue: function clearSearchValue() {
      this.searchValue = '';
    },
    saveData: function saveData() {
      localStorage.setItem(this.username, JSON.stringify(this.todoData));
    },
    clearStorage: function clearStorage() {
      var _this8 = this;

      localStorage.removeItem(this.username);

      Cloud.getAll(this.username).then(function (data) {
        _this8.todoData.todos = data;
        _this8.title = 0;
      });
    },


    // 登录注册
    userAction: function userAction(data) {
      var _this9 = this;

      if (data.name == '') {
        this.showWarning('你倒是写个名字呀');
        return;
      }
      if (data.pass == '') {
        this.showWarning('你倒是输入密码呀');
        return;
      }
      this.beforeSend = true;

      var action = data.action;

      axios.post(url + 'user.php', {
        params: _extends({}, data)
      }).then(function (res) {
        _this9.beforeSend = false;
        _this9.userMessage = res.data.message;

        setTimeout(function () {
          _this9.userMessage = '';
        }, 2000);

        if (res.data.code == 0) {
          axios.get(url + 'cookie.php', {
            params: {
              action: 'login',
              username: data.name
            }
          }).then(function (res) {
            console.log(res);
          });

          if (action == 'login') {
            _this9.showLogin = false;
            _this9.username = data.name;
          }

          Cloud.getAll(data.name).then(function (data) {
            var todoData = {
              todos: data
            };
            _this9.todoData = todoData;
          });
        }
      }).catch(function (error) {
        console.log(error);
      });
    },
    logout: function logout() {
      var _this10 = this;

      axios.get(url + 'cookie.php?action=logout').then(function (res) {
        // console.log(res)
        _this10.username = '';
        _this10.todoData.todos = [];
      });
    },
    showWarning: function showWarning(t) {
      var _this11 = this;

      this.warningText = t || '你还什么都没有写呢٩(๑`^´๑)۶';

      this.warning = true;
      setTimeout(function () {
        _this11.warning = false;
      }, 1000);
    },
    exportFile: function exportFile() {
      var file = JSON.parse(JSON.stringify(this.todoData.todos));
      file.forEach(function (ele) {
        ele.online = false;
      });
      File.exportFile(JSON.stringify(file));
    },
    importFile: function importFile(e) {
      var file = this.$refs.fileInput.files[0];

      var reg = /.json$/;
      if (!reg.test(file.name)) {
        this.showWarning('请提交json文件哦');
        return;
      }

      var _this = this;

      var reader = new FileReader();
      reader.readAsText(file, 'uft-8');
      reader.onload = function (e) {
        console.log(e.target.result);
        _this.todoData.todos = JSON.parse(e.target.result);
        _this.saveData();
      };
    },
    showTips: function showTips(txt, e) {
      var _this12 = this;

      this.tipsData = {
        words: txt,
        style: {
          top: e.y + 20 + 'px',
          left: e.x + 'px'
        },
        show: true
      };
      setTimeout(function () {
        _this12.tipsData.show = false;
      }, 1000);
    },
    touchStart: function touchStart(i) {
      var _this13 = this;

      this.title = i;
      setTimeout(function () {
        _this13.showMenu = false;
      }, 100);
    }
  },
  watch: {},
  computed: {
    todos: function todos() {
      var _this14 = this;

      if (this.chooseTab == 0) {
        return this.todoData.todos;
      } else {
        var todoList = JSON.parse(JSON.stringify(this.todoData.todos));
        var arr = todoList[this.title].lists.filter(function (ele) {
          return ele.status / 1 + 1 == _this14.chooseTab;
        });
        todoList[this.title].lists = arr;
        return todoList;
      }
    }
  },
  mouted: function mouted() {},
  created: function created() {
    var _this15 = this;

    var todoData = void 0;

    axios.get(url + 'cookie.php?action=relogin').then(function (res) {
      console.log(res);
      if (res.data) {
        _this15.username = res.data;

        _this15.waiting = true;
        Cloud.getAll(res.data).then(function (data) {
          _this15.waiting = false;
          var a = data.arr;
          todoData = {
            todos: a,
            u_id: data.u_id
          };

          _this15.u_id = data.u_id;
          _this15.todoData = todoData;
        });
      }
    });
  }
});