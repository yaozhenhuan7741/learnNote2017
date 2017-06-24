/**
 * Created by malei on 2017/6/24.
 */


//翻译
    //vowel 元音 aeiou
    //consonant 辅音

var MongoClient=require('mongodb').MongoClient;
MongoClient.connect('mongodb://localhost',function (err,db) {
    var myDB=db.db('words');
    myDB.collection('word_stats',groupItems()); //使用函数
    setTimeout(function () {
        db.close();
    },1000);
});

function groupItems(err,words) {
    //group(keys,query,initial,reduce,finalize,command,[options],callback);
    words.group(
        ['first','last'],  //keys 按照first和last分组
        {first:'o',last:{$in:['a','e','i','o','u']}}, //query 查询o开头,并且元音结尾的单词
        {"count":0}, //initial 定义一个初始化对象,用于计数
        function (obj,prev) {prev.count++;}, //reduce  每查询到一个文档,计数器自增
        true,  //command 使用默认group(),这里忽略了finalize参数
        function (err,results) {  //回调函数,这里忽略了options参数
            console.log(results);
        }

    );
}