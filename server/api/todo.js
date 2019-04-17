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
    if (userid == undefined) {
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
    if (list_name == undefined || user_id == undefined) {
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
    if (list_id == undefined) {
      res.json(argError)
      return
    }

    const sql = `delete from lists where list_id='${list_id}'`

    const result = await mysqlConn.getConn(sql)

    let data = {}

    if (result.affectedRows === 1) {
      const sql = `delete from items where list_id='${list_id}'`

      const result = await mysqlConn.getConn(sql)

      data = {
        code: 0
      }
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

    if (list_id == undefined || content == undefined) {
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

    let sql = `delete from items where items_id='${item_id}'`

    if (typeof item_id === 'object') {
      sql = `delete from items where items_id in (${item_id.join(',')})`
    }

    const result = await mysqlConn.getConn(sql)

    let data = {}

    if (result.affectedRows >= 1) {
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
    const key = req.body.key,
      item_id = req.body.item_id,
      value = req.body.value

    if (key == undefined || item_id == undefined || value == undefined) {
      res.json(argError)
      return
    }

    const sql = `update items set ${key}='${value}' where items_id='${item_id}'`

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

  exportFile: async function (req, res) {},

  importFile: async function (req, res) {
    const lists = req.body.data,
      user_id = req.body.user_id

    if (lists == undefined || user_id == undefined) {
      res.json(argError)
      return
    }

    const sql_items = `insert into items (content, list_id, status) values ?`

    for (var i = 0; i < lists.length; i ++) {
      const sql = `insert into lists (list_name, user_id) values ('${lists[i].list_name}', '${user_id}')`

      const result = await mysqlConn.getConn(sql)

      if (lists[i].items.length > 0) {
        const items = lists[i].items.map(ele => {
          return [ele, result.insertId, 0]
        })

        const result_items = await mysqlConn.getConn(sql_items, items)
      }
    }

    res.json({
      code: 0
    })
  },
}

module.exports = Todo
