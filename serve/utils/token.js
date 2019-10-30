const jwt = require('jsonwebtoken');
/**
 * 
 * @param {String} data         加密数据
 * @param {Number} expiresIn    有效期（单位:s）
 */
const { secret } = require('../config.json');
function create(data, expiresIn = 60*60*24*7) {
    return jwt.sign({ data }, secret, { expiresIn })
}

function verify(token) {
    let res = true;
    try {
        let result = jwt.verify(token, secret);
        res = true;
    } catch (err) {
        res = false;
    }
    return res
}

module.exports = {
    create,
    verify
}