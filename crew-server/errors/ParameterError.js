const statusCode = require('../module/statusCode');

class ParameterError extends Error {
    constructor(code = 'GENERIC', status = statusCode.BAD_REQUEST, ...params) {
        super(...params);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ParameterError);
        }
        this.code = code;
        this.status = status;
        this.message = 'Parameter Error'
    }
}

module.exports = ParameterError;
