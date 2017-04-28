/**
 * Created by malei on 2017/4/27.
 */
//通过嵌套回调链,遍历目录
var fs=require('fs');
var Path=require('path');
function WalkDirs(dirPath) {
    console.log(dirPath);
    fs.readdir(dirPath,function (err,entries) {
        entries.forEach(function (idx) {
            //注:原文为for(var idx in entries),根据webstorm提示修改为forEach
            var fullPath = Path.join(dirPath,idx);
            //因为异步,在循环中,需要使用闭包,根据网上资料，使用forEach可以不用闭包，已验证
            (function (fullPath) {
                fs.stat(fullPath, function (err, stats) {
                    if (stats && stats.isFIFO()) {
                        console.log(fullPath);//如果是文件,就列出
                    } else if (stats && stats.isDirectory()) {
                        WalkDirs(fullPath);//如果是文件夹,嵌套调用
                    }
                });
            })(fullPath);
        });
    })
}
WalkDirs('../../');