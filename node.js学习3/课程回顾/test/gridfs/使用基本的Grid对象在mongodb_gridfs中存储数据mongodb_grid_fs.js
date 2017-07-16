/**
 * Created by malei on 2017/7/16.
 */

//注:高版本的mongodb驱动,已经不再支持此方法,使用1.4执行成功
var MongoClient=require('mongodb').MongoClient;
var GridStore=require('mongodb').GridStore;
var Grid=require('mongodb').Grid;

MongoClient.connect('mongodb://localhost',function (err,db) {

    var grid=new Grid(db,'fs');
    console.log(grid);
    var data=new Buffer('hello world');
    console.log('将要保存的数据:');
    console.log(data.toString());
    grid.put(data,{_id:'test.file'},function (err,results) {
        console.log('存储结果:');
        console.log(results);
        grid.get("test.file",function (err,data) {
            console.log('删除前查询:');
            console.log(data.toString());
            grid.delete("test.file",function (err,results) {
                console.log('删除结果:');
                console.log(results);
                db.close();
            })
        })
    })
})