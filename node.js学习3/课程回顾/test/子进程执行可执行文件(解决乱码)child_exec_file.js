/**
 * Created by malei on 2017/5/4.
 */
//在另一个进程中执行一个可执行文件,并解决乱码问题
    //windows使用的默认编码是cp936,类似于gb2312,解决方法是
// 先用binary来存储输出的文本，再用iconv来以cp936解析。

//定义一个函数,专门用于对 执行命令的输出做转码
var iconv=require('iconv-lite');//需要先安装iconv模块:npm install iconv_lite
function toZhCn(input) {
    return iconv.decode(new Buffer(input, 'binary'), 'cp936');
}

var childProcess=require('child_process');
var options={
    maxBuffer:100*1024,
    encoding:'binary',
    timeout:5000
};
var child=childProcess.execFile('ping.exe',['-n','1','baidu.com'],options,function (error,stdout,stderr) {
    if(error){
        console.log(error);
    }
    console.log('执行结果:'+toZhCn(stdout));
    if(stderr.length){
        console.log('错误信息:'+toZhCn(stderr));
    }
});
child.on('exit',function (code) {
    console.log('退出码为:'+code);
});