/**
 * Created by malei on 2017/4/27.
 */
//获取文件信息
var fs=require('fs');
fs.stat('文件信息file_stats.js',function (err,stats) {
    if(!err){
        console.log('stats: '+JSON.stringify(stats,null,' '));
        console.log(stats.isFile() ? "Is a file":"Is not a file");
        console.log(stats.isDirectory() ? "Is a folder":"Is not a folder");
        console.log(stats.isSocket() ? "Is a socket":"Is not a Socket");
        console.log(stats.isDirectory());
        console.log(stats.isBlockDevice());
        console.log(stats.isCharacterDevice());
        console.log(stats.isSymbolicLink());
        console.log(stats.isFIFO());
    }
});
var nStats=fs.statSync('文件信息file_stats.js');
console.log('nStats: '+JSON.stringify(nStats,null,' '));
console.log(nStats.isFile() ? "Is a file":"Is not a file");
console.log(nStats.isDirectory() ? "Is a folder":"Is not a folder");
console.log(nStats.isSocket() ? "Is a socket":"Is not a Socket");
console.log(nStats.isDirectory());
console.log(nStats.isBlockDevice());
console.log(nStats.isCharacterDevice());
console.log(nStats.isSymbolicLink());
console.log(nStats.isFIFO());
