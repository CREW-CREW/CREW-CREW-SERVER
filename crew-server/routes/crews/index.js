var express = require('express')
var router = express.Router()

router.use('/', require('./crews'))

module.exports = router