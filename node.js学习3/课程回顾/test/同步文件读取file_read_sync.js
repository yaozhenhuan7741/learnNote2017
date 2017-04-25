/**
 * Created by malei on 2017/4/25.
 */
//同步文件读取
var fs=require('fs');
fd=fs.openSync('veggie.txt','r');
var veggies="";
do{
    var buf=new Buffer(5);
    buf.fill();
    var bytes=fs.readSync(fd,buf,null,5);
    console.log('读取 %dbytes',bytes);
    veggies+=buf.toString();
}while (bytes>0);
fs.closeSync(fd);
console.log('Veggies: '+veggies);