/**
 * Created by Administrator on 2017/1/24.
 */

//此方法未执行成功！！！！！！！！！！
var MongoClient=require('mongodb').MongoClient;
var Server=require('mongodb').Server;
var client = new MongoClient(new Server('localhost', 27017, {
    socketOptions: { connectTimeoutMS: 500 },
    poolSize: 5,
    auto_reconnect: true
}, {
    numberOfRetries: 3,
    retryMiliSeconds: 500
}));
client.open(function (err,client) {
    if(err){
        console.log("Connect Failed Via Client Object.");
    }else {
        var db = client.db('test');
        if(db){
            console.log("Connect via Client Object...");
            db.logout(function (err,result) {
                console.log("result:"+result);
                if(!err){
                    console.log("Logout via client object");
                }
                client.close();
                console.log('connect closed...')
            });
        }
    }
});