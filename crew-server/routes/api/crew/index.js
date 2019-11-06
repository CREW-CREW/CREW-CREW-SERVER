var express = require('express')
var router = express.Router()

router.use('/sports', require('./sports'))
router.use('/sports/detail', require('./detail'))

module.exports = router