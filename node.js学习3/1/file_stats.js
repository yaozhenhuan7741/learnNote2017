/**
 * Created by Administrator on 2017/1/23.
 */
var fs=require('fs');
fs.stat('file_stats.js',function (err,stats) {
    console.log("errinfo: "+err)
    if(!err){
        console.log('stats: '+JSON.stringify(stats,null,' '));
        console.log(stats.isFile() ? "Is a file" : "Is not a file");
        console.log(stats.isDirectory() ? "Is a Folder" : "Is not a Folder");
        console.log(stats.isSocket() ? "Is a Socket" : "Is not a Socket");
        stats.isDirectory();
        stats.isBlockDevice();
        stats.isCharacterDevice();
        stats.isSymbolicLink();
        stats.isFIFO();
        stats.isSocket();
    }
})