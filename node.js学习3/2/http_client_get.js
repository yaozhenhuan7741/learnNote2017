/**
 * Created by Administrator on 2017/1/23.
 */
var http=require('http');
var options={
    hostname:'localhost',
    port:3000
};
function handleResponse(response) {
    var serverData='';
    response.on('data',function (chunk) {
        serverData+=chunk;
    });
    response.on('end',function () {
        console.log("Response Status:",response.statusCode);
        console.log("Response Header:",response.headers);
        console.log(serverData);
    })
}
http.request(options,function (response) {
    handleResponse(response)
}).end();