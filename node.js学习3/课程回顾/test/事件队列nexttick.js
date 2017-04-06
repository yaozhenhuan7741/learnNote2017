/**
 * Created by malei on 2017/4/5.
 */
//此例子用于展示事件队列执行顺序和各种定时器对事件队列的影响
var fs=require('fs');
fs.stat('事件队列nexttick.js',function (err,stats) {
    if(stats){
        console.log('I/O事件，nexttick.js存在！')
    }
});

setImmediate(function () {
    console.log('Immediate 即时计时器 1 运行！')
});
setImmediate(function () {
    console.log('Immediate 即时计时器 2 运行!')
});
process.nextTick(function () {
    console.log('nextTick 1 运行!')
});
process.nextTick(function () {
    console.log('nextTick 2 运行!')
});