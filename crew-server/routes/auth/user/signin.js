const express = require('express');
const router = express.Router();
const authUtil = require('../../../module/authUtil');
const util = require('../../../module/util')
const code = require('../../../module/statusCode');
const msg = require('../../../module/responseMessage');
const User = require('../../../model/user');

router.post('/', (req, res) => {
    const {id, password} = req.body;
    // 파라미터 값 체크
    if(!id || !password) {
        res.status(code.BAD_REQUEST)
        .send(util.successFalse(msg.NULL_VALUE));
        return;
    }
    User.signin({id, password})
    .then(({code, json}) => {
        res.status(code).send(json);
    }).catch(err => {
        res.status(code.INTERNAL_SERVER_ERROR)
        .send(util.successFalse(msg.INTERNAL_SERVER_ERROR));
    });
});
module.exports = router