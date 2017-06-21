/**
 * Created by malei on 2017/6/21.
 */
var MongoClient=require('mongodb').MongoClient;
var Server=require('mongodb').Server;

var client=new MongoClient(new Server('localhost',27017,{
    socketOptions:{connectTimeoutMS:500},
    poolSize:5,
    auto_reconnect:true
}),{
    numberOfRetries:3,
    retryMilliSeconds:500
});

client.open(function (err,client) {
    if(err){
        console.log('连接失败');
    }else {
        var db=client.db('testdb');
        if(db){
            console.log('数据库连接成功');
            db.authenticate('dbadmin','123123',function (err,results) {
                if(err){
                    console.log('身份验证失败');
                    client.close();
                    console.log('连接关闭');
                }else {
                    console.log('身份验证成功');
                    db.logout(function (err,result) {
                        if(!err){
                            console.log('注销成功');
                        };
                        client.close();
                        console.log('连接关闭');
                    });
                }
            })
        }
        
    }
});