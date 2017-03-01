/**
 * Created by Administrator on 2017/1/23.
 */
var http=require('http');
var message=[
    'Hello World',
    'From a basic Node.js server',
    'Take Luck'
];
http.createServer(function (req,res) {
    res.setHeader("Content-type","text/html");
    res.writeHead(200);
    res.write('<html><head><title>Simple http server</title></head>');
    res.write('<body>');
    for (var idx in message){
        res.write('\n<h1>'+message[idx]+'</h1>');
    }

    res.end('\n</body></html>');
}).listen(3000);