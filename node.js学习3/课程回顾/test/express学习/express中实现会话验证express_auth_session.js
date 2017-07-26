/**
 * Created by Administrator on 2017/7/26.
 */

var express=require('express');
var bodyParser=require('body-parser');
var cookieParser=require('cookie-parser');
var session=require('express-session');
var crypto=require('crypto');


//对密码加密
function hashPW(pwd) {
	return crypto.createHash('sha256').update(pwd).digest('base64').toString();
}

var app=express();

app.use(bodyParser());  //用于处理post请求，保存为req.body
app.use(cookieParser()); //用于处理cookie，保存为req.cookies
app.use(session({
	resave:true,
	saveUninitialized:true,
	secret:'fdfdd'

}));    //用于处理会话，保存为req.session

app.get('/restricted',function (req,res) {
	if (req.session.user){
		var resHtml='<h2>' +req.session.success +	'</h2>' +
			'<p> 已经进入到受限页面</p><br>' +
			'<a href="/logout">登出</a>';
		res.send(resHtml);
	}else {
		req.session.error ='登录失败';
		res.redirect('/login');
	}
});

app.get('/logout',function (req,res) {
	req.session.destroy(function () {
		res.redirect('/login');
	})
});

app.get('/login',function (req,res) {
	var resHtml='<form method="post">' +
		'用户名:<input type="text" name="username"><br>' +
		'密码: <input type="test" name="password" ><br>' +
		'<input type="submit" value="提交" >' +
		'</form>';

	if(req.session.user){
		res.redirect('/restricted');
	}else if (req.session.error){
		resHtml+="<h2>" +req.session.error+			"</h2>"
	}
	res.type('html');
	res.send(resHtml);

});

app.post('/login',function (req,res) {
	var user={
		name:req.body.username,
		password:hashPW(req.body.password)
	};

	if (user.name =='admin' && user.password.toString() == hashPW('123123')){
		req.session.regenerate(function () {
			req.session.user = user;
			req.session.success='登录成功:'+user.name;
			res.redirect('/restricted');
		})
	}else {
		req.session.regenerate(function () {
			req.session.error = '认证失败';
			res.redirect('/login');
		});

	}

});

app.listen(3000,function () {
	console.log('服务器启动');
	console.log('http://127.0.0.1:3000/login');
	console.log('http://127.0.0.1:3000/restricted');
});