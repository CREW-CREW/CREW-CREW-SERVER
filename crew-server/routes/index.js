var express = require('express')
var router = express.Router()

router.use('/auth', require('./auth'))
router.use('/crews', require('./crews'))
// /* GET home page. */
// router.get('/', function(req, res, next) {
//     res.render('home');
// });

module.exports = router;