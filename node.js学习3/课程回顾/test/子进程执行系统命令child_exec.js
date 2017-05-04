/**
 * Created by Administrator on 2017/5/4.
 */
//在另一个进程中执行系统命令
var childProcess=require('child_process');
var options={
    maxBuffer:100*1024,
    encoding:'utf8',
    timeout:5000
};

var child=childProcess.exec('dir /B',options,function (error,stdout,stderr) {
    if(error){
        console.log(error);
        console.log('Error Code:'+error.code);
        console.log('Error Signal:'+error.signal);
    }
    console.log('执行结果：\n'+stdout);
    if(stderr.length){
        console.log('错误信息：'+stderr);
    }
});

child.on('exit',function (code) {
    console.log('命令完成，退出码为：'+code);
});