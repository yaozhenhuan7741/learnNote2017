/**
 * Created by Administrator on 2017/7/26.
 */

var express=require('express');
var bodyParser=require('body-Parser');
var app=express();
app.use(bodyParser());

app.get('/',function (req,res) {
	var resHtml='<form method="post">' +
		'姓名:<input type="text" name="name">' +
		'年龄:<input type="text" name="age"> ' +
		'<input type="submit" value="提交"> ' +
		'</form>';
	res.send(resHtml);
});
app.post('/',function (req,res) {
	var resHtml="<div>" +
		"你好:" +req.body.name+"<br/>"+
		"你的年龄是:"+req.body.age+"<br/>"+
		"</div>";
	res.type('html');
	res.end(resHtml);
	console.log(req.body);
});

app.listen(3000,function () {
	console.log('服务器启动');
	console.log('http://127.0.0.1:3000')
});