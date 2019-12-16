const express = require('express');
const router = express.Router();
const authUtil = require('../../../module/authUtil');
const util = require('../../../module/util')
const code = require('../../../module/statusCode');
const msg = require('../../../module/responseMessage');
const User = require('../../../model/user');

router.get('/', (req, res) => {
    res.render('user/signin')
})

router.post('/', (req, res) => {
    const {id, password} = req.body;
    // 파라미터 값 체크
    if(!id || !password) {
        res.status(code.BAD_REQUEST)
        .send(util.successFalse(msg.NULL_VALUE));
        return;
    }
    User.signin({id, password})
    .then(result => {
        const userIdx = result.json.data.userIdx
        const userName = result.json.data.userName
        const token = result.json.data.token
        res.cookie("token", token)
        res.render('home', {userIdx:userIdx, userName:userName, token:token});
    }).catch(err => {
        res.status(code.INTERNAL_SERVER_ERROR)
        .send(util.successFalse(msg.INTERNAL_SERVER_ERROR));
    });
});

// 유저 상세정보 페이지
router.get('/mypage', authUtil.isLoggedin, (req, res) => {
    //const id = req.params.id;
    const userIdx = req.decoded.userIdx;
    console.log(userIdx)
    if(!{userIdx}){
        res.status(code.BAD_REQUEST)
        .send(util.successFalse(msg.NULL_VALUE));
        return;
    }
    
    User.mypage({userIdx})
    .then((User) => {
        const {id, nickname, interest} = User[0];
        console.log(id, ' ', nickname, ' ', interest)
        res.render('user/mypage', {id, nickname, interest})
    }).catch(err => {
        res.status(code.INTERNAL_SERVER_ERROR)
        .send(util.successFalse(msg.INTERNAL_SERVER_ERROR));
        console.log(err);
    });
});

module.exports = router