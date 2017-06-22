/**
 * Created by malei on 2017/6/22.
 */

var MongoClient=require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost',function (err,db) {
    var NewDB=db.db('NewDB');
    NewDB.collection('newCollection',function (err,collection) {
        collection.find(function (err,items) {
            console.log('前:');
            items.forEach(function (item) {
                console.log(item);
            });

            collection.findAndRemove({name:'zhangsan'},[['name',-1]],{w:1},function (err,result) {
                console.log('删除:'+result);
                collection.find(function (err,items) {
                    console.log('后:');
                    items.forEach(function (item) {
                        console.log(item);
                    });
                });
            });

            setTimeout(function () {
                db.close();

            },300);

        });
    })
});