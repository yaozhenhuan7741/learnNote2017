/**
 * Created by Administrator on 2017/4/12.
 */
//交换流
var stream=require('stream');
var util=require('util');
util.inherits(JSONObjectStream,stream.Transform);
function JSONObjectStream(opt) {
    stream.Transform.call(this,opt);
}
JSONObjectStream.prototype._transform=function (data,encoding,callback) {
    //console.log(JSON.parse(data.toString()));  //data是buffer流，通过toString转换成字符串，然后解析成json对象
    object=data ? JSON.parse(data.toString()) : "";
    this.emit("object",object);
    object.handled=true;
    this.push(JSON.stringify(object));
    callback();
};
JSONObjectStream.prototype._flush=function (cb) {
    cb();
};
var tc=new JSONObjectStream();
tc.on('object',function (object) {
    console.log("Name: %s",object.name);
    console.log("Color: %s",object.color);
});
tc.on('data',function (data) {
    console.log("data: %s",data.toString());
});

tc.write('{"name":"malei","color":"blue"}');
tc.write('{"name":"wangxinghua","color":"red"}');
tc.write('{"name":"madingyan","color":"little"}');