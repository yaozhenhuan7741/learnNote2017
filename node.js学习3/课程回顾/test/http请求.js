/**
 * Created by Administrator on 2017/5/2.
 */
//http.ClientRequest
//http请求
var http=require('http');
var options={
    hostname:'www.baidu.com',
    path:'/',
    port:'80',
    method:'GET'
};
var req=http.request(options,function (response) {
    var str="";
    response.on('data',function (chunk) {
        str+=chunk;
    });
    response.on('end',function () {
        console.log(str);
    })
});
req.end();