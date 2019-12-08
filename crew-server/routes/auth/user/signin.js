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
        console.log(result)
        // res.send('<script type="text/javascript">alert("Successfully verified"); window.location="/"; </script>');
        // res.status('<script type="text/javascript">alert("Successfully verified"); window.location="/"; </script>')
        res.render('home', {data: result});
    }).catch(err => {
        //console.log(err)
        res.status(code.INTERNAL_SERVER_ERROR)
        .send(util.successFalse(msg.INTERNAL_SERVER_ERROR));
    });
});

// 유저 상세정보 페이지
router.get('/:id', (req, res) => {
    const id = req.params.id;
    //const userId = req.query.userId;
    console.log(1)
    if(!{id}){
        res.status(code.BAD_REQUEST)
        .send(util.successFalse(msg.NULL_VALUE));
        return;
    }
    
    User.mypage({id})
    .then((User) => {
        //res.status(code).send(json);
        console.log(User)
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