/**
 * Created by Administrator on 2017/1/25.
 */
//教程中的例子太老了，mongoose api 已经改变
var mongoose=require('mongoose');
var url='mongodb://localhost/words';
mongoose.connect(url);
var db=mongoose.connection;
db.on('open',function () {
    console.log(db.collection);
    console.log(db.db.listCollections);


})
