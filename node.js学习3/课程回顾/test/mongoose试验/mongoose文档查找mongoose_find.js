/**
 * Created by malei on 2017/6/27.
 */
var mongoose=require('mongoose');
mongoose.Promise = global.Promise;
var db=mongoose.connect('mongodb://localhost/words');
var WordSchema=require('./mongoose_word_schema').wordSchema;
var WordModel=mongoose.model('words',WordSchema);
setTimeout(function () {
    mongoose.disconnect();
},3000);

mongoose.connection.once('open',function () {
    // var query=WordModel.find();
    // query.limit(1);
    // query.exec(function (err,docs) {
    //     console.log(docs);
    //
    // });  //试一下

    //计数
    var query=WordModel.count().where('first').in(['a','e','i','o','u']);
    query.where('last').in(['a','e','i','o','u']);
    query.exec(function (err,count) {
        console.log('元音开头元音结尾的单词的数量：',count);
    });

    //因为使用同一个query,下面的查询，实在上边的条件之后，继续添加下边的查询条件
    query.find().limit(5).sort({size:-1});
    query.exec(function (err,docs) {
        console.log('-------------------分隔符------------');
        console.log('元音开头元音结尾的单词中，长度最长的5个单词');
        console.log(docs);
        
    });

    //单词长度是偶数，并且长度大于6的单词，10个
    query=WordModel.find();  //重新赋值，不会继续上边的查询
    query.mod('size',2,0);
    query.where('size').gt(6);
    query.limit(10);
    query.select({word:1,size:1});
    query.exec(function (err,docs) {
        console.log('-------------------分隔符------------');
        console.log('长度是偶数并且大于6的10个单词');
        console.log(docs);
        console.log('换一种格式输出：');
        for(var i in docs){
            //console.log(JSON.stringify(docs[i]));
              console.log(docs[i].toJSON());

        }
    })

});
