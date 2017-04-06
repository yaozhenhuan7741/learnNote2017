/**
 * Created by Administrator on 2017/4/6.
 */
function logCar(logMsg,callback) {
    process.nextTick(function () {
        callback(logMsg)
    })
}

var cars=['法拉利','布加迪威龙','阿斯顿马丁'];
for (var idx in cars){
    var message="看见一辆 "+cars[idx];
    //console.log('aaaaa传统方式回调:'+message);
    logCar(message,function () {
        console.log('传统方式回调:'+message);
    })
}

for(var idx in cars){
    var message="看见一辆 "+cars[idx];
    (function (msg) {
        logCar(msg,function () {
            console.log("闭包方式回调:"+msg);
        });
    })(message);
}

console.log('异步回调时,不使用闭包,因为父函数作用域改变,回调函数');