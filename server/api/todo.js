const mysqlConn = require('../db')

const argError = {
  code: -1,
  msg: '参数异常'
}

const connetError = {
  code: 1,
  msg: '电波传送失败了哟'
}

const Todo = {
  // 获取数据列表
  getTodoLists: async function (req, res) {
    const userid = req.body.userid
    if (!userid) {
      res.json(errMsg)
      return
    }

    const sql = `select * from lists where user_id ='${userid}' order by create_time`

    const result_lists = await mysqlConn.getConn(sql)

    if (result_lists.length > 0) {
      const list_ids = result_lists.map(ele => ele.list_id).join(',')
      const sql = `select * from items where list_id in (${list_ids}) order by create_time desc`

      const result_items = await mysqlConn.getConn(sql)

      res.json({
        data: {
          code: 0,
          lists: result_lists,
          items: result_items
        }
      })

    } else {
      res.json({
        data: result_lists
      })
    }
  },

  // 添加清单
  addTodoList: async function (req, res) {
    const list_name = req.body.list_name,
      user_id = req.body.user_id
    if (!list_name || !user_id) {
      res.json(argError)
      return
    }

    const sql = `insert into lists (list_name, user_id) values ('${list_name}', '${user_id}')`

    const result = await mysqlConn.getConn(sql)
    let data = {}

    if (result.affectedRows === 1) {
      data = {
        code: 0,
        data: {
          id: result.insertId
        }
      }
    } else {
      data = connetError
    }

    res.json(data)
  },

  // 删除清单
  removeTodoList: async function (req, res) {
    const list_id = req.body.list_id
    if (!list_id) {
      res.json(argError)
      return
    }

    const sql = `delete from lists where list_id='${list_id}'`

    const result = await mysqlConn.getConn(sql)

    let data = {}

    if (result.affectedRows === 1) {
      const sql = `delete from items where list_id='${list_id}'`

      const result = await mysqlConn.getConn(sql)

      res.json({
        code: 0
      })
    } else {
      data = connetError
    }

    res.json(data)
  },

  // 修改清单
  editTodoList: async function (req, res) {
    const list_name = req.body.list_name,
      list_id = req.body.list_id

    if (list_name == undefined || list_id == undefined) {
      res.json(argError)
      return
    }

    const sql = `update lists set list_name='${list_name}' where list_id='${list_id}'`

    const result = await mysqlConn.getConn(sql)

    let data = {}

    if (result.affectedRows === 1) {
      data = {
        code: 0
      }
    } else {
      data = connetError
    }

    res.json(data)
  },

  // 添加事项
  addTodoItem: async function (req, res) {
    const list_id = req.body.list_id,
      content = req.body.content

    if (!list_id || !content) {
      res.json(argError)
      return
    }

    const sql = `insert into items (content, list_id, status) values ('${content}', '${list_id}', 0)`

    const result = await mysqlConn.getConn(sql)

    let data = {}

    if (result.affectedRows === 1) {
      data = {
        code: 0,
        data: {
          id: result.insertId
        }
      }
    } else {
      data = connetError
    }

    res.json(data)
  },

  // 删除事项
  removeTodoItem: async function (req, res) {
    const item_id = req.body.item_id

    if (item_id == undefined) {
      res.json(argError)
      return
    }

    const sql = `delete from items where items_id='${item_id}'`

    const result = await mysqlConn.getConn(sql)

    let data = {}

    if (result.affectedRows === 1) {
      data = {
        code: 0
      }
    } else {
      data = connetError
    }

    res.json(data)
  },

  // 编辑事项
  editTodoItem: async function (req, res) {
    const content = req.body.content,
      item_id = req.body.item_id

    if (content == undefined || item_id == undefined) {
      res.json(argError)
      return
    }

    const sql = `update items set content='${content}' where items_id='${item_id}'`

    const result = await mysqlConn.getConn(sql)

    let data = {}

    if (result.affectedRows === 1) {
      data = {
        code: 0
      }
    } else {
      data = connetError
    }

    res.json(data)
  },

  // 修改事项状态
  changeTodoItemStatus: async function (req, res) {
    const item_id = req.body.item_id,
      status = req.body.status

    if (item_id == undefined || status == undefined) {
      res.json(argError)
      return
    }

    const sql = `update items set status='${status}' where items_id='${item_id}'`

    const result = await mysqlConn.getConn(sql)

    let data = {}

    if (result.affectedRows === 1) {
      data = {
        code: 0
      }
    } else {
      data = connetError
    }

    res.json(data)
  },
}

module.exports = Todo
