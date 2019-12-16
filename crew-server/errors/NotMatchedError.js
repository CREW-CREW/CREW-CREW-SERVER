const statusCode = require('../module/statusCode');

class NotMatchedError extends Error {
    constructor(code = 'GENERIC', status = statusCode.DB_ERROR, ...params) {
        super(...params);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, NotMatchedError);
        }
        this.code = code;
        this.status = status;
        this.message = 'Not Matched Error'
    }
}

module.exports = NotMatchedError;
