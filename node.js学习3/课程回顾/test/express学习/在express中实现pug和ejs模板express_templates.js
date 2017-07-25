/**
 * Created by Administrator on 2017/7/25.
 */

//pug/jade模板和ejs模板

var express=require('express');
var pug=require('pug');
var ejs=require('ejs');

var app=express();

app.set('views','./views'); //设置默认模板路径

app.set('view engine','pug'); //设置视图引擎的默认扩展名

app.engine('pug',pug.__express);  //为pug扩展名注册pug.__express处理函数
app.engine('html',ejs.renderFile); //为html扩展名注册ejs.renderFile处理函数

app.listen(3000,function () {
    console.log('服务器启动成功');
    console.log('http://127.0.0.1:3000/pug');
    console.log('http://127.0.0.1:3000/html1');
    console.log('http://127.0.0.1:3000/html2');
});
//设置本地对象
app.locals.uname='malei';
app.locals.age = 29;

console.log(app.get('views'));
console.log(app.get('view engine'));
//console.log(app.locals);

app.get('/pug',function (req,res) {
    res.render('user_pug',{title:'pug'});  //不带扩展名，使用默认的pug
});

app.get('/html1',function (req,res) {
    res.render('user_html.html',{title:'html1'});  //指定扩展名为html
});

app.get('/html2',function (req,res) {
    app.render('user_html.html',{title:'html2'},function (err,renderedData) {  //使用app.render编译模板，然后用res.send发送到客户端
        res.send(renderedData);
    })
});