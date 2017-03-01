/**
 * Created by Administrator on 2017/1/18.
 */
function logCar(logMsg,callback) {
    process.nextTick(function () {
        callback(logMsg);
    });
}
var cars=["Ferrari","Porsche","Bugatti"]
for(var idx in cars){
    var message="Saw a "+cars[idx];
    logCar(message,function () {
        console.log("Normal Callback:"+message)
    });
}
for (var idx in cars){
    var message="Sar a "+ cars[idx];
    (function (msg) {
        logCar(msg,function () {
            console.log("closure callback:"+msg)
        });
    })(message);
}