"use strict";
const express = require('express');
const router = express.Router();
const authUtil = require('../../../module/authUtil');
const util = require('../../../module/util')
const code = require('../../../module/statusCode');
const msg = require('../../../module/responseMessage');
const User = require('../../../model/user');
const encrypt = require('../../../module/encryption');
const nodemailer = require('nodemailer');
const smtpTransporter=require('nodemailer-smtp-transport');
const crypto = require('crypto');

var smtpTransport = nodemailer.createTransport(smtpTransporter({
    service: 'Gmail',
    host:'smtp.gmail.com',
    auth: {
        user: 'syleedata@gmail.com',
        pass: 'rkdgur8504'
    }
}))

router.post('/', (req, res) => {
    console.log(1);
    //인증번호 생성하는 부분
    var key_one = crypto.randomBytes(256).toString('hex').substr(100, 5);
    var key_two = crypto.randomBytes(256).toString('base64').substr(50, 5);
    var key_for_verify = key_one + key_two;
    const {id, password, userName, nickname, email, area, interest} = req.body;
    if(!id || !password || !userName || !nickname || !email || !area || !interest) {
        res.status(code.BAD_REQUEST).send(util.successFalse(msg.NULL_VALUE));
        return;
    }
    
    encrypt.encrypt(password)
    .then((result) => {
        if(result.code && result.json) return result;
        const {hashed, salt} = result;
        console.log(email)

        //인증번호 회원가입 시 추가하기
        return User.signup({id, password: hashed, salt, key_for_verify, userName, nickname, email, area, interest});
    }).then(result => {
        console.log(result)
        const userIdx = result.insertId;
        //메일 보내기 
                    //url
                    var url = 'http://' + req.get('host')+'/confirmEmail'+'?key='+key_for_verify;               
                    const email = 'siyeon1313@gmail.com';
                    console.log(email);
                    //옵션
                    var mailOpt = {
                        from: 'syleedata@gmail.com',
                        to: email,
                        subject: '이메일 인증을 진행해주세요.',
                        html : '<h1>이메일 인증을 위해 URL을 클릭해주세요.</h1><br>'+url
                    };
                    //전송
                    smtpTransport.sendMail(mailOpt, function(err, res) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('email has been sent.');
                        }
                        smtpTransport.close();
                    });
                    res.send('<script type="text/javascript">alert("이메일을 확인하세요."); window.location="/"; </script>');

        // return {
        //     code: code.OK,
        //     json: util.successTrue('success', userIdx)
        // };
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

router.get('/confirmEmail', function (req,res) {

    User.updateOne({key_for_verify:req.query.key},{$set:{email_verified:true}}, function(err,user){
        //에러처리
        if (err) {
            console.log(err);
        }
        //일치하는 key가 없으면
        else if(user.n==0){
            res.send('<script type="text/javascript">alert("Not verified"); window.location="/"; </script>');
        }
        //인증 성공
        else {
            res.send('<script type="text/javascript">alert("Successfully verified"); window.location="/"; </script>');
        }
    });
});


module.exports = router