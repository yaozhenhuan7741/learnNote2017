/**
 * Created by Administrator on 2017/2/4.
 */
var express=require('express');
var basicAuth=require('basic-auth-connect');
var app=express();
var auth=basicAuth(function (user,pass) {
    return (user === 'testuser' && pass === '123123');
})



app.get('/library',function (req,res) {
    res.send('welcome to  library')
});

app.get('/restricted',auth,function (req,res) {
    res.send('Welcome to the restricted section.')
})
app.listen(80);