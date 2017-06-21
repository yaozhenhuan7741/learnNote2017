/**
 * Created by malei on 2017/6/21.
 */
var MongoClient=require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost',function (err,db) {
    var newDB=db.db('newDB');
    newDB.createCollection('newTable',function (err,table) {
        if(!err)console.log('数据库创建成功');
        db.close();
    })
})