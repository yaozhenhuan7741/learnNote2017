##将nodejs学习整理重新编辑成markdown格式
##一、基础
1. 数据类型
```
字符串 String
数值  Number
布尔  Boolean
数组  Array
对象  Object
空    Null
```
2. 运算符
算数运算符 + - ++ -- * / %
赋值运算符 = += -+ *= /= %=
比较运算符 ==  === != !== > >= < <=
逻辑运算符 && || !
条件运算符
```
if(){}else{}  if(){}else if(){}else{}
switch(表达式){
    case a:
    代码;
    break;
    case b:
    代码;
    break;
    default:
    代码
}
```
3. 循环
```
while(){}
do{}while();
for(var i=0;i<len;i++){} //赋值;条件;更新
for/in循环 var days=[1,2,3,4,5,6,d,f]   for( var idx in days){}
中断  break  continue
```
4. 函数、匿名函数
```
function 名称(参数){表达式}  使用return返回值
```
5. 对象
```
var x=new Number('5');
var y={'name':'malei'}  访问对象 y.name  或者 y['name']
```
对于一次性的对象，以后不再使用的一般使用 {}直接定义对象：简单对象
对于需要重复使用的，将其封装为函数块
```
function User(first,last){
this.first=first;
this.last=last;
this.getName=function(){return this.first+' '+this.last}
};
var user=new User('ma','lei');
原型对象模式，代替上边的this.getName
User.prototype={
    getName:function(){return this.first+' '+this.last}
}
```
字符串对象常用方法
```
charAt charCodeAt concat indexOf lastIndexOf
match(regex) replace search slice split substr substring valueOf
```
数组对象常用方法
```
concat indexOf join lastIndexOf pop push shift unshift reverse
slice sort  splice toString valueOf
```
6. 异常 try catch throw finally
```
try{}catch(err){console.log(err.name+err.message)};
try{
    if(xxx) throw{message:xxxxxxx};
    if(xxx) throw{message:xxxxxxx};
    if(xxx) throw{message:xxxxxxx};
}catch(err){
    err.message
}finally{}
```
7. 模块封装
```
npm pack
```
8. 控制台console
```
console.log
console.time console.timeEnd
```


##二、事件、监听器、定时器、回调

* `事件队列相关`

9. 定时器
```
a. 超时 setTimeout(回调函数，时间，[回调函数需要的参数])
b. 间隔 setInterval(回调函数，时间，[回调函数需要的参数])
c. 及时 setImmediate(回调函数，参数)   回调函数被放置在事件队列中，并在遍历事件队列循环的每次迭代中，在I/O事件之后执行
    取消定时器
    var myInterval=setInterval(myFun);
    myInterval.unref()  //取消定时器
d. nextTick() 在事件循环的下一个循环中运行，在I/O事件被触发之前

例子参见 事件队列nexttick.js
```
* `监听器和发射器`

10. 发射器

将自定义事件添加到JavaScript对象
方法一: 传统方式
```
var events=require('events');
var emitter=new events.EventEmitter();
emitter.emit('simpleEvent');
```
方法二: 继承的方式
```
function MyObj(){
Events.eventEmitter.call(this);
}
MyObj.prototype.__proto__=events.EventEmitter.prototype;
使用
var  myobj=new MyObj();
myobj.emit('someevent');
```
11. 监听器
```
.addListener(eventName,callback); //将回调函数添加到监听器中
.on(eventName,callback)  //同addListener
.once(eventName,callback) //事件第一次被触发时执行
.listeners(eventName) //返回所有添加到事件eventName上的函数数组
.setMaxListeners(n)   //n默认为10,如果多于n的监听器都加入到EventEmitter对象,就触发报警
.removeListener(eventName,callback); //将callback函数从eventName事件中删除
```
例子参见 监听器发射器试验emitter_listener.js

12. 回调函数
```
a.将参数传递给回调函数
b.在循环内处理回调函数参数
c.嵌套回调
```
例子参见 回调参数callback_parameter.js

_闭包_:变量被绑定到一个函数的作用域,但不绑定到他的父函数的作用域,因为当执行异步回调时,父函数的作用域可能是变的,如遍历.
例子参见 回调闭包callback_closure.js

链式回调--调用顺序
例子参见 回调链式callback_chain.js

##三、数据处理
13. JSON
    ```
    JSON字符串转对象JSON.parse(string)
    JSON对象转字符串JSON.stringify(obj)
    ```
14. buffer缓冲
```
创建缓冲区  new Buffer(sizeInBytes)    new Buffer(octerArray)  new Buffer(string,[encoding])
写入缓冲区  write fill writeInt8 writeInt16LE writeInt16BE 参见例子
例子参见  缓冲写入buffer_write.js
读取缓冲区  buffer.toString([encoding],[start],[end]);  stringDecoder.write(buffer);buffer[offset];
          readInt8 readInt16LE readInt16BE
例子参见  缓冲读取buffer_read.js

缓冲区长度 应注意缓冲区长度与字符串长度不一样

缓冲区复制 应注意源缓冲区和目标缓冲区编码要一致

例子参见  缓冲复制buffer_copy.js

缓冲区切片   切片与副本不同，切片对原缓冲区有影响，副本与原缓冲区是独立的  slice

例子参见  缓冲切片buffer_slice.js

缓冲区拼接 concat

例子参见  缓冲拼接buffer_concat.js
```
15. stream流
```
Readable（可读）、Writeable（可写）、Duplex（双工）、Transform（交换）流
```
* 适用于Readable流的常用事件：readable、data、end、close、error
适用于Readable流的常用方法：read、setEncoding(encoding)、pause、resume、pipe、unpipe、
继承流对象，使用util.inherits和原型来继承。
    * 例子参见 可读流stream_read.js

* 适用于Writeable流的常用事件：drain、finish、pipe、unpipe
适用于Writeable流的常用方法：write、end
    * 例子参见 可写流stream_write.js

* 双向流 Duplex
    * 例子参见 双向流stream_duplex.js

* 交换流 Transform
    * 例子参见 交换流stream_transform.js

* 管道 pipe
    * 例子参见 管道stream_piped.js

*  压缩与解压缩 zlib
 ```
 gzip/gunzip
 deflate/inflate
 deflateRaw/inflateRaw
```
* 缓冲区压缩与解压
    * 例子参见 缓冲区压缩解压zlib_buffer.js

* 流的压缩与解压缩: 通过管道函数,通过压缩/解压缩对象把数据从一个流输送到另一个流
    * 例子参见 流压缩解压缩zlib_file.js

##四、文件系统
16. 文件系统
  
  同步文件系统调用  异步文件系统调用
  文件打开/关闭
  ```
  fs.open(path,flags,[mode],callback)
  fs.openSync(path,flags,[mode])
  path:文件路径
  flags:打开文件的模式,如 r,r+,rs,rs+,w,wx,w+,wx+,a,ax,a+,ax+  有+号,就有读写权限,有x,则文件不能存在
  mode:文件访问模式,默认0666

  fs.close(fd,callback)
  fs.closeSync(fd)
  例如:
  fs.open('myfile','w',function(err,fd){
    if(!err){
        fs.close(fd);
        }
    });
```
17. 文件写入 
* 简单文件写入
```
fs.writeFile(path,data,[option],callback)
fs.writeFileSync(path,data,[option])
```
    * 例子参见: 简单文件写入file_write.js

* 同步文件写入

先用fs.openSync打开文件,然后用writeSync写入,最后用closeSync关闭
    
    * 例子参见: 同步文件写入file_write_sync.js

* 异步文件写入

fs.write(fd,data,offset,length,position,callback) 其中callback必须有两个参数,error和bytes
    
    * 例子参见: 异步文件写入file_write_async.js

* 流式文件写入

先创建一个Writeable对象,然后使用标准的流式write(buffer)方法写入,
完成后,调用end()方法关闭流
    
    * 例子参见: 流式写入file_write_stream.js

18. 文件读取

* 简单文件读取
```
fs.readFile(path,[options],callback)
fs.readFileSync(path,[options])
```

    * 例子参见: 简单文件读取file_read.js
    
* 同步文件读取
```
fs.readSync(fd,buffer,offset,length,position)    
```
    * 例子参见: 同步文件读取file_read_sync.js
    
* 异步文件读取
```
fs.read(fd,buffer,offset,length,position,callback)
```
    * 例子参见: 异步文件读取file_read_async.js
    
* 流式文件读取
```
先创建一个readable流,然后通过管道,输出到writeable流
```
    * 例子参见: 流式读取file_read_stream.js
    
19. 其他文件系统任务

* 验证存在性
```
fs.exists(path,callback)
fs.existsSync(path)
```
* 文件信息
```
fs.stat(path,callback);//callback两个参数,err和stats对象
fs.statSync(path);//返回stats对象

stats对象的常用属性和方法
isFile()
isDirectory()
isSocket()
dev
mode
size
blksize
atime
mtime
ctime
```
    * 例子参见: 文件信息file_stats.js
  
* 列出文件

```
fs.readdir(path,callback);//callback参数err,文件名数组
fs.readdirSync(path);//文件名数组
```
    * 例子参见: 遍历目录file_readdir.js
    
* 删除文件

```
fs.unlink(path,callback);//参数为err
fs.unlinkSync(path);
```

* 截断文件

```
fs.truncate(path,len,callback);//回调函数参数为err
fs.truncateSync(path,len);//
返回值为true/false
```

* 建立和删除目录

```
fs.mkdir(path,[mode],callback);//回调函数参数为err
fs.mkdirSync(path);

fs.rmdir(path,callback);
fs.rmdirSync(path);
```

* 重命名文件和目录

```
fs.rename(oldPath,newPath,callback);//同上
fs.renameSync(oldPath,newPath);
```

* 监视文件变化

```
fs.watchFile(path,[options],callback);
options,可选,对象格式,包含persistent(持续)和interval(间隔)属性
callback参数为当前stats对象和之前stats对象

fs.watchFile('log.txt',{persistent:true,interval:5000},function(curr,prev){
console.log('log.txt modified at: "+curr.mtime);
console.log('previous modification was: "+prev.mtime);
});
```

## 五、HTTP服务

20. 处理url

* url组成
```
http://user:password@host.com:80/resource/path/?query=string#hash
协议:http
身份验证:user:password
主机:host.com    
    host是主机名
端口:80
路径:resource/path/?query=string
    路径名：resource/path
    查询/搜索：query=string
散列:#hash
```
* url模块

>将url字符串转换为url对象
```
url.parse(urlStr,[parseQueryString],[slashesDenotdHost])
parseQueryString:布尔值，如果为真，则把查询部分，也解析为对象字面量，默认为false
slashesDenoteHost:布尔值，如果为真，则把//host/path格式的url解析为{host:'host',pathname:'/path'},否则为{pathname:'//host/path'}。默认为false
注：经测试slashesDenoteHost无效
```   
>将url对象转换为url字符串
>url.format(urlObj)

* url.parse返回的url对象属性


属性|说明
---|---
href|完整的、最原始的url
protocol|协议
host|URL的主机部分，包括端口信息，小写|
auth|身份认证部分
hostname|主机名部分
port|端口部分
pathname|路径部分
search|查询部分，包括问号
path|完整路径，包括路径和搜索部分
query|查询部分，如果parseQueryString为假，值为查询部分字符串，如果为真，则值为查询部分解析成的对象
hash|散列部分，包括#

* url解析
```
url.resolve(from,to)
from是指原始url字符串，to是指想要url被解析到的新位置
```

   - 例子参见 url对象.js
   
* 处理查询字符串和表单参数(queryString模块)
```
将查询字符串、或者按照固定格式分割的字符串，解析为对象
queryString.parse(str,[set],[eq],[options])
str是查询或参数字符串
sep是分隔符，默认是&
eq是赋值运算符,默认是=
options是一个具有maxKeys属性的最新，可以限制键值对最大数量。0为没限制
```
例子
```
var qs=require('querystring');
var queryObj=qs.parse("name=malei&age=29&color=blue");
console.log(queryObj);
结果为"{ name: 'malei', age: '29', color: 'blue' }"

```
把对象转换成查询字符串
```javascript
querystring.stringify(obj,[sep],[eq]);
```
21. 请求、响应和服务器对象

* http.ClientRequest对象
```
http.request(options,callback)
options是一个对象，定义了如何把客户端的http请求打开并发送到服务器
callback用于处理服务器返回的响应
```
    * 例子参见 http请求.js
    
**options可以指定的选项**
```
host:域名或主机
hostname:同host，但比host好
port:端口，默认80
localAddress:绑定的本地接口
socketPath:Unix套接字
method:请求方法
path:路径
headers:标头
auth：身份验证
agent:代理
```    
  
* http.ServerResponse对象
 
**ServerResponse对象提供的事件和属性**
```
close、headersSent、sendDate、statusCode
```
**ServerResponse对象提供的方法**
```
writeContinue
writeHead(statusCode,[reasonPhrase],[headers])
setHeader(name,value)
getHeader(name)
removeHeader(name)
write(chunk,[encoding])
end(data,[encoding])
```

**HTTPServer对象**

```
request/connect/connection/close/checkContinue/upgrade/clientErroe
```
```
http.createServer([requestListener])
listen(port,[hostname],[backlog],[callback])
#port 监听的端口
#hostname 监听的主机名
#backlog  积压：排队的最大待处理数，默认511
#callback 回调，开始监听时，要执行的回调函数
```

22. http服务器和客户端

* 静态文件服务器

  *  例子参见 静态文件服务器http_server_static.js
  *  例子参见 web客户端检索静态文件http_client_static.js
  
* 动态get服务器

    * 例子参见 动态get服务器http_server_get.js
    * 例子参见 动态get服务器的web客户端http_client_get.js
    
* POST服务器

    * 例子参见 基于post服务器http_server_post.js
    * 例子参见 post客户端http_client_post.js
  
* 与外部源交互
    
    * 例子参见 天气预报http_server_external.js
    >注：教程中的天气接口已经失效，采用其他的免费天气接口，完成的例子,[天气接口示例](http://wthrcdn.etouch.cn/weather_mini?city=%E5%8C%97%E4%BA%AC)
    
    
## 六、HTTPS服务

23. 创建ca
  - 生成私钥
    ```
    openssl genrsa -out server.pem 2048
    ```
  - 生成证书签名请求文件
    ```
    openssl req -new -key server.pem -out server.csr
    #windows下有可能报错找不到openssl.cnf 使用下面的语句
    #openssl req -new -key server.pem -out server.csr -config ".\openssl.cnf"  //指定配置文件位置
    
    #回答问题:
    Country Name (2 letter code) [XX]:CN   #国家代码（中国）
    State or Province Name (full name) []:BeiJing   #省（北京）
    Locality Name (eg, city) [Default City]:BeiJing   #市（北京）
    Organization Name (eg, company) [Default Company Ltd]:Dos2unix   #公司名称
    Organizational Unit Name (eg, section) []:   #可不填
    Common Name (eg, your name or your server's hostname) []:   #可不填
    Email Address []:l_ichen@126.com   #邮箱
    
    Please enter the following 'extra' attributes
    to be sent with your certificate request
    A challenge password []:   #可不填
    An optional company name []:   #可不填
    
    ```
  - 生成自签名证书
    ```
    openssl x509 -req -days 365  -signkey server.pem  -in server.csr  -out server.crt
    ```

24. https客户端
    ```
    var options={
        hostname:'localhost',
        port:443,
        path:'/',
        method:'GET',
        key: fs.readFileSync('../ca/client.pem'),
        cert:fs.readFileSync('../ca/client.crt'),
        agent:false
    };
    var req=https.request(options,function(res) {
    xxxx
    })
    ```
    
25. https服务器
    ```javascript
    var options={
        key:fs.readFileSync('../ca/server.pem'),
        cert:fs.readFileSync('../ca/server.crt')
    };

    https.createServer(options,function(req,res) {
        res.writeHead(200);
        res.end('hello ');
    }).listen(3000);
    ```
    
    
## 七、网络套接字

26. net.Socket对象
    
    ```
    #创建socket对象的几种方法
    net.connect(options,[connectionListener])
    net.createConnection(options,[connectionListener])
    
    net.connect(port,[host],[connectionListener])
    net.createConnection(port,[host],[connectionListener])
    
    net.connect(path,[connectionListener]);
    net.createConnection(path,[connectionListener]);
    
    ##net.connect和createConnection等效
    
    ##属性、事件、方法 略
    
    ```
27. net.Server对象
    ```
    #创建服务器对象的方法
    net.createServer([options],[connectionListener])
    #其他 略

    ```
    
28. 实现tcp套接字服务器和客户端
    
    * 例子参见 套接字服务器端socket_server.js
    * 例子参见 套接字客户端socket_client.js
    
29. 实现tls套接字服务器和客户端
    
    * 略
    
## 八、进程相关

30. process模块

    * I/O管道
    
    ```
    #标准输入/标准输出/错误输出
    #stdin/stdout/stderr
    
    process.stdin.on('data',function (data) {
        console.log('Input data:'+data);
    });
    ```
    
    * 进程信号
    ```
    #注册进行信号,只需使用 on(event,callback)方法
    process.on('SIGBREAK',function(){
        console.log('get a sigbreak')
    })
    ```
    可以被发送到nodejs的事件
    
    事件|说明
    ---|---
    SIGUSR1|当nodejs调试器启动时发出
    SIGPIPE|当进程试图写一个在另一端没有进程连接的管道时发出
    SIGHUP|在windows上关闭窗口或者在其他平台上发生类似情况时发出
    SIGTERM|终止进程请求,非Windows上
    SIGINT|中断,ctrl+c时
    SIGBREAK|在windows上,ctrl+break时
    SIGWINCH|XXX
    SIGKILL|进程杀掉时,不能安装监听器
    SIGSTOP|进程停止时,不能安装监听器
    
    * 控制进程执行
    ```
    如: process.exit(0)
    常用的控制进程执行的方法
    about()
    exit([code])
    kill(pid,[signal]) #signal默认是SIGTERM
    nextTick(callback) #事件队列下一个滴答
    ```  
    
    * 进程信息
    
    |方法|说明|
    |:---:|:---|
    version|指定nodejs版本
    versions|对象,包含本nodejs应用程序所需的模块和版本
    config|包含用于编译当前节点可执行程序的配置选项
    argv|包含用于启动nodejs应用程序的命令参数.所述第一原件是节点(node),并且所述第二元件是路径到主Javascript文件
    execpath|指定nodejs从中启动的绝对路径
    execargv|指定用于启动应用程序的特定于节点命令行选项
    chdir(directory)|更改应用程序的当前工作目录.如果你提供应用程序启动后加载的配置文件,这个功能可能很有用
    cwd()|返回进程的当前工作目录
    env|包含在该进程的环境中指定的键/值对
    pid|指定当前进程的id
    title|指定当前运行的进程的标题
    arch|指定进程正在运行的处理器体系结构(例如,x64,ia32或arm)
    platform|指定操作系统平台(例如,linux,win32或freebsd)
    memoryusage()|描述nodejs进程的当前内存使用情况.你需要使用until.inspect()方法读取对象.例如:console.log(until.inspect(process.memoryusage()));{rss:13946880,heaptotal:4083456,heapused:2190800}
    maxtickdepth|指定被nexttick()调度的在阻塞i/o被处理之前运行的事件最大数量.你应该根据需要调整数值,以防你的i/o进程饥饿
    uptime()|包含nodejs处理器已经运行的秒数
    hrtime()|在元组数组[seconds,nanoseconds]中返回一个高精度的时间
    getgid()|在POSIX平台上,返回这个进程的数值型 组id
    setgid(id)|在POSIX平台上,设置这个进程的数值型 组id
    getuid()|在POSIX平台上,返回这个进程的数值型或字符串型的 用户id
    setuid()|在POSIX平台上,设置这个进程的数值型或字符串型的 用户id
    getgroups()|在POSIX平台上,返回 组id 的数组
    setgroups(groups)|在POSIX平台上,设置补充组id,需要nodejs有root权限
    initgroups(user,extra_group)|在POSIX平台上,用来自/etc/group的信息初始化组访问列表,需要root权限
  
    
    * 例子参见 进程信息process_info.js
    
    
31. 子进程
    
   * ChildProcess对象

   **可以在ChildProcess对象上发出的事件**
    
   事件|说明
    ---|---
    message|当ChildProcess对象调用send()方法来发送数据时发出。在这个事件上的监听器实现一个回调函数，它随后可以读出发送的数据。例如 `child.on('send',function(message){console.log(message)});`
    error|在工作进程中出现错误时发出
    exit|在工作进程结束时发出，两个参数，code和signal,指定推出的代码，并传入信号来杀掉进程(如果它是被父进程杀掉的)
    close|当工作进程的所有stdio流都已经终止的时候发出，它与exit不同，因为多个进程可以共享相同的stdio流
    disconnect|当disconnect()在一个工作进程上被调用时发出
    
   **可以在ClildProcess对象上调用的方法**
    
   方法|说明
    ---|---
    kill([signal])|导致操作系统发送一个kill信号给子进程，默认的信号是SIGTERM
    send(message,[sendHandle])|将消息发送到句柄。该消息可以是字符串或者对象。可以的sendHandle参数让你可以把tcpsever或socket对象发送到客户端。这允许客户端进程共享相同的端口和地址。
    disconnect()|关闭父进程与子进程之间的进程间通信（或ipc)通道，并把父进程和子进程的连接标志都设置为false
    
   示例：`clild.send({cmd:'command data'})`
    
   **可以在ChildProcess对象上访问的属性**
    
   属性|说明
    ---|---
    stdin|输入writable流
    stdout|标准输出readable流
    stderr|用于输出错误的标准输出readable流
    pid|进程的id
    connected|一个布尔值，在disconnect()被调用后，它被设置为false。当它为false时，你再也不能将消息发送给子进程
    
  
  - 使用exec()在另一个进程上执行一个系统命令
  
    ```
    #语法
    child_process.exec(command,[options],callback)
    #command参数是一个字符串，指定了在子shell中执行的命令。
    #options参数是一个对象，指定了执行命令时使用的设置，比如工作目录
    #callback参数是一个接受error、stdout、stderr三个参数的函数。
        #error是执行命令遇到错误时，传递的一个错误对象。stdout和stderr包含执行命令的输出的Buffer对象
    ```
    
    **exec()和execFile()函数可以设置的选项**
    
    选项|说明
    ---|---
    cwd|指定子进程执行的当前工作目录
    env|一个对象，指定property:value作为环境的键值对
    encoding|指定存储命令的输出时输出缓冲区使用的编码
    maxBuffer|指定stdout和stderr输出缓冲区的大小，默认是200*1024
    timeout|指定父进程在杀掉子进程之前，如果子进程尚未完成，等待的毫秒数。默认0，无限制
    killSignal|指定终止子进程时使用的kill信号，默认是SIGTERM
    
    
    * 例子参见 子进程执行系统命令child_exec.js
              # 此例子在windows下执行中文乱码，已找到解决方法
    * 例子参见 子进程执行命令(解决乱码)clild_exec.js
              
    * 例子参见           
   
  - 使用execFile()在另一个进程上执行一个可执行文件
    ```
    #语法
    child_process.execFile(file,args,options,callback)
    #只能是二进制文件,Linux或windows上的批处理脚本不行
    #file参数是一个字符串,可执行文件的路径
    #args参数是一个数组,指定传递给可执行文件的参数
    #options参数是一个对象,指定执行命令时的设置
    #callback函数接受error,stdout,stderr三个参数的回调函数
    ```
        * 例子参见 子进程执行可执行文件child_exec_file.js
        # 上述例子执行时中文乱码
        * 例子参见 子进程执行可执行文件(解决乱码)child_exec_file.js
        
  - 使用spawn()在另一个node.js实例中产生一个进程
    ```
    #语法
    child_process.spawn(command,[args],[options])
    #command参数是一个字符串，指定被执行的命令
    #args参数是一个数组，指定传递给可执行命令的命令行参数
    #options参数是一个对象，指定执行命令时使用的设置
    
    ```
    **可以在spawn()函数中设置的选项**
    
    |选项|说明|
    |---|---|
    cwd|子进程的工作目录
    env|一个对象，指定环境变量的键值对
    detached|布尔值，如果true，则子进程成为新进程组的组长，即使父进程退出，也让这个进程继续；同时需要使用child.unref(),使父进程退出之前不等待子进程
    uid|对于POSIX进程，指定进程的用户标识
    gid|对于POSIX进程，指定进程的组标识
    stdio|定义子进程的stdio配置([stdin,stdout,stderr]),<br>默认情况下，node.js为[stdin,stdout,stderr]打开文件描述符[0,1,2]，此字符串定义每个输入和输出流的配置。例如：<br>['ipc','ipc','ipc']<br>下列选项可用于此：<br>'pipe'--创建子进程和父进程之间的管道<br>'ipc'--父进程和子进程之间创建一个IPC通道，使用send()方法传递消息和文件描述符<br>'ignore'--在子进程中不配置一个文件描述符<br>Stream--指定使用在父进程中定义的readable和writeable流对象<br>文件描述符整数<br>null,undefined--使用默认值
        
    * 例子参见 子进程在另一个进程中产生命令child_process_spawn_file.js    
    * 例子参见 子进程在另一个进程中产生命令(解决乱码)child_process_spawn_file.js 
       
  - 实现子派生(fork)
    ```
    #语法
    child_process.fork(modulePath,[args],[options])
    #modulePaht参数是一个字符串，指定被新的node.js实例启动的JavaScript文件的路径
    #args参数是一个数组
    #options参数是一个对象
    ```   
    **fork()函数可以设置的选项
    
    选项|说明
    ---|---
    cwd|工作目录
    env|环境
    encoding|编码
    execPath|指定执行脚本的可执行文件（如node.exe）
    slient|布尔值，默认false，如果true，派生的进程中的stdout和stderr不与父进程相关联
    
    * 例子参见 子进程派生之父进程child_fork.js
    * 例子参见 子进程派生之子模块chef.js
    
    
32. 进程集群  

    * cluster模块
    
    **可以由cluster模块发出的事件**
    
    事件|说明
    ---|---
    fork|当新的工作进程被派生时发出。callback函数接收Worker对象作为唯一参数
    onlines|当新工作进程发回一条消息，表明它已经启动时发出。callback函数接收一个Worker对象作为唯一参数
    listening|当工作进程调用listen()开始监听共享端口时发出。callback函数接收Worker对象和工作进程正在监听的端口的address对象作为参数
    disconnect|当IPC通道被切断时发出。
    exit|当Worker对象已经断开时发出。callback函数接收Worker、code和使用的signal作为参数
    setup|在setupMaster()被首次调用时发出
    
    **cluster模块的方法和属性**
    
    属性|说明
    ---|---
    setting|包含exec、args、silent属性值，用于建立集群
    isMaster|如果当前节点是主节点，则返回true，否则返回false
    isWorker|如果是工作节点，则返回true
    setupMaster([setting])|接收一个setting对象。exec是工作进程的JavaScript文件，args是参数数组，silent断开工作线程的IPC机制
    disconnect([callback])|断开工作进程的IPC机制，并且关闭句柄。当断开连接完成时回调函数被执行
    worker|引用工作进程的当前Worker对象。这不在主进程中定义
    workers|包括worker对象
    
    **可以由Worker对象发出的事件**
    
    事件|说明
    ---|---
    message|在工作进程收到一个新消息时发出，回调函数的参数为message
    disconnect|在IPC通道已对这个工作进程断开后发出
    exit|在这个Worker对象已断开时发出
    error|工作进程发送错误时发出
    
    **Worker对象的方法和属性**
    
    属性|说明
    ---|---
    id|工作进程唯一ID
    process|指定该工作进程运行的clildprocess对象
    suicide|对这个工作进程调用kill()或disconnect()时被设置为true。你可以使用此标志来确定是否需要跳出尝试的循环
    send(message,[sendHandle])|将消息发送到主进程
    kill([signal])|通过端口IPC通道杀掉当前工作进程，然后退出。将suicide标志设置为true
    disconnect|在工作进程调用它时，关闭所有服务器，等待关闭事件，并端口IPC通道。当从主节点中调用它时，发送一个内部消息给工作进程，使其断开本身。设置suicide
    
    
    例子：实现一个http集群
    
    * 例子参见 集群主进程cluster_server.js
    * 例子参见 集群工作进程cluster_worker.js
    * 例子参见 集群之客户端cluster_client.js
    
## 九、其他nodejs模块
    
33. os模块

    **可以在os模块中被调用的方法**
    
    方法|说明
    ---|---
    tmpdir()|返回默认的临时目录字符串
    endianness()|返回当前是大端还是小端，BE或LE
    hostname()|返回主机名
    type()|返回字符串形式的操作系统类型
    platform()|返回字符串形式的平台名称（win32/linux/freeBSD)
    arch()|返回平台的体系结构（x86/x64)
    release()|返回操作系统的发布版本
    uptime()|返回一个以秒为单位的时间戳，表示已经运行的时间
    loadavg()|在unix系统中，返回一个包含[1,5,15]分钟的负载值
    totalmem()|返回一个字节单位的整数，表示内存容量
    freemem()|返回一个以字节为单位的整数，表示可用内存
    cpus()|返回描述了model(型号)、speed（速度）和times(时间）的对象的数组，包含CPU已经花费在user/nice/sys/dle/irq上的时间量
    networkInterfaces()|返回一个对象数组，描述绑定到系统中的每个网络接口上的address和family(地址族）
    EOL|包含操作系统相应的行尾字符
    
    * 例子参见 操作系统信息os_info.js
    
34. util模块
    
    **格式化字符串**
    ```
    #语法
    util.format(format,[...])
    #format参数是可以包含零个或多个占位符的字符串，占位符如下：
    %s  字符串
    %d  数值
    %j  可以转换为字符串的对象
    %   如果%后为空，则不作为占位符
    
    ```
    
    **检查对象类型**
    ```
    #语法一
    util.isArray()
    util.isRegExp()
    util.isDate()
    util.isError()
    #语法二
    (xxx instanceof Array) //使用instanceof，返回布尔值
    ```
    **通步写入输出流**
    ```
    #常用
    util.debug(string) //写入stderr
    util.error([...])  //写入stderr
    util.puts([...])   //写入stderr
    util.print([...])  //写入stdout
    util.log(string)   //把string和一个时间戳写入stdout
    ```
    **将JavaScript对象转换为字符串**
    ```
    #语法
    util.inspect(object,[options]);
    #options参数可以让你控制格式化过程的某些方面，可以包含如下属性
    showHidden:默认false,当true，该对象的不可枚举的属性也别转换成字符串
    depth:限制检查过程遍历的深度，可以防止无限循环，默认2
    colors:默认false，当true，输出使用ansi颜色代码的样式
    customInspect:默认true，当false，被检查对象定义的任何自定义inspect()函数都不会被调用
    
    #注意，与JSON.stringify()各有千秋

    ```
    **继承**
    ```
    #语法
    util.inherits(constructor,superConstructor)
    ```
    * 例子参见 util继承util_inherit.js
    
35. dns模块
    
    **可以在dns模块上调用的方法**
    
    方法|说明
    ---|---
    lookup(domain,[family],callback)|解析域名，family可以使4、6，默认null都解析，callback接收两个参数，err和ip地址数组
    resolve(domain,[rrtype],callback)|把域名解析成类型由rrtype指定的记录数组。rrtype可以是<br>A:ipv4(默认)<br>AAAA:ipv6<br>MX:邮件交换记录<br>TXT:文字记录<br>SRV:SRV记录<br>PTR:反向IP查找<br>NS：名称服务器记录<br>CNAME:规范名称记录<br>callback同上
    resolve4(domain,callback)|同上，但只ipv4
    resolve6(domain,callback)|同上，但只ipv6
    resolveMx()|同上
    resolveTxt()|同上
    resolveSrv()|同上
    resolveNs()|同上
    resolveCname()|同上
    reverse(ip,callback)|对IP反向查找，callback第一个参数是err，第二个是域名数组
    
    * 例子参见 dns模块dns_lookup.js
    
## 十、mongodb

36. mongodb基础知识