/**
 * Created by malei on 2017/4/24.
 */
//同步文件写入
var fs=require('fs');
var aaaaaa=['carrots','celery','olives'];
fd=fs.openSync('veggie.txt','w');
while(aaaaaa.length){
    aa=aaaaaa.pop()+' ';
    var bytes=fs.writeSync(fd,aa,null,null);
    console.log("写入 %s %dbytes",aa,bytes);
}
fs.closeSync(fd);