var express = require('express')
var router = express.Router()

router.use('/likes', require('./likes'))
router.user('/', require('./sports'))

module.exports = router