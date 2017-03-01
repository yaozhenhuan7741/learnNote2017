/**
 * Created by Administrator on 2017/1/20.
 */
var fs=require('fs');
var options={encoding:'utf8',flag:'r'};
fs.readFile('config.txt',options,function (err,data) {
    if(err){
        console.log("failed to open config files,err: "+err);
    }else {
        console.log("config loaded.");
        var config=JSON.parse(data);
        console.log(config);
        console.log(config.maxFiles)
    };
})