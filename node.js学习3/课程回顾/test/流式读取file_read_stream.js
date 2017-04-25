/**
 * Created by malei on 2017/4/25.
 */
//流式读取
var fs=require('fs');
var options={encoding:'utf8',flag:'r'};
var fileReadStream=fs.createReadStream('grains.txt',options);
fileReadStream.on('data',function (chunk) {
    console.log("Grains: %s",chunk);
    console.log('读取 %dbytes of data.',chunk.length);
});
fileReadStream.on('close',function () {
    console.log('文件关闭');
});