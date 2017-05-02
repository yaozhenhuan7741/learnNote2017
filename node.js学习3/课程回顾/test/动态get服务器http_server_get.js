/**
 * Created by Administrator on 2017/5/2.
 */
//实现基本的get web 服务器

var http=require('http');
var message=[
    'Hello world',
    'From a basic Node.js server',
    'take luck'
];

var app=http.createServer(function (req,res) {
    res.setHeader('Content-Type','text/html');
    res.writeHead(200,'Success',{a:'fdfdfdf'});
    res.write('<html><head><title>Simple Http Server</title></head>');
    res.write('<body>');
    for (var i in message){
        res.write('\n<h1>'+message[i]+'</h1>');
    }
    res.end('\n</body></html>');
});
app.listen(3000);