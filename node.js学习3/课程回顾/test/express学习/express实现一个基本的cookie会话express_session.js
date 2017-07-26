/**
 *
 * Created by Administrator on 2017/7/26.
 */

var express=require('express');
var cookieParser=require('cookie-parser');
var cookieSession=require('cookie-session');

var app=express();
app.use(cookieParser());  //使用cookie-parser中间件
app.use(cookieSession({
	secret:'fdfdfda',
	cookie:{
		maxAge:1
	}
})); //使用cookie-session中间件


app.get('/library',function (req,res) {
	//console.log('当前客户端的cookies:');
	console.log(req.cookies);
	//console.log('当前客户端的session:');
	console.log(req.session);
	if(req.session.restricted){
		res.send('这是一个受限的访问，第 '+ req.session.restrictedCount+ ' 次.');
	}else {
		res.send('欢迎访问！')
	}
});

app.get('/restricted',function (req,res) {
	req.session.restricted=true;
	if (!req.session.restrictedCount){
		req.session.restrictedCount=1;
	}else {
		req.session.restrictedCount+=1;
	}
	res.redirect('/library');
});
app.listen(3000,function () {
	console.log('服务器启动');
	console.log('http://127.0.0.1:3000/library');
	console.log('http://127.0.0.1:3000/restricted');
})
