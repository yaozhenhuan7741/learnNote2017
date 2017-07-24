/**
 * Created by Administrator on 2017/5/2.
 */
//动态get服务器http_server_get.js的web客户端

var http=require('http');
var options={
    hostname:'localhost',
    port:3000,
    path:'/'
}
function handleResponse(response) {
    var serverData='';
    response.on('data',function (chunk) {
        serverData+=chunk;
    });
    response.on('end',function () {
        console.log('Response status: ',response.statusCode);
        console.log('Response Headers: ',response.headers);
        console.log(serverData);
        //console.log(response);
    })
}
http.request(options,function (res) {
    handleResponse(res)
}).end();