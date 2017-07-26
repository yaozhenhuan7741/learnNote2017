/**
 * Created by Administrator on 2017/7/26.
 */

var express=require('express');
var app=express();

app.use('/',express.static('./static',{maxAge:60*60*1000})); //默认静态页面在static目录下
app.use('/images',express.static('../images')); //访问/images路径时，默认文件在../images目录下
app.listen(3000,function () {
	console.log('服务器启动');
	console.log('http://127.0.0.1:3000')
});