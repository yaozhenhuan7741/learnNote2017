/**
 * Created by Administrator on 2017/2/13.
 */
var crypto=require('crypto');
function hashPW(pwd){
    return crypto.createHash('sha256').update(pwd).
    digest('base64').toString();
}
exports.hashPW=hashPW;