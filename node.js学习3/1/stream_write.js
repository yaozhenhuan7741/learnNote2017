/**
 * Created by Administrator on 2017/1/19.
 */
var stream=require('stream');
var util=require('util');
util.inherits(writer,stream.Writable);
function writer(opt) {
    stream.Writable.call(this,opt);
    this.data=new Array();
}
writer.prototype._write=function (data,encoding,callback) {
    this.data.push(data.toString('utf8'));
    console.log("Adding:"+data);
    callback();
}
var w = new writer();
for(var i=0;i<=5;i++){
    w.write("Item"+i,'utf8')
}
w.end("ItemLast");
console.log(w.data)