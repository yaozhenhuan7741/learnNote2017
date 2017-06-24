/**
 * Created by malei on 2017/6/23.
 */


var MongoClient=require('mongodb').MongoClient;
var myDB;
MongoClient.connect('mongodb://localhost',function (err,db) {
    myDB=db.db('words');
    myDB.collection('word_stats',function (err,collection) {
        pageResults(err,collection,0,10);
    }); //使用函数

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

function pageResults(err,words,startIndex,pageSize) {

    words.find({first:'v'},{limit:pageSize,skip:startIndex,sort:{words:1,size:1}},function (err,cursor) {
        cursor.count(true,function (err,cursorCount) {
            //console.log('计数:'+cursorCount);
            displayWords('显示第'+startIndex+'页',cursor);
            if(cursorCount==pageSize){
                pageResults(err,words,startIndex+pageSize,pageSize);
            }else {
                myDB.close();
            }
        })
    })
}

