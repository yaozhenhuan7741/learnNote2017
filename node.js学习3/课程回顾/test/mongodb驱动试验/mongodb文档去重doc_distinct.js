/**
 * Created by malei on 2017/6/24.
 */
//翻译
    //vowel 元音 aeiou
    //consonant 辅音

var MongoClient=require('mongodb').MongoClient;
MongoClient.connect('mongodb://localhost',function (err,db) {
    var myDB=db.db('words');
    myDB.collection('word_stats',distinctValues); //使用函数
    setTimeout(function () {
        db.close();
    },1000);
});

function distinctValues(err,words) {
    //不同的单词长度
    words.distinct('size',function (err,values) {
        console.log('单词长度:');
        console.log(values);
    });
    //u结尾,但first不同
    words.distinct('first',{last:'u'},function (err,values) {
        console.log('u结尾的单词的首字母');
        console.log(values);
    });
    //不同的元音个数
    words.distinct('stats.vowels',function (err,values) {
        console.log('不同的元音个数:');
        console.log(values);
    })
}