/**
 * Created by malei on 2017/6/22.
 */
var MongoClient=require('mongodb').MongoClient;
MongoClient.connect('mongodb://localhost',function (err,db) {
    var NewDB=db.db('NewDB');
    NewDB.collection('newCollection',function (err,collection) {
        collection.findOne({name:'zhangsan'},function (err,doc) {
            console.log('更新前:');
            console.log(doc);
        });
        //更新
        collection.update({name:'zhangsan'},{$set:{text:['nodejs']}},function (err,results) {
            //console.log(results);
            //再次查询
            collection.findOne({name:'malei'},function (err,doc) {
                console.log('更新后:');
                console.log(doc);
            });
        });



    });


    setTimeout(function () {
        db.close();
    },3000);
});