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

let messageTimeout

export default {
  // 小贴士
  toggleTips ({ commit }, data) {
    commit('toggleTips', data)
  },

  toggleLoading (state) {
    state.showLoading = !state.showLoading
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
        
        if (state.hasLoadedLists.indexOf(currentIndex) == -1) {
          dispatch('getTodoItems')
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
