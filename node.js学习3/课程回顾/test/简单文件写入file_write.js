/**
 * Created by malei on 2017/4/24.
 */
//简单文件写入
var fs=require('fs');
var config={
    maxFiles:20,
    maxConnections:30,
    rootPath:"/webroot"
};
var configTxt=JSON.stringify(config);
var options={encoding:'utf8',flag:'w'};
fs.writeFile('config.txt',configTxt,options,function (err) {
    if(err){
        console.log('Config 写入失败!');
    }else {
        console.log('Config 保存成功');
    }
})