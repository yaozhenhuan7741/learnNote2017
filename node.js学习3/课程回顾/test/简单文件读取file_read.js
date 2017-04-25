/**
 * Created by malei on 2017/4/25.
 */
//简单文件读取
var fs=require('fs');
var options={encoding:'utf8',flag:'r'};
fs.readFile('config.txt',options,function (err,data) {
    if(err){
        console.log("读取失败!");
    }else{
        console.log("读取配置文件成功");
        var config=JSON.parse(data);//解析成json对象
        console.log("Max Files: "+config.maxFiles);
        console.log("Max Connections: "+config.maxConnections);
        console.log("Root Path: "+config.rootPath);
    }
});