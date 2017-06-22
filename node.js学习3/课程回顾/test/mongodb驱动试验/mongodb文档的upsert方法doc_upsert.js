/**
 * Created by malei on 2017/6/22.
 */

var MongoClient=require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost',function (err,db) {
    var NewDB=db.db('NewDB');
    NewDB.collection('newCollection',function (err,collection) {
        collection.find(function (err,items) {
            console.log('前:')
            items.forEach(function (item) {
                console.log(item);
            });

            collection.update({name:'wangwu'},{$set:{age:2}},{upsert:true},function (err,results) {
               //console.log(results);
               collection.findOne({name:'wangwu'},function (err,doc) {
                   console.log('后');
                   console.log(doc);
               })
            });

            setTimeout(function () {
                db.close();

            },300);

        });
    })
})