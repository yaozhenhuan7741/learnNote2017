/**
 * Created by Administrator on 2017/7/28.
 */
var express=require('express');
var app=express();

app.use(express.static('./static'));  //静态文件默认从./static目录
app.use('/images',express.static('../images'));  //路由/images从../images目录
app.use('/lib',express.static('./lib')); //路由lib从./lib目录

app.listen(3000,function () {
	console.log('服务器启动');
	console.log('http://127.0.0.1:3000/first.html')
});