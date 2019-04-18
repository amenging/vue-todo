const mysqlConn = require('../db')
const PHPPasswordHash = require('node-php-password')

const UserAction = {
  // 用户登录
  login: async function (req, res) {
    const username = req.body.username,
      password = req.body.password

    const sql = `select * from users where user_name ='${username}'`

    const result = await mysqlConn.getConn(sql)

    let data = {}
    if (!result) {
      data = {
        code: -1,
        msg: '网络错误'
      }
    } else {
      if (result.length === 0) {
        data = {
          code: 1,
          msg: '用户名不存在'
        }
      } else {
        console.log(PHPPasswordHash.verify(password, result[0].user_pass))
        if (PHPPasswordHash.verify(password, result[0].user_pass)) {
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
    }

    res.json(data)
  },

  // 用户注册
  reg: async function (req, res) {
    const username = req.body.username,
      password = req.body.password

    const sql = `select * from users where user_name ='${username}'`

    const result = await mysqlConn.getConn(sql)

    if (result.length === 1) {
      res.json({
        code: 1,
        msg: '用户名已存在'
      })
    } else {
      const hash = PHPPasswordHash.hash(password)
      const sql = `insert into users (user_name, user_pass) values ('${username}','${hash}')`

      const result = await mysqlConn.getConn(sql)
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
          msg: '电波传送失败了哟'
        }
      }

      res.json(data)
    }
  }
}

module.exports = UserAction
