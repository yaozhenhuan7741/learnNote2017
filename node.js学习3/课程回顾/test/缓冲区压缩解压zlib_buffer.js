/**
 * Created by malei on 2017/4/24.
 */
//使用zlib模块压缩/解压缩 缓冲区

var zlib=require('zlib');
var input='..........text....................';
zlib.deflate(input,function (err,buffer) {
    //使用deflate压缩
    if(!err){
        console.log('deflate压缩 (%s): ',buffer.length,buffer.toString('base64'));
        zlib.inflate(buffer,function (err,buffer) {
            //使用inflate解压缩,第一个buffer是压缩后的buffer,第二个buffer是使用inflate解压后的数据
            if(!err){
                console.log('使用inflate 解压缩 (%s): ',buffer.length,buffer.toString());
            }
        });
        zlib.unzip(buffer,function (err,buffer) {
            //使用unzip解压缩
            if(!err){
                console.log('使用unzip 解压缩 (%s): ',buffer.length,buffer.toString());
            }
        })
    }
});

zlib.deflateRaw(input,function (err,buffer) {
    //使用deflateRaw压缩
    if(!err){
        console.log('使用deflateRaw压缩 (%s) :',buffer.length,buffer.toString('base64'));
        zlib.inflateRaw(buffer,function (err,buffer) {
            //使用inflateRaw解压缩
            if(!err){
                console.log('使用inflateRaw解压缩 (%s): ',buffer.length,buffer.toString());
            }
        })
    }
});

zlib.gzip(input,function (err,buffer) {
    //使用gzip压缩
    if(!err){
        console.log('使用gzip压缩(%s) :',buffer.length,buffer.toString('base64'));
        zlib.gunzip(buffer,function (err,buffer) {
            //使用gunzip解压缩
            if(!err){
                console.log('使用gunzip解压缩 (%s) :',buffer.length,buffer.toString());
            }
        });
        zlib.unzip(buffer,function (err,buffer) {
            //使用unzip解压缩
            if(!err){
                console.log('使用unzip解压缩(%s): ',buffer.length,buffer.toString());
            }
        });
    }
});