/**
 * Created by malei on 2017/6/22.
 */

//翻译
    //vowel 元音 aeiou
    //consonant 辅音

var MongoClient=require('mongodb').MongoClient;
MongoClient.connect('mongodb://localhost',function (err,db) {
    var myDB=db.db('words');
    myDB.collection('word_stats',findItems); //使用函数
    setTimeout(function () {
        db.close();
    },1000);
});

function displayWords(msg,cursor,pretty) {
    cursor.toArray(function (err,itemArr) {
        console.log("\n"+msg);
        var wordList=[];
        for(var i=0;i<itemArr.length;i++){
            wordList.push(itemArr[i].word);
        };
        console.log(JSON.stringify(wordList,null,pretty));//这里补充学习了一下JSON.stringify的用法
    });
}

function findItems(err,words) {
    // words.find(function (err,cursor) {
    //     displayWords('查询所有',cursor,1);
    // });   //输出结果太多,先注释掉

    //查询元音开头的单词
    words.find({first:{$in:['a','e','i','o','u']}},function (err,cursor) {
        displayWords('元音开头的单词:',cursor);
    });

    //查询a/b/c开头的单词
    words.find({first:{$in:['a','b','c']}},function (err,cursor) {
        displayWords('abc开头的单词:',cursor);
    });
    //查询长度大于12的单词
    words.find({size:{$gt:12}},function (err,cursor) {
        displayWords('长度大于12的单词:',cursor);
    });

    //查询长度是偶数的单词
    words.find({size:{$mod:[2,0]}},function (err,cursor) {
        displayWords('长度是偶数的单词:',cursor);
    });

    //查询由12个不同的字母组成的单词
    words.find({letters:{$size:12}},function (err,cursor) {
        displayWords('由12个不同的字母组成的单词:',cursor);
    });

    //查询元音开头元音结尾的单词
    words.find({$and:[{first:{$in:['a','e','i','o','u']},last:{$in:['a','e','i','o','u']}}]},function (err,cursor) {
        displayWords('元音开头元音结尾的单词:',cursor);
    });

    //查询包含7个以上元音的单词
    words.find({"stats.vowels":{$gt:6}},function (err,cursor) {
        displayWords('查询包含7个以上元音开的单词:',cursor);
    });

    //查询包含所有5个元音的单词
    words.find({"letters":{$all:['a','e','i','o','u']}},function (err,cursor) {
        displayWords('包含所有5个元音的单词:',cursor);
    });

    //包含其他字符字段的单词
    words.find({"otherChars":{$exists:true}},function (err,cursor) {
        displayWords('包含其他字符字段的单词:',cursor);
    });

    //包含2个其他字符字段的单词
    words.find({"charsets":{$elemMatch:{$and:[{type:'other'},{chars:{$size:2}}]}}},function (err,cursor) {
        displayWords('包含2个其他字符字段的单词:',cursor);
    });

}