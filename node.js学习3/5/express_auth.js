/**
 * Created by Administrator on 2017/2/4.
 */
var express=require('express');
var basicAuth=require('basic-auth-connect');
var app=express();
app.listen(80);

app.use(basicAuth(function (user,pass) {
    return (user === 'testuser' && pass === '123123');
}));
app.get('/',function (req,res) {
    res.send('Successfull Authentication')
})