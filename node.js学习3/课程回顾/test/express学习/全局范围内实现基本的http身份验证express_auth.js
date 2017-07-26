/**
 * Created by Administrator on 2017/7/26.
 */

var express=require('express');
var basicAuth=require('basic-auth-connect');
var app=express();

app.listen(3000,function () {
	console.log('服务器启动');
	console.log('http://127.0.0.1:3000');
});

app.use(basicAuth(function (user,pass) {
	return (user === 'malei' && pass === '123123'); //验证用户名密码是否是malei/123123
}));

app.get('/',function (req,res) {
	res.send('登录成功')
});