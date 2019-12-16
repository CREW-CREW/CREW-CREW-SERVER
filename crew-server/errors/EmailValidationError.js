const statusCode = require('../module/statusCode')

class EmailValidationError extends Error {
    constructor(code = 'GENERIC', status = statusCode.BAD_REQUEST, ...params) {
        super(...params);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, EmailValidationError);
        }
        this.code = code;
        this.status = status;
        this.message = '숙명 메일로 가입하세요!';
    }
}

module.exports = EmailValidationError;