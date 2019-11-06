const express = require('express');
const router = express.Router();
const authUtil = require('../../../module/authUtil');
const util = require('../../../module/util')
const code = require('../../../module/statusCode');
const msg = require('../../../module/responseMessage');
const User = require('../../../model/user');
const encrypt = require('../../../module/encryption');

router.post('/', (req, res) => {
    const {id, password, userName, nickname, area, interest} = req.body;
    if(!id || !password || !userName || !nickname || !area || !interest) {
        res.status(code.BAD_REQUEST).send(util.successFalse(msg.NULL_VALUE));
        return;
    }
    encrypt.encrypt(password)
    .then((result) => {
        if(result.code && result.json) return result;
        const {hashed, salt} = result;
        return User.signup({id, password: hashed, salt, userName, nickname, area, interest});
    }).then(result => {
        if(result.code && result.json) return result;
        const userIdx = result.insertId;
        return {
            code: code.OK,
            json: util.successTrue('success',userIdx)
        };
    })
    .catch(err => {
        console.log(err);
        return {
            code: code.INTERNAL_SERVER_ERROR,
            json: util.successFalse(msg.INTERNAL_SERVER_ERROR)
        };
    }).then(({code, json})=>{
        res.status(code).send(json)
    });

});


module.exports = router