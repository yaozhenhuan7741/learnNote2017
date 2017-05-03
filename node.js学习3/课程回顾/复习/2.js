/**
 * Created by Administrator on 2017/5/3.
 */
var http=require('http');
var zlib = require('zlib');

var headers = {
    "accept-charset" : "ISO-8859-1,utf-8;q=0.7,*;q=0.3",
    "accept-language" : "en-US,en;q=0.8",
    "accept" : "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "user-agent" : "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/537.13+ (KHTML, like Gecko) Version/5.1.7 Safari/534.57.2",
    "accept-encoding" : "gzip,deflate",
};

var options={
    host:'wthrcdn.etouch.cn',
    path:'/weather_mini?city=aa',
    method:'GET',
    headers:headers
}

function handleResponse(response) {
    var arr=[];
    response.on('data',function (chunk) {
        arr.push(chunk);
        //console.log(chunk);
    });
    response.on('end',function () {
        console.log(arr);
        var buffer=Buffer.concat(arr);
        console.log(buffer.length,buffer);

    })
};
http.request(options,function (res) {
    handleResponse(res);
}).end();