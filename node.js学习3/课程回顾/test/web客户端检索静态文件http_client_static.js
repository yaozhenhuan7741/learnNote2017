/**
 * Created by Administrator on 2017/5/2.
 */
//一个基本的web客户端检索静态文件
var http=require('http');
var options={
    hostname:'localhost',
    port:3000,
    path:'/2.html'
};
function handleResponse(response) {
    var serverData='';
    response.on('data',function (chunk) {
        serverData+=chunk;
    });
    response.on('end',function () {
        console.log(serverData);
    })
};
http.request(options,function (res) {
    handleResponse(res);
}).end();