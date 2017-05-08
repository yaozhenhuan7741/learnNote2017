/**
 * Created by Administrator on 2017/5/8.
 */
//实现一个http集群之客户端
var http=require('http');
var options={
    port:8080
};

function sendRequest() {
    http.request(options,function (res) {
        var serverData='';
        res.on('data',function (chunk) {
            serverData+=chunk;
        });
        res.on('end',function () {
            console.log(serverData);
        })
    }).end();
}

for (var i=0;i<10;i++){
    console.log('Sending Request');
    sendRequest();
}