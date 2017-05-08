/**
 * Created by Administrator on 2017/5/8.
 */
//实现一个http集群之主进程
var cluster=require('cluster');
//var http=require('http');

if(cluster.isMaster){
    cluster.on('fork',function (worker) {
        console.log('工作进程：'+worker.id+' 被创建');
    });
    cluster.on('listening',function (worker,address) {
        console.log('工作进程 '+worker.id+' 监听在 '+address.address+':'+address.port);
    });
    cluster.on('exit',function (worker,code,signal) {
        console.log('工作进程 '+ worker.id+' 退出');
    });
    cluster.setupMaster({exec:'集群工作进程cluster_worker.js'});
    var numCPUs=require('os').cpus().length;
    for(var i=0;i<numCPUs;i++){
        if(i>=4)break;
        cluster.fork();
    }
    //console.log(Object.keys(cluster.workers));
    Object.keys(cluster.workers).forEach(function (id) {
        cluster.workers[id].on('message',function (message) {
            console.log(message)
        });
    });


}