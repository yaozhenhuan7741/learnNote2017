/**
 * Created by Administrator on 2017/5/9.
 */
//os模块,操作系统信息
var os=require('os');
console.log(os.tmpdir());
console.log(os.endianness());
console.log(os.hostname());
console.log(os.type());
console.log(os.platform());
console.log(os.arch());
console.log(os.release());
console.log(os.uptime()/60/60);
console.log(os.loadavg());
console.log(os.totalmem());
console.log(os.freemem());
console.log(os.EOL);
console.log(os.cpus());
console.log(os.networkInterfaces());
