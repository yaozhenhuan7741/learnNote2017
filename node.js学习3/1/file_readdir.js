/**
 * Created by Administrator on 2017/1/23.
 */
var fs=require('fs');
var Path=require('path');
function WalkDirs(dirPath) {
    console.log(dirPath);
    fs.readdir(dirPath,function (err,entries) {
        console.log(entries)
        for (var idx in entries){
            //console.log(idx+'ffffffffffff')
            var fullPath=Path.join(dirPath,entries[idx]);
            //console.log(fullPath+'11111');
            (function (fullPath) {
                fs.stat(fullPath,function (err,stats) {
                    if(stats && stats.isFile()){
                        console.log(fullPath);
                    }else if(stats && stats.isDirectory()){
                        WalkDirs(fullPath);
                    }
                })
            })(fullPath)
        }
    })
};
WalkDirs("../")