/**
 * Created by Administrator on 2017/5/3.
 */
//tcp套接字服务器端
var net=require('net');
var server=net.createServer(function (client) {
    console.log('客户端连接成功');
    console.log('  local=%s:%s',client.localAddress,client.localPort);
    console.log('  remote=%s:%s',client.remoteAddress,client.remotePort);

    client.setTimeout(500);
    client.setEncoding('utf8');
    client.on('data',function (data) {
        console.log('接收到数据，从 %d:%s',client.remotePort,data.toString());
        console.log(' 接收了%sbytes数据',client.bytesRead);
        writeData(client,'Sending: '+data.toString());
        console.log(' 发送了%sbytes数据',client.bytesWritten);
    });
    client.on('end',function () {
        console.log('客户端断开连接');
        server.getConnections(function (err,count) {
            console.log('Remaining Connections: '+count);
        })
    });
    client.on('error',function (err) {
        console.log('Socket 错误：',JSON.stringify(err));
    });
    client.on('timeout',function () {
        console.log('socket连接超时');
    });
});

server.listen(8107,function () {
    console.log('Server listening: '+JSON.stringify(server.address()));
    server.on('close',function () {
        console.log('服务器端停止工作');
    });
    server.on('error',function (err) {
        console.log('Server Error',JSON.stringify(err));
    })
})

function writeData(socket,data) {
    //处理write失败时的情况
    var success=!socket.write(data);
    if(!success){
        (function (socket,data) {
            socket.once('drain',function () {
                writeData(socket,data);
            });
        })(socket,data)
    }
}