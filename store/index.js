import {
  getTodoAll,
  getTodoLists,
  getTodoItems,
  addTodoList,
  removeTodoList,
  editTodoList,
  addTodoItem,
  removeTodoItem,
  editTodoItem,
  changeTodoItemStatus,
} from '@/assets/api/todo'

const errMsg = '电波传送失败哟~'

export const state = () => ({
  lists: [],

  items: [],

  // 当前选中的清单下标
  currentIndex: 0,

  // 当前编辑的清单名称
  currentEditListValue: '',
  currentEditListIndex: null,

  // 当前选中的事件状态（全部，未完成，已完成）
  status: 0,

  // 消息提示框
  message: {
    show: false,
    conntent: ''
  },

  // 加载动画
  showLoading: false,

  // 编辑弹窗
  showEditForm: false,

  // 导出清单弹窗
  showExportForm: false,

  // 手机版菜单
  showMenu: false,

  // 小贴士
  tips: {
    show: false,
    conntent: ''
  },

  // 确认弹窗
  prompt: {
    show: false,
    content: '',
    next: ''
  },

  // 登录弹窗
  showLogin: false,

  // 用户信息
  USER_ID: null,
  USER_NAME: null,

  hasLoadedLists: []

})

export const getters = {
  currentItems (state) {
    // 用户未登录直接返回空数组
    if (!state.USER_ID || state.lists.length === 0) return []

    const items = state.items.filter(ele => {
      return ele.list_id == state.lists[state.currentIndex].list_id
    })

    if (state.status === 0) return items

    return items.filter(ele => {
      return ele.status == state.status - 1
    })
  }
}

export const mutations = {
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

let messageTimeout

export const actions = {
  // 小贴士
  toggleTips ({ commit }, data) {
    commit('toggleTips', data)
  },

  // 消息提示框
  toggleMessage ({ commit }, data) {
    clearTimeout(messageTimeout)

    commit('toggleMessage', data)

    messageTimeout = setTimeout(() => {
      commit('toggleMessage')
    }, 1000)
  },

  // 初始化列表
  listInit ({ commit, state }, userid) {
    const params = { userid: state.USER_ID }

    getTodoLists(params).then(res => {
      if (res.data.data && res.data.data.lists) {
        commit('setLists', res.data.data.lists)

        getTodoItems({
          list_id: res.data.data.lists[0].list_id
        }).then(res => {

          if (res.data.data && res.data.data.items) {
            commit('setItems', res.data.data.items)
          }
        })
      }
    })
  },

  // 按list_id获取items
  getTodoItems ({ commit, state }) {
    getTodoItems({
      list_id: state.lists[state.currentIndex].list_id
    }).then(res => {
      if (res.data.data && res.data.data.items) {
        commit('setItems', res.data.data.items)
      }
    })
  },

  // 获取用户session
  async nuxtServerInit ({ dispatch, commit }, { req }) {
    // 判断用户登录记录
    if (req.session && req.session.username) {
      commit('setUserInfo', {
        username: req.session.username,
        userid: req.session.userid
      })

      // console.log('init req.session:', req.session)

      // 从这里请求不经过代理？
      // await dispatch('listInit', req.session.userid)
    } else if (req.session && !req.session.username) {
      // console.log('no session')
      commit('setUserInfo', {
        username: null,
        userid: null
      })
    }
  },

  // 添加清单
  addTodoList ({ state, commit, dispatch }, data) {
    const params = {
      list_name: state.currentEditListValue,
      user_id: state.USER_ID
    }

    addTodoList(params).then(res => {
      dispatch('toggleMessage', res.data.code === 0 ? '添加清单成功' : errMsg)

      if (res.data.code === 0) {
        commit('addTodoList', {
          list_id: res.data.data.id,
          ...params
        })
      }
    })
  },

  // 删除清单
  removeTodoList ({ state, commit, dispatch }, data) {
    const params = {
      list_id: state.lists[data].list_id
    }

    removeTodoList(params).then(res => {
      dispatch('toggleMessage', res.data.code === 0 ? '删除清单成功' : errMsg)

      if (res.data.code === 0) {
        let currentIndex = data
        if (state.currentIndex >= data) {
          if (state.lists.length > 0 && state.lists.length - 1 > data) {
            currentIndex = data
          } else {
            currentIndex = data - 1
          }
          commit('changeCurrentIndex', currentIndex)
        }
        commit('removeTodoList', data)
      }
    })
  },

  // 修改清单
  editTodoList ({ state, commit, dispatch }, data) {
    const params = {
      list_id: state.lists[state.currentEditListIndex].list_id,
      list_name: state.currentEditListValue
    }

    editTodoList(params).then(res => {
      dispatch('toggleMessage', res.data.code === 0 ? '修改清单成功' : errMsg)

      if (res.data.code === 0) {
        commit('editTodoList')
      }
    })
  },

  // 添加事项
  addTodoItem ({ state, commit }, data) {
    const params = {
      list_id: state.lists[state.currentIndex].list_id,
      ...data
    }

    addTodoItem(params).then(res => {
      commit('toggleMessage', res.data.code === 0 ? '添加事项成功' : errMsg)

      if (res.data.code === 0) {
        commit('addTodoItem', {
          ...params,
          items_id: res.data.data.id,
          status: 0,
          mark: 0
        })
      }

      setTimeout(() => {
        commit('toggleMessage')
      }, 1000)
    })
  },

  // 删除事项
  removeTodoItem ({ state, commit, dispatch }, data) {
    removeTodoItem(data).then(res => {
      dispatch('toggleMessage', res.data.code === 0 ? '删除事项成功' : errMsg)

      if (res.data.code === 0) {
        commit('removeTodoItem', [data.item_id])
      }

    })
  },

  // 编辑事项
  editTodoItem ({ commit, dispatch }, data) {
    editTodoItem(data).then(res => {
      dispatch('toggleMessage', res.data.code === 0 ? '编辑事项成功' : errMsg)

      if (res.data.code === 0) {
        commit('editTodoItem', data)
      }
    })
  },

  // 清除当前清单的已完成事项
  clearDoneItems ({ state, commit, dispatch }) {
    const item_id = state.items.filter(ele => {
      return ele.list_id == state.lists[state.currentIndex].list_id && ele.status == 1
    }).map(ele => ele.items_id)

    if (item_id.length > 0) {
      const params = {
        item_id
      }

      removeTodoItem(params).then(res => {
        dispatch('toggleMessage', res.data.code === 0 ? '清除完成' : errMsg)

        if (res.data.code === 0) {
          commit('removeTodoItem', item_id)
        }
      })
    }
  }
}
