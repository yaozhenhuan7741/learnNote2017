/**
 * Created by malei on 2017/6/21.
 */
var MongoClient=require('mongodb').MongoClient;
MongoClient.connect('mongodb://localhost',function (err,db) {

   var adminDB=db.admin();
   adminDB.serverStatus(function (err,status) {
       console.log(err);
       console.log(status);
       db.close();
   })

});