const express = require('express')
const router = express.Router()
const Crew = require('../../model/crew');
const parameterChecker = require('../../module/parameterCheck');
const code = require('../../module/statusCode')
const util = require('../../module/util')
const authUtil = require('../../module/authUtil')
const msg = require('../../module/responseMessage')
const upload = require('../../config/multer');

// 스포츠 카테고리 별로 크루 리스트 보여주기
router.get('/category/:category', (req, res) => {
    const category = req.params.category;
    Crew.readAll({category})
    .then((Crew) => {
        //console.log(Crew);
        const length = Object.keys(Crew).length;
        if(Crew.code && Crew.json) return Crew;
        const {crewIdx, crewName, category, level, time, content, image} = Crew[0];
        const list = Crew
        res.render('crews/crewList', {crewIdx, list, crewName, category, level, time, content, image, length}); 
    }).catch(err => {
        console.log(err);
        return {
            code: code.INTERNAL_SERVER_ERROR,
            json: util.successFalse(msg.INTERNAL_SERVER_ERROR)
        };
    })
});

// 크루 상세 정보 페이지 
router.get('/:crewIdx', (req, res) => {
    const crewIdx = req.params.crewIdx;
    if(!crewIdx){
        res.status(code.BAD_REQUEST)
        .send(util.successFalse(msg.NULL_VALUE));
        return;
    }
    Crew.read({crewIdx})
    .then((Crew) => {
        const {crewName, category, level, time, content, image} = Crew[0];
        //res.status(code.OK).send(util.successTrue(msg.CREW_READ_SUCCESS, data));
        res.render('crews/crewDetail', {crewName, category, level, time, content, image}); 
    }).catch(err => {
        console.log(err);
        res.status(code.BAD_REQUEST)
        .send(util.successFalse(msg.OUT_OF_VALUE));
    })
});

// 크루에 가입하기
router.get('/:crewIdx/recruit', authUtil.isLoggedin , (req, res) => {
    const crewIdx = req.params.crewIdx;
    const userIdx = req.decoded.userIdx;

    Crew.recruit({crewIdx, userIdx})
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

router.get('/', (req, res) => {
    res.render('crews/crewCreate')
})

// 크루 새로 생성하기 
router.post('/', upload.single('image'), (req, res) =>  {
    console.log(req.file)
    req.body.image = req.file.location
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
        return Crew.create(json)
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
    }).then(()=>{
        //res.status(code).send(json);
        res.send('<script type="text/javascript">alert("크루를 생성하였습니다!"); window.location="/"; </script>');
    });
});

module.exports = router