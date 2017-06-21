/**
 * Created by malei on 2017/6/21.
 */
var MongoClient=require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost',function (err,db) {

    //列出数据库
    var adminDB=db.admin(); //切换为admin对象,不能用db.db(admin);
    adminDB.listDatabases(function (err,dbs) {
        console.log('所有的数据库:');
        console.log(dbs);
    });

    var newDB=db.db('newDB'); //切换数据库
    newDB.createCollection('newTables',function (err,table) {
        if(!err){
            console.log('新的数据库和表创建成功');   //只创建空库,是不会被mongodb保存的
            adminDB.listDatabases(function (err,dbs) {
                console.log('创建新库后,再次列出所有数据库');
                console.log(dbs);

                newDB.dropDatabase(function (err,result) {
                    if(!err){
                        //console.log('数据库删除成功');
                        setTimeout(function () {
                            adminDB.listDatabases(function (err,dbs) {
                                console.log('删除数据库后,再次列出所有数据库');
                                console.log(dbs);
                                var found=false;
                                console.log('单独列出每个库:');
                                for(var i in dbs.databases){
                                    console.log(dbs.databases[i]);
                                    if(dbs.databases[i].name=='newDB') found=true;
                                }
                                if(!found){
                                    console.log('删除成功');
                                }
                                db.close();
                            })
                        },3000)
                    }
                })
            });

        }
    })

});