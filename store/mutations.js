export default {
  // 设置清单列表
  setLists (state, data) {
    state.lists = data
  },

  // 设置事项列表
  setItems (state, data) {
    state.hasLoadedLists.push(state.currentIndex)

    if (state.items.length === 0) {
      state.items = data
    } else {
      state.items = Array.prototype.concat.apply(state.items, data)
    }
  },

  // 设置编辑的清单名称
  setEditListValue (state, value) {
    state.currentEditListValue = value
  },

  // 消息提示框
  toggleMessage (state, content) {
    if (content) {
      state.message = {
        show: true,
        content: content
      }
    } else {
      state.message = {
        show: false,
        content: ''
      }
    }
  },

  // 加载动画
  toggleLoading (state) {
    state.showLoading = !state.showLoading
  },

  // 编辑弹窗
  toggleEditForm (state, index) {
    state.showEditForm = !state.showEditForm

    if (typeof index == 'number') {
      this.commit('setEditListValue', state.lists[index].list_name)
      state.currentEditListIndex = index
    }
  },

  // 小贴士
  toggleTips (state, data) {
    state.tips.show = !state.tips.show
    if (data) {
      state.tips.content = data.content
      state.tips.style = data.style
    }
  },

  // 确认弹窗
  togglePrompt (state, data) {
    if (data) {
      state.prompt = {
        show: true,
        ...data
      }
    } else {
      state.prompt = {
        show: false,
        content: ''
      }
    }
  },

  // 登录弹窗
  toggleLogin (state) {
    state.showLogin = !state.showLogin
  },

  // 导出清单弹窗
  toggleExportForm (state) {
    state.showExportForm = !state.showExportForm
  },

  // 手机版菜单
  toggleShowMenu (state, data) {
    state.showMenu = data
  },

  // 设置用户信息
  setUserInfo (state, data) {
    state.USER_ID = data.userid
    state.USER_NAME = data.username
  },

  // 切换清单
  changeCurrentIndex (state, index) {
    state.currentIndex = index
  },

  // 切换全部、未完成
  changeStatus (state, status) {
    state.status = status
  },

  // 添加清单
  addTodoList (state, data) {
    state.lists.push(data)
  },

  // 删除清单
  removeTodoList (state, listIndex) {
    state.lists.splice(listIndex, 1)
  },

  // 修改清单
  editTodoList (state) {
    state.lists[state.currentEditListIndex].list_name = state.currentEditListValue
    state.currentEditListIndex = null
  },

  // 添加事项
  addTodoItem (state, data) {
    state.items.unshift(data)
  },

  // 删除事项
  removeTodoItem (state, data) {
    const items = state.items

    data = data.sort()

    for (var i = items.length - 1; i >= 0; i --) {
      if (data.indexOf(items[i].items_id) > -1) {
        state.items.splice(i, 1)
      }
    }
  },

  // 编辑事项
  editTodoItem (state, data) {
    const item = state.items.find(ele => {
      return ele.items_id == data.item_id
    })

    item[data.key] = data.value
  }
}