/**
 * Created by Administrator on 2017/7/24.
 */

var express=require('express');
var url=require('url');
var app=express();

app.listen(3000,function () {
    console.log('服务器启动成功.');
    console.log('http://127.0.0.1:3000');
    console.log('http://127.0.0.1:3000/error');
});

app.get('/',function (req,res) {
    var response='<html><head><title>Simple Send</title></head>' +
        '<body><h1>hello from express</h1></body></html>';
    res.status(200);
    res.set({
        'Content-Type':'text/html',
        'Content-Length':response.length
    });

    res.send(response);
    console.log('Response Finished? '+ res.finished);
    console.log('Headers Sent : ');
    console.log(res.headersSent);
});

app.get('/error',function (req,res) {
    res.status(400);
    res.send('This is a bad request.')
});