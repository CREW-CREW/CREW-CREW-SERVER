const pool = require('../module/poolAsync');

module.exports = {
    read: ({crewIdx}) => {
        const table = 'crew';
        const query = `SELECT * FROM ${table} WHERE crewIdx = '${crewIdx}'`;
        console.log(query);
        return pool.queryParam_None(query);
    },
    readAll: ({category}) => {
        const table = 'crew';
        // let whereStr = Object.entries(whereJson).map(it => `${it[0]} = '${it[1]}'`).join(' AND ');
        // if(whereStr.length > 0) whereStr = 'WHERE ' + whereStr;

        const query = `SELECT * FROM ${table} WHERE category = "${category}"`;
        console.log(query)
        return pool.queryParam_None(query);
    },
    create: ({crewName, category, level, time, content, image}) => {
        const table = 'crew';
        const fields = 'crewName, category, level, time, content, image';
        const questions = `?, ?, ?, ?, ?, ?`;
        const query = `INSERT INTO ${table}(${fields}) VALUES(${questions})`;
        const values = [crewName, category, level, time, content, image];
        return pool.queryParam_Parse(query, values);
    },
    recruit: ({crewIdx, userIdx}) => {
        const table = 'recruit';
        const fields = 'crewIdx, userIdx';
        const questions = `?, ?`;
        const query = `INSERT INTO ${table}(${fields}) VALUES(${questions})`;
        const values = [crewIdx, userIdx];
        return pool.queryParam_Parse(query, values);
    },
};