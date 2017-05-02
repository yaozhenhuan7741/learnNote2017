/**
 * Created by Administrator on 2017/5/2.
 */
//客户端
var http=require('http');
var options={
    host:'127.0.0.1',
    path:'/',
    port:3000,
    method:'POST'
};
function readJSONResponse(response) {
    var responseData='';
    response.on('data',function (chunk) {
        responseData+=chunk;
    })
    response.on('end',function () {
        var dataObj=JSON.parse(responseData);
        console.log('Raw Response: '+responseData);
        console.log('message: '+dataObj.message);
        console.log('Question: '+dataObj.question);
    })
};

var req=http.request(options,readJSONResponse);
req.write('{"name":"malei","occupation":"Burglar"}');
req.end();