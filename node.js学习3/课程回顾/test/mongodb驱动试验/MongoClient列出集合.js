/**
 * Created by malei on 2017/6/21.
 */
var MongoClient=require('mongodb').MongoClient;
MongoClient.connect('mongodb://localhost',function (err,db) {
    var testDB=db.db('testdb');

    testDB.collections(function (err,collections) {
        //console.log(err);
        //console.log(collections);
        for(var i in collections){
            console.log(collections[i].s.name);
        }
        
        db.close();
    });

   
});