/**
 * Created by Administrator on 2017/1/23.
 */
var childProcess=require('child_process');
var options={
    maxBuffer:100*1024,
    encoding:'gbk',
    timeout:5000
};
var child=childProcess.execFile('ping.exe',['-n','1', 'baidu.com'],options,function (error,stdout,stderr) {
    if(error){
        console.log(error.stack);
        console.log('Error Signal:'+error.signal);
        console.log('Error Code:'+error.code);
    }
    console.log('Results: \n'+stdout);
    if(stderr.length){
        console.log('Error: '+stderr);
    }
});

child.on('exit',function (code) {
    console.log('Child completed with code:'+code);
});