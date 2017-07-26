/**
 * Created by Administrator on 2017/7/26.
 */

var express=require('express');
var basicAuth=require('basic-auth-connect');
var app=express();

var auth=basicAuth(function (user,pass) {
	console.log('登录认证');
	return (user === 'malei1' && pass === '123123');
});

app.get('/library',function (req,res) {
	res.send('欢迎！这个页面无需登录');
});

app.get('/restricted',auth, function (req,res) {
	res.send('登录成功');
});

app.listen(3000,function () {
	console.log('服务器启动');
	console.log('http://127.0.0.1:3000/library');
	console.log('http://127.0.0.1:3000/restricted');
})