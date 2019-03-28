const router = require('express').Router()

router.get('/', (req, res, next) => {
  console.log(req.session)
  next()
})

module.exports = router
