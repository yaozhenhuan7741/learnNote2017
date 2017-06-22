/**
 * Created by malei on 2017/6/22.
 */
var MongoClient=require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost',function (err,db) {
    var NewDB=db.db('NewDB');
    NewDB.collections(function (err,collections) {
        console.log('列出所有集合');
        console.log(collections);
        //创建集合
        NewDB.createCollection('newCollection',function (err,collection) {
            //再次查询
            NewDB.collections(function (err,collections) {
                console.log('再次列出:');
                console.log(collections);
                //删除集合
                NewDB.dropCollection('newCollection',function (err,result) {
                    //再次列出
                    NewDB.collections(function (err,collections) {
                        console.log('删除后再次列出:');
                        console.log(collections);
                        setTimeout(function () {
                            db.close();
                        },3000);
                    })
                    
                })
            })
        })
    })
});