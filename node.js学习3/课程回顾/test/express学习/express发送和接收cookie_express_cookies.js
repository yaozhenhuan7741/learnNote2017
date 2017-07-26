/**
 * Created by Administrator on 2017/7/26.
 */

var express=require('express');
var cookieParser=require('cookie-parser');

var app=express();
app.use(cookieParser());

app.get('/',function (req,res) {
	console.log(req.cookies);
	if (!req.cookies.hasVisited){
		res.cookie('hasVisited','1',{
			maxAge:60*60*1000,
			httpOnly:true,
			path:'/'
		});
	}
	res.send('Send Cookie');
});

app.listen(3000,function () {
	console.log('服务器启动');
	console.log('http://127.0.0.1:3000');
	console.log('检查一下页面的cookie是否有hasVisited属性');
});