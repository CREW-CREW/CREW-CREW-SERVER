const statusCode = require('../module/statusCode');

class TokenExpiredError extends Error {
    constructor(code = 'GENERIC', status = statusCode.UNAUTHORIZED, ...params) {
        super(...params);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, TokenExpiredError);
        }
        this.code = code;
        this.status = status;
        this.message = 'Token Expired Error'
    }
}

module.exports = TokenExpiredError;
