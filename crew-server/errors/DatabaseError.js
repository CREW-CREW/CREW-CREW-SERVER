const statusCode = require('../module/statusCode');

class DatabaseError extends Error {
    constructor(code = 'GENERIC', status = statusCode.DB_ERROR, ...params) {
        super(...params);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, DatabaseError);
        }
        this.code = code;
        this.status = status;
        this.message = 'Database Error'
    }
}

module.exports = DatabaseError;
