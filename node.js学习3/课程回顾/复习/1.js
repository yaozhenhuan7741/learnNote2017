/**
 * Created by Administrator on 2017/4/28.
 */
var fs=require('fs');

// io事件，用于查看事件队列顺序
fs.stat('1.js',function (err,stats) {
    console.log('我是IO事件，查看文件状态：');//,JSON.stringify(stats,null,2));
});
setTimeout(function (i) {
    console.log("我是超时任务，我等了%d秒钟",i)
},2000,2);
var count=0;
var aa=setInterval(function () {
    count+=1;
    console.log("我是间隔任务，我每隔2秒钟执行一次，当前计数器：",count)
    if(count==5){
        aa.unref();
        console.log("如果计数器到了5，就停止间隔任务")
    }
},500);

setImmediate(function () {
    console.log("我是即时任务1，我要先执行！")
});
setImmediate(function () {
    console.log("我是即时任务2，我要先执行！")
});