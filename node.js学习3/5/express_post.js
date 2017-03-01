/**
 * Created by Administrator on 2017/2/4.
 */
var express=require('express');
var bodyParser=require('body-parser');
var app=express();
//app.use(bodyParser());  //此方法已被弃用
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/',function (req,res) {
    var response='<form method="POST">'+
            'First:<input type="text" name="first"><br>' +
        'Last:<input type="text" name="last"><br>' +
        '<input type="submit" value="提交"></form>';
    res.send(response);
});
app.post('/',function (req,res) {
    var response='<form method="POST">'+
        'First:<input type="text" name="first"><br>' +
        'Last:<input type="text" name="last"><br>' +
        '<input type="submit" value="提交"></form>' +
        '<h1>Hello' +req.body.first+ '</h1>';
     res.type('html');
     res.end(response);
     console.log(req.body);
});
app.listen(80);