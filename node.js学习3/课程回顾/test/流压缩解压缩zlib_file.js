/**
 * Created by malei on 2017/4/24.
 */
//将readable流压缩成writeable流
//例如将文件压缩,从读取流压缩成写入流
var zlib=require('zlib');
var gzip=zlib.createGzip();
var fs=require('fs');

var inFile=fs.createReadStream('流压缩解压缩zlib_file.js');
var outFile=fs.createWriteStream('流压缩解压缩zlib_file.gz');
inFile.pipe(gzip).pipe(outFile); //通过管道,将读取流压缩,然后在通过管道,输送到写入流

//设置超时,以便文件写入磁盘
//读取压缩的文件,通过管道,将读取流解压缩,然后在通过管道,输送到写入流
setTimeout(function () {
    var gunzip=zlib.createUnzip({flush:zlib.Z_FULL_FLUSH});
    var inFile=fs.createReadStream('流压缩解压缩zlib_file.gz');
    var outFile=fs.createWriteStream('流压缩解压缩zlib_file.unzipped');
    inFile.pipe(gunzip).pipe(outFile);
},3000);