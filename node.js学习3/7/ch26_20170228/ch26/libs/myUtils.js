/**
 * Created by malei on 2017/2/28.
 */
var crypto=require('crypto');
exports.hashPW=function (password) {
    return crypto.createHash('sha256').update(password)
        .digest('base64').toString();
}