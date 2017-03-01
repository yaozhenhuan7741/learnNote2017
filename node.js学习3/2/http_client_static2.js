/**
 * Created by Administrator on 2017/1/23.
 */
var http=require('http');
var options={
    hostname:'www.biquge.lu',
    port:80,
    path:'/book/424/9787412.html',
};
function handleResponse(response) {
    var serverData='';
    response.on('data',function (chunk) {
        serverData+=chunk;
    });
    response.on('end',function () {
        //console.log(serverData)
        console.log(serverData)
    });
};
http.request(options,function (response) {
    handleResponse(response);
}).end();