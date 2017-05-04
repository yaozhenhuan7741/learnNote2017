/**
 * Created by malei on 2017/5/4.
 */
//在另一个进程中执行一个可执行文件

var childProcess=require('child_process');
var options={
    maxBuffer:100*1024,
    encoding:'utf8',
    timeout:5000
};
var child=childProcess.execFile('ping.exe',['-n','1','baidu.com'],options,function (error,stdout,stderr) {
    if(error){
        console.log(error);
    }
    console.log('执行结果:'+stdout);
    if(stderr.length){
        console.log('错误信息:'+stderr);
    }
});
child.on('exit',function (code) {
    console.log('退出码为:'+code)
});