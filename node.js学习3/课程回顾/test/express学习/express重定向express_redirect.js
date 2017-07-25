/**
 * Created by Administrator on 2017/7/25.
 */
 
var express=require('express');
var app=express();

app.listen(3000,function () {
    console.log('服务器启动成功');
    console.log('http://127.0.0.1:3000/baidu');
    console.log('http://127.0.0.1:3000/first');
    console.log('http://127.0.0.1:3000/level/A');
});
app.get('/baidu',function (req,res) {
    res.redirect('http://www.baidu.com');
});
app.get('/first',function (req,res) {
    res.redirect('/second');
});
app.get('/second',function (req,res) {
    res.send('我是second');
});
app.get('/level/A',function (req,res) {
    res.redirect('./B');
});
app.get('/level/B',function (req,res) {
    res.send('我是levelB');
});