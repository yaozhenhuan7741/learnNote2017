/**
 * Created by Administrator on 2017/2/4.
 */
var express=require('express');
var bodyParser=require('body-parser');
var cookieParser=require('cookie-parser');
var session=require('express-session');
var crypto=require('crypto'); //加密功能

function hashPW(passwd) {
    return crypto.createHash('sha256').update(passwd).digest('bash64').toString();
    //将密码加密
}

var app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('FJDKSFJ'));
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }, resave: true, saveUninitialized: true }));

app.get('/restricted',function (req,res) {
    if(req.session.user){
        res.send('<h2>'+req.session.success+'</h2>'+
        '<p> You have entered the restricted section</p><br>'+
         '<a href="/logout">logout</a> ');
    }else{
        req.session.error='Access denied';
        res.redirect('/login');
    }
});

app.get('/logout',function (req,res) {
    req.session.destroy(function () {
        res.redirect('/login');
    })
});

app.get('/login',function (req,res) {
    var response='<form method="POST">' +
        'Username: <input type="text" name="username"><br>' +
        'Password: <input type="password" name="password"><br>' +
        '<input type="submit" value="submit"></form>';
    if(req.session.user){
        res.redirect('/restricted');
    }else if(req.session.error){
        response+='<h2>'+req.session.error+'</h2>';
    }
    res.type('html');
    res.send(response);
});

app.post('/login',function (req,res) {
    //模拟一个从数据库中取到的用户
    var user={name:req.body.username,password:hashPW("123123")};
    if(user.password === hashPW(req.body.password.toString())){
        req.session.regenerate(function () {
            req.session.user=user;
            req.session.success='Authenticated as '+user.name;
            res.redirect('/restricted')
        });
    }else {
        req.session.regenerate(function () {
            req.session.error='Authetication failed.';
            res.redirect('/login');
        });
    }
});
app.listen(80);