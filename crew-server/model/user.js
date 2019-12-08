const authUtil = require('../module/authUtil');
const code = require('../module/statusCode');
const msg = require('../module/responseMessage');
const pool = require('../module/poolAsync');
const encrypt = require('../module/encryption');
const util = require('../module/util');
const jwt = require('../module/jwt')
var email_verified = 0

module.exports = {
    signin: ({
        id,
        password
    }) => {
        const table = 'user';
        const query = `SELECT * FROM ${table} WHERE id = '${id}' AND email_verified = 1`;
        return pool.queryParam_None(query)
            .then(async (userResult) => {

                if (userResult.length == 0) {
                    return {
                        code: code.BAD_REQUEST,
                        json: util.successFalse(msg.NO_USER)
                    };
                }
                const user = userResult[0];
                // 비밀번호 체크
                const {
                    hashed
                } = await encrypt.encryptWithSalt(password, user.salt);
                if (user.password != hashed) {
                    return {
                        code: code.BAD_REQUEST,
                        json: util.successFalse(msg.MISS_MATCH_PW)
                    };
                }

                const data = jwt.sign(user);
                // 로그인 성공
                return {
                    code: code.OK,
                    json: util.successTrue(msg.SIGN_IN_SUCCESS, {userIdx: user.userIdx, userName: user.userName, token: data.token, refreshToken: data.refreshToken})
                }
            })
            .catch(err => {
                console.log(err);
                throw err;
            });
    },

    signup: ({
        id:id,
        password:password,
        salt:salt,
        key_for_verify:key_for_verify,
        userName:userName,
        nickname:nickname,
        email:email,
        area:area,
        interest:interest
    }) => {
        const table = 'user';
        const fields = 'id, password, salt, key_for_verify, userName, nickname, email, area, interest, email_verified';
        const questions = `?, ?, ?, ?, ?, ?, ?, ?, ?, ?`;
        const values = [id, password, salt, key_for_verify, userName, nickname, email, area, interest, email_verified];
        return pool.queryParam_Parse(`INSERT INTO ${table}(${fields}) VALUES(${questions})`, values)
            .catch(err => {
                // ER_DUP_ENTRY
                if(err.errno == 1062){
                    console.log(err.errno, err.code);
                    return {
                        code: code.BAD_REQUEST,
                        json: util.successFalse(msg.ALREADY_ID)
                    };
                }
                console.log(err);
                throw err;
            });
    },

    mypage:({id}) =>{
        const table = 'user';
        const query = `SELECT id, nickname, interest FROM ${table} WHERE id = '${id}'`;
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
            // if(!data){
            //     return {
            //         code: statusCode.BAD_REQUEST,
            //         json: authUtil.successFalse(responseMessage.NO_USER)
            //     };
            // }
            //console.log(result[0].email)
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