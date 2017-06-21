/**
 * Created by malei on 2017/6/21.
 */

var MongoClient=require('mongodb').MongoClient;

var url='mongodb://dbadmin:123123@localhost:27017/testdb';
var options={
        w:1,
        native_parser:false,
    poolSize:5
};

MongoClient.connect(url,options,function (err,db) {
    if(err){
        console.log('数据库连接失败');
    }else{
        console.log('数据库连接成功');
        db.logout(function (err,result) {
            if(!err){
                console.log('注销成功');
            }
            db.close();
            console.log('连接关闭')
        });
    }
});