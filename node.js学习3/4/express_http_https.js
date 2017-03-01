/**
 * Created by Administrator on 2017/2/4.
 */
var express=require('express');
var https=require('https');
var http=require('http');
var fs=require('fs');
var app=express();

var options={
    host:'127.0.0.1',
    key:fs.readFileSync('ssl/server.pem'),
    cert:fs.readFileSync('ssl/server.crt')
};
http.createServer(app).listen(80);
https.createServer(options,app).listen(443);
app.get('/',function (req,res) {
    res.send('Hello Word from Express')
});
app.all('*',function (req,res) {
    console.log(req.url);
});