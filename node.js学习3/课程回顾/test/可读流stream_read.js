/**
 * Created by Administrator on 2017/4/10.
 */
//可读流
var stream=require('stream');
var util=require('util');
util.inherits(Answers,stream.Readable);//Answers继承自可读流
function Answers(opt) {
    stream.Readable.call(this,opt);
    this.quotes=['yes','no','maybe'];
    this._index=0;
}
Answers.prototype._read=function () { //重写原型的read方法
    if(this._index>this.quotes.length){
        this.push(null);
    }else {
        this.push(this.quotes[this._index]);
        this._index+=1;
    }
};
var r=new Answers();
console.log("直接读取："+r.read().toString());
r.on('data',function (data) {     //添加事件
    console.log("回调读取："+data.toString());
});
r.on('end',function (data) {
    console.log('没有更多数据啦');
});