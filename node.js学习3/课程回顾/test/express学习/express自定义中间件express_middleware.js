/**
 * Created by Administrator on 2017/7/26.
 */

var express=require('express');
var app=express();

function queryRemover(req,res,next) {
	console.log('请求的url:');
	console.log(req.url);
	req.url=req.url.split('?')[0];  //使用问号分割url，然后取第一部分
	console.log('处理之后的url：');
	console.log(req.url);
	next(); //调用下一个中间件函数
}

app.use(queryRemover);

app.get('/test',function (req,res) {
	res.send('test');
});

app.listen(3000,function () {
	console.log('服务器启动');
	console.log('http://127.0.0.1:3000/test?name=zhangsan');
});
 