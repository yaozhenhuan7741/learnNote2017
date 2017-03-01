/**
 * Created by Administrator on 2017/2/4.
 */
var express=require('express');
var url=require('url');
var app=express();

app.listen(80);
app.get('/baidu',function (req,res) {
    res.redirect('http://www.baidu.com');
});
app.get('/first',function (req,res) {
    res.redirect('/second');
});
app.get('/second',function (req,res) {
    res.send('Response from second');
});
app.get('/level/A',function (req,res) {
    res.redirect('../B');
});
app.get('/level/B',function (req,res) {
    res.send('Response from level B')
})