/**
 * Created by Administrator on 2017/7/24.
 */

var express=require('express');
var app=express();
app.listen(3000,function () {
    console.log('http://127.0.0.1:3000/user/9527?author=malei&title=nodejs#hash');
});
app.get('/user/:userid',function (req,res) {
    //console.log(req);
    console.log('url: '+req.originalUrl);
    console.log('protocol: '+req.protocol);
    console.log('ip:'+req.ip);
    console.log('path:'+req.path);
    console.log('host: '+req.host);
    console.log('method: '+req.method);
    console.log('query:'+JSON.stringify(req.query));
    console.log('Fresh: '+req.fresh);
    console.log('Stale: '+req.stale);
    console.log('Secure:'+req.secure);
    console.log('utf8:'+req.acceptsCharset('utf8'));
    console.log('connection: '+req.get('connection'));
    console.log('headers: '+JSON.stringify(req.headers, null, 2));
    console.log('-----------')
    res.send('hello');
});