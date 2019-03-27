export const state = () => {
  lists: []
}

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