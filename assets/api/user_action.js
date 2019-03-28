import axios from 'axios'

export async function userLogin (params) {
  return await axios.post('/api/user_action/login', {
    ...params
  })
}

export async function userReg (params) {
  return await axios.post('/api/user_action/reg', {
    ...params
  })
}

export async function userLogout (params) {
  return await axios.post('/api/user_action/logout', {
    ...params
  })
}
