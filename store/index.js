import Mutations from './mutations'
import Actions from './actions'

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

export const mutations = Mutations
export const actions = Actions


