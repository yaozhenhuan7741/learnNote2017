var fs=require('fs');
fs.stat("事件队列nexttick.js",function (err,stats) {
    if(stats){console.log("事件队列nexttick.js exists");}
});
setImmediate(function () {
    console.log("Immediate timer 1 executed");
});
setImmediate(function () {
    console.log("Immediate timer 2 executed");
});
process.nextTick(function () {
    console.log("next tick 1 executed");
});
process.nextTick(function () {
    console.log("next tick 2 executed")
});