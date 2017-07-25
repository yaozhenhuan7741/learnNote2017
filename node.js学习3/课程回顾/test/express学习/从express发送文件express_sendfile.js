/**
 * Created by Administrator on 2017/7/25.
 */

var express=require('express');
var app=express();
app.listen(3000,function () {
    console.log('服务器启动成功');
    console.log('http://127.0.0.1:3000/image');
    console.log('http://127.0.0.1:3000/image2');
});

app.get('/image',function (req,res) {
    res.sendfile('1.jpg',{
        maxAge:1, //24*60*60*1000,
        root:'../images/'

    },function (err) {
        if (err){
            console.log('发送图片失败');
        }else {
            console.log('发送图片成功');
        }
    })
});

app.get('/image2',function (req,res) {
    res.download('../images/1.jpg','new.jpg',function (err) {
        if (err){
            console.log('发送图片失败');
        }else {
            console.log('发送图片成功');
        }
    })
});