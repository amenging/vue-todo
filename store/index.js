// import axios from 'axios'
import { getTodoLists } from '@/assets/api/todo'

export const state = () => ({
  lists: [],

  items: [],

  // 当前选中的清单下标
  currentIndex: 0,

  // 当前选中的事件状态（全部，未完成，已完成）
  status: 0,

  // 消息提示框
  message: {
    show: false,
    conntent: ''
  },

  // 加载动画
  showLoading: false,

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
  add () {},

  remove () {},

  toggle () {},

  // 设置清单列表
  setLists (state, data) {
    state.lists = data
  },

  // 设置事项列表
  setItems (state, data) {
    state.items = data
  },

  // 消息提示框
  toggleMessage (state, data) {
    state.message = {
      show: !state.message.show,
      content: data || ''
    }
  },

  // 加载动画
  toggleLoading (state) {
    state.showLoading = !state.showLoading
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

  changeCurrentIndex (state, index) {
    state.index = index
  },

  changeStatus (state, status) {
    state.status = status
  },

  eidtTodoItem (state, items_id) {
    const item = state.items.find(ele => {
      return ele.items_id == items_id
    })

    item.status = !item.status
  }
}

export const actions = {
  listInit ({ commit, state }, userid) {
    console.log(userid)
    getTodoLists({ userid }).then(res => {
      commit('setLists', res.data.data.lists)
      commit('setItems', res.data.data.items)
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

  addTodoList () {},

  removeTodoList () {},

  editTodoList () {},

  addTodoItem () {},

  removeTodoItem () {},

  eidtTodoItem () {},

}
