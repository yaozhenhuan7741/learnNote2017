/**
 * Created by malei on 2017/3/7.
 */
var host='127.0.0.1';
var port=27017;
var dbname='comments';
module.exports={
    db:'mongodb://'+host+':'+port+'/'+dbname
}