/**
 * Created by malei on 2017/4/25.
 */
//流式文件写入
var fs=require('fs');
var grains=['wheat','rice','oats'];
var options={encoding:'utf8',flag:'w'};
var fileWriteStream=fs.createWriteStream("grains.txt",options);
fileWriteStream.on('close',function () {
    console.log("文件关闭!");
});
while(grains.length){
    var data=grains.pop()+" ";
    fileWriteStream.write(data);
    console.log("写入: %s",data);
};
fileWriteStream.end();

