const mysqlConn = require('../db')
const PasswordHash = require('password-hash')

const UserAction = {
  // 用户登录
  login: async function (req, res) {
    const username = req.body.username,
      password = req.body.password

    const sql = `select * from users where user_name ='${username}'`

    const result = await mysqlConn.getConn(sql)

    let data = {}
    if (result.length === 0) {
      data = {
        code: 1,
        msg: '用户名不存在'
      }
    } else {
      if (PasswordHash.verify(password, result[0].user_pass)) {
        data = {
          code: 0,
          data: {
            userid: result[0].user_id
          }
        }
        // 设置session
        req.session.username = username
        req.session.userid = result[0].user_id
      } else {
        data = {
          code: 1,
          msg: '密码错误'
        }
      }
    }

    res.json(data)
  },

  // 用户注册
  reg: function (req, res) {
    const username = req.body.username,
      password = req.body.password

    const sql = `select * from users where user_name ='${username}'`

    mysqlConn.getConn(sql).then(result => {
      if (result.length === 1) {
        res.json({
          code: 1,
          msg: '用户名已存在'
        })
      } else {
        const hash = PasswordHash.generate(password)
        const sql = `insert into users (user_name, user_pass) values ('${username}','${hash}')`

        mysqlConn.getConn(sql).then(result => {
          let data = {}

          if (result.affectedRows === 1) {
            data = {
              code: 0,
              data: {
                userid: result.insertId
              }
            }
            req.session.username = username
            req.session.userid = result.insertId
          } else {
            data = {
              code: 1,
              msg: '电波传送失败了喲'
            }
          }

          res.json(data)
        })
      }

    })
    .catch(e => {
      console.log('err:', e)
    })
  }
}

const Todo = {
  // 获取数据列表
  getTodoLists: async function (req, res) {
    const userid = req.body.userid
    const sql = `select * from lists where user_id ='${userid}' order by create_time`

    mysqlConn.getConn(sql).then(result_lists => {
      const list_ids = result_lists.map(ele => ele.list_id).join(',')
      const sql = `select * from items where list_id in (${list_ids})`

      mysqlConn.getConn(sql).then(result_items => {
        res.json({
          data: {
            lists: result_lists,
            items: result_items
          }
        })
      })
      .catch(e => {
        console.log(e)
      })

    })
    .catch(e => {
      console.log(e)
    })

  },

  // 添加清单
  addTodoList: async function (req, res) {
    res.json({
      code: 0,
      msg: 'ok'
    })
  },

  // 删除清单
  removeTodoList: async function (req, res) {
    res.json({
      code: 0,
      msg: 'ok'
    })
  },

  // 修改清单
  editTodoList: async function (req, res) {
    res.json({
      code: 0,
      msg: 'ok'
    })
  },

  // 添加事项
  addTodoItem: async function (req, res) {
    res.json({
      code: 0,
      msg: 'ok'
    })
  },

  // 删除事项
  removeTodoItem: async function (req, res) {
    res.json({
      code: 0,
      msg: 'ok'
    })
  },

  // 修改事项
  eidtTodoItem: async function (req, res) {
    res.json({
      code: 0,
      msg: 'ok'
    })
  },
}

exports.UserAction = UserAction
exports.Todo = Todo
