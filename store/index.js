// import axios from 'axios'

// axios.interceptors.request.use((config) => {
//   // Vue.set(Todo, 'waiting', true)
//   return config
// }, err => {
//   return Promise.reject(err)
// })

// axios.interceptors.response.use((res) => {
//   // Vue.set(Todo, 'waiting', false)
//   // if (res.data.message && Todo.waiting == false) {
//   //   Todo.showWarning(res.data.message)
//   // }
//   return res
// }, err => {
//   return Promise.reject(err)
// })

import {
  getTodoLists,
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

  // 小贴士
  tips: {
    show: false,
    conntent: ''
  },

  // 登录弹窗
  showLogin: false,

  // 用户信息
  USER_ID: null,
  USER_NAME: null
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
    state.items = data
  },

  // 设置编辑的清单名称
  setEditListValue (state, value) {
    state.currentEditListValue = value
  },

  // 消息提示框
  toggleMessage (state, content) {
    state.message = {
      show: !state.message.show,
      content: content || ''
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
    state.tips = {
      show: !state.tips.show,
      content: data.content || '',
      style: data.style || ''
    }
  },

  // 登录弹窗
  toggleLogin (state) {
    state.showLogin = !state.showLogin
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
    state.items.forEach((ele, index) => {
      if (ele.items_id == data.item_id) {
        state.items.splice(index, 1)
      }
    })
  },

  // 编辑事项
  editTodoItem (state, data) {
    const item = state.items.find(ele => {
      return ele.items_id == data.item_id
    })

    item.content = data.content
  },

  // 修改事项状态
  changeTodoItemStatus (state, item_id) {
    const item = state.items.find(ele => {
      return ele.items_id == item_id
    })

    item.status = !item.status
  }
}

export const actions = {
  toggleMessage ({ commit }, data) {
    commit('toggleMessage', data)

    setTimeout(() => {
      commit('toggleMessage')
    }, 1000)
  },

  // 初始化列表
  listInit ({ commit, state }, userid) {
    getTodoLists({ userid }).then(res => {
      if (res.data.data && res.data.data.lists) {
        commit('setLists', res.data.data.lists)
        commit('setItems', res.data.data.items)
      }
    })
  },

  async nuxtServerInit ({ dispatch, commit }, { req }) {
    // 判断用户登录记录
    if (req.session && req.session.username) {
      commit('setUserInfo', {
        username: req.session.username,
        userid: req.session.userid
      })

      console.log(req.session)

      await dispatch('listInit', req.session.userid)
    } else if (req.session && !req.session.username) {
      commit('setUserInfo', {
        username: null,
        userid: null
      })
    }
  },

  // 添加清单
  addTodoList ({ state, commit }, data) {
    const params = {
      list_name: state.currentEditListValue,
      user_id: state.USER_ID
    }

    addTodoList(params).then(res => {
      console.log(res)
      commit('toggleMessage', res.data.code === 0 ? '添加清单成功' : errMsg)

      if (res.data.code === 0) {
        commit('addTodoList', {
          list_id: res.data.data.id,
          ...params
        })
      }

      setTimeout(() => {
        commit('toggleMessage')
      }, 1000)
    })
  },

  // 删除清单
  removeTodoList ({ state, commit }, data) {
    const params = {
      list_id: state.lists[data].list_id
    }

    removeTodoList(params).then(res => {
      commit('toggleMessage', res.data.code === 0 ? '删除清单成功' : errMsg)

      if (res.data.code === 0) {
        let currentIndex = data
        if (state.currentIndex == data) {
          if (state.lists.length > 0 && state.lists.length - 1 > data) {
            currentIndex = data
          } else {
            currentIndex = data - 1
          }
          commit('changeCurrentIndex', currentIndex)
        }
        commit('removeTodoList', data)
      }

      setTimeout(() => {
        commit('toggleMessage')
      }, 1000)
    })
  },

  // 修改清单
  editTodoList ({ state, commit }, data) {
    console.log(state.currentEditListValue)
    const params = {
      list_id: state.lists[state.currentEditListIndex].list_id,
      list_name: state.currentEditListValue
    }

    editTodoList(params).then(res => {
      commit('toggleMessage', res.data.code === 0 ? '修改清单成功' : errMsg)

      if (res.data.code === 0) {
        commit('editTodoList')
      }

      setTimeout(() => {
        commit('toggleMessage')
      }, 1000)
    })
  },

  // 添加事项
  addTodoItem ({ state, commit }, data) {
    commit('toggleLoading')

    const params = {
      list_id: state.lists[state.currentIndex].list_id,
      ...data
    }

    addTodoItem(params).then(res => {
      commit('toggleLoading')

      commit('toggleMessage', res.data.code === 0 ? '添加事项成功' : errMsg)

      if (res.data.code === 0) {
        commit('addTodoItem', {
          ...params,
          items_id: res.data.data.id,
          status: 0
        })
      }

      setTimeout(() => {
        commit('toggleMessage')
      }, 1000)
    })
  },

  // 删除事项
  removeTodoItem ({ state, commit }, data) {
    commit('toggleLoading')
    removeTodoItem(data).then(res => {
      commit('toggleLoading')

      commit('toggleMessage', res.data.code === 0 ? '删除事项成功' : errMsg)

      if (res.data.code === 0) {
        commit('removeTodoItem', data)
      }

      setTimeout(() => {
        commit('toggleMessage')
      }, 1000)
    })
  },

  // 编辑事项
  editTodoItem ({ commit }, data) {
    commit('toggleLoading')
    editTodoItem(data).then(res => {
      commit('toggleLoading')

      commit('toggleMessage', res.data.code === 0 ? '编辑事项成功' : errMsg)

      if (res.data.code === 0) {
        commit('editTodoItem', data)
      }

      setTimeout(() => {
        commit('toggleMessage')
      }, 1000)
    })
  },

  // 修改事项状态
  changeTodoItemStatus ({ commit }, data) {
    commit('toggleLoading')

    changeTodoItemStatus(data).then(res => {
      commit('toggleLoading')

      commit('toggleMessage', res.data.code === 0 ? '修改事项状态成功' : errMsg)

      if (res.data.code === 0) {
        commit('changeTodoItemStatus', data.item_id)
      }

      setTimeout(() => {
        commit('toggleMessage')
      }, 1000)
    })
  },
}
