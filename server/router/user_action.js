const express = require('express')
const router = express.Router()

const UserAction = require('../api/user.js')

router.post('/login', (req, res, next) => {
  UserAction.login(req, res)
})

router.post('/logout', (req, res, next) => {
  delete req.session.username
  delete req.session.userid

  res.json({
    code: 0
  })
})

router.post('/reg', (req, res, next) => {
  UserAction.reg(req, res)
})

module.exports = router
