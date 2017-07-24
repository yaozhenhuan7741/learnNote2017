/**
 * Created by Administrator on 2017/7/24.
 */

var express=require('express');
var url=require('url');
var app=express();

app.listen(3000,function () {
    console.log('服务器启动.');
    console.log('http://127.0.0.1:3000/json');
    console.log('http://127.0.0.1:3000/error');
    console.log('http://127.0.0.1:3000/jsonp?cb=handleJSONP');
});

app.get('/json',function (req,res) {
    app.set('json spaces',4);
    res.json({name:'malei',age:29,like:['novel','learn','read','coding']});
});

app.get('/error',function (req,res) {
    res.json(500,{status:false, message:'Server error'});
});

app.get('/jsonp',function (req,res) {
    app.set('jsonp callback name','cb');
    res.jsonp({name:'malei',age:29,like:['novel','learn','aaa']})
});