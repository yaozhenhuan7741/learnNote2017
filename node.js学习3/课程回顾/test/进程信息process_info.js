/**
 * Created by Administrator on 2017/5/4.
 */
//使用process模块访问进程和系统的相关信息

var util=require('util');
console.log('当前目录是：'+process.cwd());
console.log('环境变量信息：'+JSON.stringify(process.env));
console.log('nodejs参数:'+process.argv);
console.log('执行路径：'+process.execPath);
console.log('执行的参数：'+JSON.stringify(process.execArgv));
console.log('Node 版本:'+process.version);
console.log('模块版本：'+JSON.stringify(process.versions));
console.log('进程配置：'+JSON.stringify(process.config));
console.log('进程pid:'+process.pid);
console.log('进程标题:'+process.title);
console.log('系统平台:'+process.platform);
console.log('系统架构：'+process.arch);
console.log('内存信息：'+util.inspect(process.memoryUsage()));
console.log('内存信息：'+JSON.stringify(process.memoryUsage()));

var start = process.hrtime();
console.log(start)
setTimeout(function () {
    var delta=process.hrtime(start);
    console.log(delta);
    console.log('High-Res timer took %d seconds and %d nanoseconds',delta[0],delta[1]);;
    console.log('node has been running %d seconds',process.uptime());
},1000)

