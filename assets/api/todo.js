import axios from 'axios'

export async function getTodoLists (params) {
  const result = axios.get('/api/todo/get_todo_lists', {
    ...params
  })
  return result
}