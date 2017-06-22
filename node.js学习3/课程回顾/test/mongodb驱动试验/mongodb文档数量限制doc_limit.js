/**
 * Created by malei on 2017/6/22.
 */

//翻译
    //vowel 元音 aeiou
    //consonant 辅音

var MongoClient=require('mongodb').MongoClient;
MongoClient.connect('mongodb://localhost',function (err,db) {
    var myDB=db.db('words');
    myDB.collection('word_stats',limitItems); //使用函数
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

function limitItems(err,words) {

    //查询长度是偶数的单词,限制数量为5
    words.find({size:{$mod:[2,0]}},{limit:5},function (err,cursor) {
        displayWords('长度是偶数的单词:',cursor);
    });


}