"use strict";
const express = require('express');
const router = express.Router();
const util = require('../../../module/util')
const code = require('../../../module/statusCode');
const msg = require('../../../module/responseMessage');
const User = require('../../../model/user');
const encrypt = require('../../../module/encryption');
const nodemailer = require('nodemailer');
const smtpTransporter=require('nodemailer-smtp-transport');
const crypto = require('crypto');
const mailInfo = require('../../../config/mail.json')
const { DatabaseError, NoReferencedRowError, DuplicatedEntryError } = require('../../../errors');

const smtpTransport = nodemailer.createTransport(smtpTransporter({
    service: 'Gmail',
    host:'smtp.gmail.com',
    auth: {
        user: mailInfo.user,
        pass: mailInfo.pass
    }
}))

router.get('/', (req, res) => {
    res.render('user/signup');
})

router.post('/', (req, res) => {
    const {id, password, userName, nickname, email, area, interest} = req.body;
    if(!id || !password || !userName || !nickname || !email || !area || !interest) {
        res.status(code.BAD_REQUEST).send(util.successFalse(msg.NULL_VALUE));
        return;
    }
    //인증번호 생성하는 부분
    var key_one = crypto.randomBytes(256).toString('hex').substr(100, 5);
    var key_two = crypto.randomBytes(256).toString('base64').substr(50, 5);
    var key_for_verify = key_one + key_two;
    
    encrypt.encrypt(password)
    .then((result) => {
        const {hashed, salt} = result;
        //인증번호 회원가입 시 추가하기
        return User.signup({id, password: hashed, salt, key_for_verify, userName, nickname, email, area, interest});
    }).then(result=> {
        const insertId = result.insertId
        console.log(insertId)
        return User.getEmail({insertId});
    }).then(result => {                   
        //url
        const url = 'http://' + req.get('host')+'/auth/user/signup/confirmEmail'+'?key='+key_for_verify;               
        //옵션
        const mailOpt = {
            from: 'syleedata@gmail.com',
            to: email,
            subject: '이메일 인증을 진행해주세요.',
            html : '<h1>이메일 인증을 위해 URL을 클릭해주세요.</h1><br>'+url
        };
        //전송
        smtpTransport.sendMail(mailOpt, function(err, response) {
            if (err) {
                console.log(err);
                res.send('<script type="text/javascript">alert("메일 서비스 준비중입니다><"); window.location="/"; </script>')
            } else {
                console.log('email has been sent.');
                res.send('<script type="text/javascript">alert("이메일을 확인하세요."); window.location="/"; </script>');
            }
            smtpTransport.close();
        });
    })
    .catch(err => {
        console.log(err);
        if(err instanceof DuplicatedEntryError) {
            res.status(err.status).send(`<script type="text/javascript">alert('ID가 중복되었습니다.'); window.location="/auth/user/signup"; </script>`)
            return
        }
        res.status(err.status || 500).send(`<script type="text/javascript">alert('${err.message}'); window.location="/"; </script>`);
    })
});

router.get('/confirmEmail', (req,res) => {
    const key = req.query.key
    console.log(key)
    User.update({key})
    .then(result => {
        console.log(result)
        //일치하는 key가 없으면
        if(result.n==0){
            res.send('<script type="text/javascript">alert("Not verified"); window.location="/"; </script>');
        }
        //인증 성공
        else {
            res.send('<script type="text/javascript">alert("Successfully verified"); window.location="/"; </script>');
        }
    }).catch(err => {
        console.log(err);
        throw err;
    })
});


module.exports = router