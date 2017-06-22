/**
 * Created by malei on 2017/6/22.
 */


//翻译
    //vowel 元音 aeiou
    //consonant 辅音

var MongoClient=require('mongodb').MongoClient;
MongoClient.connect('mongodb://localhost',function (err,db) {
    var myDB=db.db('words');
    myDB.collection('word_stats',countItems); //使用函数
    setTimeout(function () {
        db.close();
    },1000);
});



function countItems(err,words) {
    words.count(function (err,count) {
        console.log('查询所有',count);
    });   //输出结果太多,先注释掉

    //查询元音开头的单词
    words.count({first:{$in:['a','e','i','o','u']}},function (err,count) {
        console.log('元音开头的单词:',count);
    });

    //查询a/b/c开头的单词
    words.count({first:{$in:['a','b','c']}},function (err,count) {
        console.log('abc开头的单词:',count);
    });
    //查询长度大于12的单词
    words.count({size:{$gt:12}},function (err,count) {
        console.log('长度大于12的单词:',count);
    });

    //查询长度是偶数的单词
    words.count({size:{$mod:[2,0]}},function (err,count) {
        console.log('长度是偶数的单词:',count);
    });

    //查询由12个不同的字母组成的单词
    words.count({letters:{$size:12}},function (err,count) {
        console.log('由12个不同的字母组成的单词:',count);
    });

    //查询元音开头元音结尾的单词
    words.count({$and:[{first:{$in:['a','e','i','o','u']},last:{$in:['a','e','i','o','u']}}]},function (err,count) {
        console.log('元音开头元音结尾的单词:',count);
    });

    //查询包含7个以上元音的单词
    words.count({"stats.vowels":{$gt:6}},function (err,count) {
        console.log('查询包含7个以上元音开的单词:',count);
    });

    //查询包含所有5个元音的单词
    words.count({"letters":{$all:['a','e','i','o','u']}},function (err,count) {
        console.log('包含所有5个元音的单词:',count);
    });

    //包含其他字符字段的单词
    words.count({"otherChars":{$exists:true}},function (err,count) {
        console.log('包含其他字符字段的单词:',count);
    });

    //包含2个其他字符字段的单词
    words.count({"charsets":{$elemMatch:{$and:[{type:'other'},{chars:{$size:2}}]}}},function (err,count) {
        console.log('包含2个其他字符字段的单词:',count);
    });

}