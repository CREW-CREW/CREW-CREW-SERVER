const authUtil = require('../module/authUtil');
const code = require('../module/statusCode');
const msg = require('../module/responseMessage');
const pool = require('../module/poolAsync');
const util = require('../module/util');
var email_verified = 0
const EmailValidationError = require('../errors/EmailValidationError')

module.exports = {
    signin: ({
        id,
        password
    }) => {
        const table = 'user';
        const query = `SELECT * FROM ${table} WHERE id = '${id}' AND email_verified = 1`;
        return pool.queryParam_None(query)
    },

    signup: ({
        id,
        password,
        salt,
        key_for_verify,
        userName,
        nickname,
        email,
        area,
        interest
    }) => {
        //TODO : email 검사
        const emailValidation = /^[\w.+\-]+@sookmyung\.ac.kr$/;
        if (!emailValidation.test(email)){
            throw new EmailValidationError
        }       
        const table = 'user';
        const fields = 'id, password, salt, key_for_verify, userName, nickname, email, area, interest, email_verified';
        const questions = `?, ?, ?, ?, ?, ?, ?, ?, ?, ?`;
        const values = [id, password, salt, key_for_verify, userName, nickname, email, area, interest, email_verified];
        return pool.queryParam_Parse(`INSERT INTO ${table}(${fields}) VALUES(${questions})`, values)
    },

    mypage:({userIdx}) =>{
        const table = 'user';
        const query = `SELECT id, nickname, interest FROM ${table} WHERE userIdx = '${userIdx}'`;
        return pool.queryParam_None(query);
    },

    update: ({
        key
    }) => {
        const table = 'user';
        const query = `UPDATE ${table} SET email_verified = 1 WHERE key_for_verify = '${key}'`;
        return pool.queryParam_None(query);
    },

    getEmail: ({ insertId
    }) => {
        const table = 'user'
        const query = `SELECT email FROM ${table} WHERE userIdx = '${insertId}'`;
        return pool.queryParam_None(query)
        .then(result => {
            const email = result[0].email
            return {
                code: code.OK,
                json: util.successTrue(msg.USER_UPDATE_SUCCESS, email)
            };
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
    }

};