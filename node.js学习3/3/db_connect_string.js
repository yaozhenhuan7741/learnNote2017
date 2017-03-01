/**
 * Created by Administrator on 2017/1/24.
 */
var MongoClient=require('mongodb').MongoClient;
var url='mongodb://localhost:27017/test';
var options={
    db:{w:1,native_parser:false},
    server:{poolSize:5,socketOptions:{connectTimeoutMS:500},auto_reconnect:true},
    replSet:{},
    mongos:{}
};

MongoClient.connect(url,options,function (err,db) {
    if(err){
        console.log("Connect failed via connection string");
    }else{
        console.log("Connect via connection string");
        var adminDB=db.admin();
        adminDB.listDatabases(function (err,databases) {
            console.log("databases:"+databases);
        });
        adminDB.serverStatus(function (err,status) {
            console.log("status: "+status);
        })

        var newDB=db.db("newDB");
        newDB.createCollection("tttt",function (err,collection) {
            if(!err){
                console.log("New database and collection created")
            }else{
                console.log("error: "+err)
            }
        })
        db.logout(function (err,result) {
            if(!err){
                console.log("Logged out via connect String...");
            }
            db.close();
            console.log("connect closed....");
        })
    }
})