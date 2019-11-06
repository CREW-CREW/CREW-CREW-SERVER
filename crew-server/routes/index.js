var express = require('express')
var router = express.Router()

router.use('/auth', require('./auth'))
router.use('/crews', require('./crews'))

module.exports = router