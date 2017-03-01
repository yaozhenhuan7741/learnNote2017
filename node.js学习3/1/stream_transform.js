/**
 * Created by Administrator on 2017/1/20.
 */
var stream=require("stream");
var util=require('util');
util.inherits(JSONObjectStream,stream.Transform);
function JSONObjectStream(opt) {
    stream.Transform.call(this,opt);
};
JSONObjectStream.prototype._transform=function (data,encoding,callback) {
    object=data ? JSON.parse(data.toString()):"";
    this.emit("object",object);
    object.handled=true;
    this.push(JSON.stringify(object));
    callback();
};
JSONObjectStream.prototype._flush=function (cb) {
    cb();
};

var tc = new JSONObjectStream()
tc.on("object",function (object) {
    console.log("name: %s",object.name)
    console.log("color: %s",object.color)
});

tc.on("data",function (data) {
    console.log("Data: %s",data.toString());
});

tc.write('{"name":"carolinux","color":"green"}')
tc.write('{"name":"solarlus","color":"blue"}')
tc.write('{"name":"Lo tae zhao","color":"gold"}')
tc.write('{"name":"Ommadon","color":"red"}')

