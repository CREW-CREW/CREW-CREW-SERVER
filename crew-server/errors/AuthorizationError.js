const statusCode = require('../module/statusCode');

class AuthorizationError extends Error {
    constructor(code = 'GENERIC', status = statusCode.UNAUTHORIZED, ...params) {
        super(...params);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, AuthorizationError);
        }
        this.code = code;
        this.status = status;
        this.message = 'Authorization Error'
    }
}

module.exports = AuthorizationError;
