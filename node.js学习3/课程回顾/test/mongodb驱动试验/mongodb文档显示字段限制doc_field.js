/**
 * Created by malei on 2017/6/23.
 */
var MongoClient=require('mongodb').MongoClient;
MongoClient.connect('mongodb://localhost',function (err,db) {
    var myDB=db.db('words');
    myDB.collection('word_stats',limitFields); //使用函数
    setTimeout(function () {
        db.close();
    },1000);
});



function limitFields(err,words) {

    //不显示charsets字段
    words.findOne({word:'the'},{fields:{charsets:0}},function (err,doc) {
        console.log(doc);
    });

    //只显示部分字段
    words.findOne({word:'the'},{fields:{word:1,size:1,stats:1}},function (err,doc) {
        console.log(doc);
    });

}