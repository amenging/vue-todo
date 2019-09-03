import axios from 'axios'
import Vue from 'vue'

export default function ({ app }, inject) {
  axios.interceptors.request.use((config) => {
    app.store.commit('toggleLoading')
    return config
  }, err => {
    return Promise.reject(err)
  })

  axios.interceptors.response.use((res) => {
    app.store.commit('toggleLoading')
    return res
  }, err => {
    return Promise.reject(err)
  })
}
