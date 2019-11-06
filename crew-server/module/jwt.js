const {secretOrPrivateKey} = require('../config/secretKey');
const randtoken = require('rand-token');
const jwt = require('jsonwebtoken');

const options = {
    algorithm: "HS256",
    expiresIn: "1h",
    issuer: "syhs"
};
const refreshOptions = { //랜덤 토큰을 사용하는 경우 정말 jwt sign으로 만들 때
    algorithm: "HS256",
    expiresIn: "24h * 14",
    issuer: "syhs"
};

module.exports = {
    sign: (user) => {
        const payload = {
            userIdx: user.userIdx
        };

        return {
            token: jwt.sign(payload, secretOrPrivateKey, options),
            refreshToken: randtoken.uid(256) //발급받은 refreshToken은 반드시 디비에 저장해야 한다.
        };
    },
    verify: (token) => {
        let decoded;
        try {
            decoded = jwt.verify(token, secretOrPrivateKey);
        } catch (err) {
            if (err.message === 'jwt expired') {
                console.log('expired token');
                return -3;
            } else if (err.message === 'invalid token') {
                console.log('invalid token');
                return -2;
            } else {
                console.log("invalid token");
                return -2;
            }
        }
        return decoded;
    },
    refresh: (user) => {
        const payload = {
            idx: user.idx,
        };

        return jwt.sign(payload, secretOrPrivateKey, options);
    }
};