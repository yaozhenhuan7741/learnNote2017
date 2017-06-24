/**
 * Created by malei on 2017/6/24.
 */
//聚合表达式

var MongoClient = require('mongodb').MongoClient;

MongoClient.connect("mongodb://localhost", function (err, db) {
    var myDB = db.db('words');
    myDB.collection('word_stats', aggregateItems); //使用函数
    setTimeout(function () {
        db.close();
    }, 1000);
});

function aggregateItems(err, words) {

    //第一个例子
    words.aggregate(
        //operation
        [
            {$match: {first: {$in: ['a', 'e', 'i', 'o', 'u']}}},//匹配元音开头的词
            {
                $group: {
                    _id: "$first", //以首字母作为id
                    largest: {$max: "$size"}, //以单词大小字段最大值为largest
                    smallest: {$min: "$size"},//最小
                    total: {$sum: 1}
                }
            },//分组
            {$sort: {_id: 1}} //排序
        ]
        ,
        //options
        //{},  //没有设置options
        //callback
        function (err, results) {
            console.log('元音开头的,最长/最短以及单词数量:')
            console.log(results);
        }); //第一个例子结束

    //第二个例子,取5个长度是4的单词
    words.aggregate(
        [{$match:{size:4}},{$limit:5},{$project:{_id:"$word",stats:1}}],
        function (err,results) {
            console.log('5个长度是4的单词的状态');
            console.log(results);
        }
    );

    //第三个例子
    words.aggregate(
        [
            {$group:{_id:"$first",average:{$avg:"$size"}}},
            {$sort:{average:-1}},
            {$limit:5}
        ],
        function (err,results) {
            console.log('不同字母开头的,平均单词长度最长的5个字母:')
            console.log(results);
        }
    );
}