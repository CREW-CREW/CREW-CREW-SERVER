var express = require('express')
var router = express.Router()

router.use('/auth', require('./auth'))
router.use('/crew', require('./crew'))

module.exports = router