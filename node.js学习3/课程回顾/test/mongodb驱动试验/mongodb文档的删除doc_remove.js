/**
 * Created by malei on 2017/6/22.
 */
var MongoClient=require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost',function (err,db) {
    var NewDB=db.db('NewDB');
    NewDB.collection('newCollection',function (err,collection) {
        collection.findOne({name:'malei'},function (err,doc) {
            console.log('1111111111111')
            console.log(doc);

            collection.remove({name:'malei'},function (err,result) {
                collection.findOne({name:'malei'},function (err,doc) {
                    console.log(doc);
                    db.close();
                })
            })
        });
    })
})