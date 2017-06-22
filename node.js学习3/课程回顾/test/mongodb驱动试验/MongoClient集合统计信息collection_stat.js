/**
 * Created by malei on 2017/6/22.
 */
var MongoClient=require('mongodb').MongoClient;
MongoClient.connect('mongodb://localhost',function (err,db) {
    var NewDB=db.db('NewDB');
    NewDB.createCollection('NewCollection',function (err,collection) {
        collection.stats(function (err,stats) {
            console.log(stats);
            db.close();
        })
    })
});