const msg = require('./responseMessage');

module.exports = (json, arr) => {
    return new Promise((resolve, reject) => {
        const noArr = arr.filter(it => json[it] == undefined);
        if(noArr.length > 0) {
            reject(new Error(`${msg.NULL_VALUE},${noArr.join(',')}`));
            return;
        }
        resolve(json);
    })
};