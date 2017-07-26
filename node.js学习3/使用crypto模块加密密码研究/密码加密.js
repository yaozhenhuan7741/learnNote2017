/**
 * Created by Administrator on 2017/7/26.
 */

var crypto=require('crypto');

function hashPW(pwd) {
	return crypto.createHash('sha256').update(pwd).digest('base64').toString();
}


console.log(hashPW('123aaa'));