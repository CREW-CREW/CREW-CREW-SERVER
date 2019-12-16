const statusCode = require('../module/statusCode');

class NoReferencedRowError extends Error {
    constructor(code = 'GENERIC', status = statusCode.BAD_REQUEST, ...params) {
        super(...params);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, NoReferencedRowError);
        }
        this.code = code;
        this.status = status;
        this.message = 'No referenced Error'
    }
}

module.exports = NoReferencedRowError;
