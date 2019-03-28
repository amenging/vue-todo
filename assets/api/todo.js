import axios from 'axios'

export async function getTodoLists (params) {
  return await axios.post('/api/todo/get_todo_lists', {...params })
}

export async function addTodoList (params) {
  return await axios.post('/api/todo/add_todo_list', { ...params })
}

export async function removeTodoList (params) {
  return await axios.post('/api/todo/remove_todo_list', { ...params })
}

export async function editTodoList (params) {
  return await axios.post('/api/todo/edit_todo_list', { ...params })
}

export async function addTodoItem (params) {
  return await axios.post('/api/todo/add_todo_item', { ...params })
}

export async function removeTodoItem (params) {
  return await axios.post('/api/todo/remove_todo_item', { ...params })
}

export async function eidtTodoItem (params) {
  return await axios.post('/api/todo/eidt_todo_item', { ...params })
}

