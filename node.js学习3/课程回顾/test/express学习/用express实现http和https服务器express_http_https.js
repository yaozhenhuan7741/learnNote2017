/**
 * Created by Administrator on 2017/7/24.
 */

var express=require('express');
var https=require('https');
var http=require('http');
var fs=require('fs');

var app=express();
var options={
    host:'127.0.0.1',
    key:fs.readFileSync('../ca/server.pem'),
    cert:fs.readFileSync('../ca/server.crt')
};

http.createServer(app).listen(80,function () {
    console.log('http服务启动成功')
});

https.createServer(options,app).listen(443,function () {
    console.log('https服务启动成功')
});

//路由
app.get('/',function (req,res) {
    res.send('hello from express');
});
