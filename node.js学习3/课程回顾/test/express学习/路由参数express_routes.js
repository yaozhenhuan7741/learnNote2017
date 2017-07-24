/**
 * Created by Administrator on 2017/7/24.
 */
var express=require('express');
var url=require('url');
var app=express();
app.listen(3000,function () {
    console.log('服务启动成功');
    console.log('http://127.0.0.1:3000');
    console.log('http://127.0.0.1:3000/find?author=malei&title=nodejs');
    console.log('http://127.0.0.1:3000/book/12:33');
    console.log('http://127.0.0.1:3000/user/9527');
});

app.get('/',function (req,res) {
    res.send('这是首页');
});

app.get('/find',function (req,res) {
    var url_parts=url.parse(req.url, true);
    var query=url_parts.query;
    var response='正在查找书籍,作者:'+query.author+ ' 标题:'+query.title;
    console.log('查询url:'+req.originalUrl);
    console.log(response);
    res.send(response);
});

app.get(/^\/book\/(\w+)\:(\w+)?$/,function (req,res) {
    var response='找到内容,章节:'+req.params[0]+' 页码:'+req.params[1];
    console.log('正则匹配的url:'+req.originalUrl);
    console.log(response);
    res.send(response);
});

app.get('/user/:userid',function (req,res) {
    var response='用户: '+req.param('userid');
    console.log('获取已定义的参数:'+req.params.userid);
    //这里可以使用req.param('xx'),也可以使用req.params.xx;
    console.log('定义参数的url：'+req.originalUrl);
    console.log(response);
    res.send(response);
});

app.param('userid',function (req,res,next,value) {
    console.log('请求的userid:'+value);
    next();
});