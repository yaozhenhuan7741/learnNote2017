 /**
 * Created by malei on 2017/6/22.
 */
var MongoClient=require('mongodb').MongoClient;
MongoClient.connect('mongodb://localhost',function (err,db) {
    var NewDB=db.db('NewDB');
    NewDB.collection('newCollection',function (err,collection) {
        //先查询
        collection.find(function (err,items) {
            console.log('修改前:');
            items.each(function (err,doc) {
                console.log(doc);
            });

            //修改
            collection.findAndModify({},[['name',-1]],{$set:{like:'novel'}},{w:1,new:true},function (err,doc) {
                console.log('修改后:');
                console.log(doc);
                db.close();
            })
        });

    })
})