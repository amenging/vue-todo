import axios from 'axios'

export async function login (params) {
  return await axios.post('/api/user_action/login', {
    ...params
  })
}