// import axios from 'axios'
// import Vue from 'vue'
// import { mapState }


// export default function ({ $axios, redirect }) {
//   $axios.onRequest(config => {
//     console.log('Making request to ' + config.url)
//   })

//   $axios.onError(error => {
//     const code = parseInt(error.response && error.response.status)
//     if (code === 400) {
//       redirect('/400')
//     }
//   })
// }
// axios.interceptors.request.use((config) => {
//   console.log(config)
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

// Vue.use(axios)

// import * as axios from 'axios'

// let options = {}
// // The server-side needs a full url to works
// if (process.server) {
//   options.baseURL = `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}`
// }

// export default axios.create(options)
