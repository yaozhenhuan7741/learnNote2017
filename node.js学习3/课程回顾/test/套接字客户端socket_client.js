/**
 * Created by Administrator on 2017/5/3.
 */
//tcp套接字客户端
var net=require('net');
var fs=require('fs');

//创建一个对象
function getConnection(connName) {
    var client=net.connect({port:8107,host:'127.0.0.1'},function () {
        console.log(connName+' 连接成功!');
        console.log(' local = %s:%s',this.localAddress,this.localPort);
        console.log(' remote = %s:%s',this.remoteAddress,this.remotePort);
        this.setTimeout(500);
        this.setEncoding('utf8');
        this.on('data',function (data) {
            console.log(connName + ' From Server: '+data.toString());
            this.end();
        });
        this.on('end',function () {
            console.log(connName + ' 连接断开');
        });
        this.on('error',function (err) {
            console.log('Socket Error: ',JSON.stringify(err));
        });
        
        this.on('timeout',function () {
            console.log('Socket 超时!');
        });
        this.on('close',function () {
            console.log('Socket 连接关闭')
        })
    });
    return client;
}

function writeData(socket,data) {
    //处理write失败时的情况
    //console.log(socket.write(data));
    var success=!socket.write(data);
    console.log('success:'+success);
    if(!success){
        console.log('fffff')
        (function (socket,data) {
            socket.once('drain',function () {
                writeData(socket,data);
            });
        })(socket,data)
    }
}


// var Malei=getConnection('Malei');
// var Mamingwei=getConnection('Mamingwei');
var Masanli=getConnection('Masanli');

var aaaa=fs.readFile('E\:/BaiduYunDownload/ace.rar',function (err,data) {
    console.log(data.length);
    //console.log(err);
    writeData(Masanli,data);
});

// writeData(Malei,'你好！');
// writeData(Mamingwei,'你好吗！');
// writeData(Masanli,'好你妹！');


