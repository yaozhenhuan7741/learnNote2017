/**
 * Created by malei on 2017/6/22.
 */
var MongoClient=require('mongodb').MongoClient;
MongoClient.connect('mongodb://localhost',function (err,db) {
    var NewDB=db.db('NewDB');
    NewDB.dropCollection('newCollection');
    NewDB.createCollection('newCollection',function (err,collection) {
        addObject(collection,{name:'zhangsan',age:29});
        addObject(collection,{name:'lisi',age:26});
    });
    setTimeout(function () {
        db.close();
    },3000);
});

function addObject(collection,object) {
    collection.insert(object,function (err,result) {
        if(!err){
            console.log('插入成功:');
            console.log(result);
        }
    });
}