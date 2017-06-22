/**
 * Created by malei on 2017/6/22.
 */
var MongoClient=require('mongodb').MongoClient;
MongoClient.connect('mongodb://localhost',function (err,db) {

    var NewDB=db.db('NewDB');
    NewDB.collection('newCollection',function (err,collection) {
        collection.find(function (err,items) {
            items.toArray(function (err,itemArr) {
                console.log('文档数组:');
                console.log(itemArr);
            });
        });
        collection.find(function (err,items) {
            items.each(function (err,item) {
                console.log('单个文档:');
                console.log(item);
            })
        });
        collection.findOne(function (err,doc) {
            console.log('只查找一个:');
            console.log(doc);
        })

        setTimeout(function () {
            db.close();
        },3000);
    })

});

