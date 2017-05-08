/**
 * Created by Administrator on 2017/5/8.
 */
//使用spawn()函数，在另一个进程中产生命令

var spawn=require('child_process').spawn;
var options={
    env:{user:'malei'},
    detached:false,  //父进程退出时，子进程也退出
    stdio:['pipe','pipe','pipe']  //父进程子进程之间使用管道通信
};

var child=spawn('netstat',['-e'],options);
child.stdout.on('data',function (data) {
    console.log(data.toString());
});
child.stderr.on('data',function (data) {
    console.log(data.toString())
});
child.on('exit',function (code) {
    console.log('子进程退出码为：'+code);
});
