const express = require('express')
const router = express.Router()
const crew = require('../../model/crew');
const parameterChecker = require('../../module/parameterCheck');
const code = require('../../module/statusCode')
const util = require('../../module/util')
const authUtil = require('../../module/authUtil')
const msg = require('../../module/responseMessage')

// 스포츠 카테고리 별로 크루 리스트 보여주기
router.post('/list', (req, res) => {

    crew.readAll(req.body)
    .then(result => {
        console.log(result);
        if(result.code && result.json) return result;
        return {
            code: code.OK,
            json: util.successTrue('',result)
        };
    }).catch(err => {
        console.log(err);
        return {
            code: code.INTERNAL_SERVER_ERROR,
            json: util.successFalse(msg.INTERNAL_SERVER_ERROR)
        };
    }).then(({code, json})=>{
        res.status(code).send(json)
    });
});

// 크루에 가입하기
router.get('/:crewIdx/recruit', authUtil.isLoggedin , (req, res) => {
    const crewIdx = req.params.crewIdx;
    const userIdx = req.decoded.userIdx;

    crew.recruit({crewIdx, userIdx})
    .then(result => {
        console.log(result);
        if(result.code && result.json) return result;
        return {
            code: code.OK,
            json: util.successTrue('success')
        };
    }).catch(err => {
        console.log(err);
        return {
            code: code.INTERNAL_SERVER_ERROR,
            json: util.successFalse(msg.INTERNAL_SERVER_ERROR)
        };
    }).then(({code, json})=>{
        res.status(code).send(json)
    });
});

// 크루 상세 정보 페이지 
router.get('/:crewIdx', (req, res) => {
    const crewIdx = req.params.crewIdx;

    crew.read({crewIdx})
    .then(result => {
        console.log(result);
        if(result.code && result.json) return result;
        const crewSingle = result[0];
        return {
            code: code.OK,
            json: util.successTrue('', crewSingle)
        };
    }).catch(err => {
        console.log(err);
        return {
            code: code.INTERNAL_SERVER_ERROR,
            json: util.successFalse(msg.INTERNAL_SERVER_ERROR)
        };
    }).then(({code, json})=>{
        res.status(code).send(json)
    });
});

// 크루 새로 생성하기 
router.post('/', (req, res) =>  {
    parameterChecker(req.body, ['crewName', 'category', 'level', 'time', 'content', 'image'])
    .catch(err => {
        console.log(err);
        return {
            code: code.BAD_REQUEST,
            json: util.successFalse(err.message)
        };
    }).then(result => {
        if(result.code && result.json) return result;
        const json = result;
        return crew.create(json)
    }).then(result => {
        if(result.code && result.json) return result;
        const insertId = result.insertId;
        return {
            code: code.OK,
            json: util.successTrue('',insertId)
        };
    }).catch(err => {
        console.log(err);
        return {
            code: code.INTERNAL_SERVER_ERROR,
            json: util.successFalse(msg.INTERNAL_SERVER_ERROR)
        };
    }).then(({code, json})=>{
        res.status(code).send(json);
    });
});

module.exports = router