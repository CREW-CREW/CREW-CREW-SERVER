var express = require('express')
var router = express.Router()

router.use('/recruit', require('./recruit'))
router.user('/', require('./sports'))

module.exports = router