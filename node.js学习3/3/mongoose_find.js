/**
 * Created by Administrator on 2017/2/3.
 */
var mongoose=require('mongoose');
mongoose.Promise = global.Promise;  //添加这一句，mongoose版本比教程中的高
var db=mongoose.connect('mongodb://localhost:27017/words');
var wordSchema=require('./word_schema').wordSchema;
var Words=mongoose.model('Words',wordSchema);

setTimeout(function () {
    mongoose.disconnect();
},3000);

//下面的监听，用于验证数据库状态
mongoose.connection.on('connected', function(){
    console.log('Connection success!');
});
mongoose.connection.on('error', function(err){
    console.log('Connection error: ' + err);
});
mongoose.connection.on('disconnected', function(){
    console.log('Connection disconnected');
});

//执行查询
mongoose.connection.once('open',function () {
    var query=Words.count().where('first').in(['a','e','i','o','u']);
    query.where('last').in(['a','e','i','o','u']);
    query.exec(function (err,count) {
       console.log("\n有"+count+"个单词以元音开始和结束。")
    });
    
    query.find().limit(5).sort({size:-1});
    query.exec(function (err,docs) {
        console.log("\n显示5条数据并排序：");
        for(var i in docs){
            console.log(docs[i].word)
        };
    });
    query=Words.find();
    query.mod('size',2,0);
    query.where('size').gt(6);
    query.limit(10);
    query.select({word:1,size:1});
    query.exec(function (err,docs) {
        console.log("\n长度大于5的并且有偶数个字母的单词：");
        for(var i in docs){
            console.log(JSON.stringify(docs[i]));
        }
    })
});


