export const state = () => ({
  lists: [],

  message: {
    show: false,
    conntent: ''
  },

  loading: false,

  showLogin: false
})

export const getters = {
  currentList: state => id => {
    return ''
  }
}

export const mutations = {
  add () {},

  remove () {},

  toggle () {},

  setList (state, data) {
    state.lists = data
  }
}

export const actions = {
  listInit ({ commit, req }) {
    commit ('setList', req)
  }
}