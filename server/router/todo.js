const express = require('express')
const router = express.Router()

const Todo = require('../api').Todo

router.post('/get_todo_lists', (req, res, next) => {
  Todo.getTodoLists(req, res)
})

router.post('/add_toto_list', (req, res, next) => {
  Todo.addTodoList(req, res)
})

router.post('/remove_todo_list', (req, res, next) => {
  Todo.removeTodoList(req, res)
})

router.post('/edit_todo_list', (req, res, next) => {
  Todo.editTodoList(req, res)
})

router.post('/add_todo_item', (req, res, next) => {
  Todo.addTodoItem(req, res)
})

router.post('/remove_todo_item', (req, res, next) => {
  Todo.removeTodoItem(req, res)
})

router.post('/eidt_todo_item', (req, res, next) => {
  Todo.eidtTodoItem(req, res)
})


module.exports = router
