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
            doc.date=Date.now();
            collection.save(doc,function (err,result) {
                collection.findOne({name:'zhangsan'},function (err,doc) {
                    console.log('22222222222');
                    console.log(doc);
                    db.close();

                });
            })

        });
    })
})