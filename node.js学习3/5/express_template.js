/**
 * Created by Administrator on 2017/2/4.
 */
var express=require('express');
var jade=require('jade');
var ejs=require('ejs');
var app=express();

app.set('views','./views');
app.set('view engine','jade');
app.engine('jade',jade.__express);//注册扩展名jade到jade引擎
app.engine('html',ejs.renderFile);//注册扩展名html到ejs引擎

app.listen(80);

//设置本地变量------教程中使用app.locals()函数，报错，express 4.x中修改了locals接口
app.locals={
    uname:'Brad',
    vehicle:'Jeep',
    terrain:'Mountains',
    climate:'Desert',
    location:'aaaaaaaaaaaaaa'
};

//路由
app.get('/jade',function (req,res) {
    res.render('user_jade');
});
app.get('/ejs',function (req,res) {
    app.render('user_ejs.html',function (err,renderdData) {
        res.send(renderdData);
    });
});