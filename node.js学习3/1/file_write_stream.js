/**
 * Created by Administrator on 2017/1/20.
 */
var fs=require('fs');
var grains=['wheat','rice','oats'];
var options={encoding:'utf8',flag:'w'};
var fileWriteStream=fs.createWriteStream("grains.txt",options);
fileWriteStream.on("close",function () {
    console.log("file closed.");
});
while(grains.length){
    var data=grains.pop()+" ";
    fileWriteStream.write(data);
    console.log("wrote: %s",data);
}
console.log("xxxxx")
fileWriteStream.end();