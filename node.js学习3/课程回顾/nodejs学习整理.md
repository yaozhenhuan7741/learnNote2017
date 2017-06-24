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
    语法:
    JSON.stringify(value[, replacer[, space]])
    value:
    必需， 一个有效的 JSON 字符串。
    replacer:
    可选。用于转换结果的函数或数组。
    如果 replacer 为函数，则 JSON.stringify 将调用该函数，并传入每个成员的键和值。使用返回值而不是原始值。如果此函数返回 undefined，则排除成员。根对象的键是一个空字符串：""。
    如果 replacer 是一个数组，则仅转换该数组中具有键值的成员。成员的转换顺序与键在数组中的顺序一样。当 value 参数也为数组时，将忽略 replacer 数组。
    space:
    可选，文本添加缩进、空格和换行符，如果 space 是一个数字，则返回值文本在每个级别缩进指定数目的空格，如果 space 大于 10，则文本缩进 10 个空格。space 有可以使用非数字，如：\t。

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


*教程中mongodb版本较老，很多方法已经不再使用，学习时参考官网*

36. mongodb基础知识

       **MongoDb的数据类型和相应的ID号**
       
       类型|说明|编号
       :---|:---|:---
       Double|双精度|1
       String|字符串|2
       Object|对象|3
       Array|数组|4
       Binary data|二进制数据|5
       Object id|对象ID|7
       Boolean|布尔值|8
       Date|日期|9
       Null|空值|10
       Regular Expression|正则|11
       JavaScript|JavaScript|13
       Symbol|符号|14
       JavaScript(wit scope)|JavaScript(带作用域)|15
       32-bit integer|32位整数|16
       Timestamp|时间戳|17
       64-bit integer|64位整数|18
       Min Key|最小键|255
       Max Key|最大键|127
       
      **不同类型大小比较的话，从小到大的顺序是**
       
       1. 最小键
       2. 空值
       3. 数值（32位整数、64位整数、双精度）
       4. 符号、字符串
       5. 对象
       6. 数组
       7. 二进制
       8. 对象ID
       9. 布尔值
       10. 日期、时间戳
       11. 正则表达式
       12. 最大键
       
       **规划数据模型，需要考虑**
       
       1. 应用程序将要使用的基本对象是什么
       2. 不同对象类型之间的关系是什么：一对一、一对多、多对多
       3. 新的对象被添加到数据库中的频率
       4. 删除对象的频率
       5. 对象修改的频率
       6. 对象访问的频率
       7. 对象访问的方法：通过id?属性？比较？等等
       8. 对象类型的数组如何访问：id?共同属性值？等等
       
       **规范化与反规范化**
       
       **封顶集合**
       
       **原子写操作**
       
       **文件增长对数据库的影响**
       
       **索引、分片、复制**
       
       **大集合与大量集合的对比：尽量使用大量集合！**
       
       **数据的生命周期**
       
       **数据的可用性和性能**
       
37. mongodb安装
       
      **安装**
      
      下载压缩包，解压，然后将mongodb/bin目录添加到path环境变量即可
      
      **启动**
      
      *需要提前创建好<mongo_data_location>/data/db目录，要不然会启动失败
      
      ```
      mongod -dbpath <mongo_data_location>/data/db
      #如果没有dbpath参数，会在当前分区的根目录下去找/data/db目录
      ```
      
      **mongod的命令行参数**
      
      参数|说明
      ---|---
      -h或--help|帮助
      --version|版本
      --config<文件名>或-f <文件名>|指定包含运行时配置的配置文件
      --verbose或-v|增加发送到控制的，并写入--logpath日志文件的内容
      --quiet|减少发送到控制台和日志文件的内容
      --port<端口>|指定mongod监听的tcp端口，默认27017
      --bind_ip<ip地址>|指定mongod绑定的ip，默认是所有
      --maxConns<编号>|指定最大并发连接数，最大是20000
      --logpath<路径>|指定日志路径，重启数据库时会被覆盖，除非还指定--logappend
      --auth|对远程主机连接启用身份验证
      --dbpath<路径>|指定mongod实例用来存储数据的目录
      --nohttpinterface|禁用http接口
      --nojournal|禁用日志
      --norealloc|禁止预分配数据文件，从而缩短启动时间，但会影响性能
      --repair|在所有数据库上运行修复程序
      
      **停止数据库**
      
      ```
        #最好的方法是从shell客户端
        use admin
        db.shutdownServer()
      ```
      
      **安装包文件说明**
      
      名称|说明
      :---|:---
      bsondump.exe|用于将导出的BSON文件格式转换为JSON格式
      mongo.exe|mongoDB的客户端
      mongod.exe|用于启动mongoDB的Server
      mongod.pdb|
      mongodump.exe|用于从mongodb数据库中导出BSON格式的文件，类似于MySQL的dump工具mysqldump
      mongoexport.exe|用于将mongodb中的数据库，导出为JSON,CSV或TSV的格式。
      mongofiles.exe|用于和mongoDB的GridFS文件系统交互的命令，并可操作其中的文件，它提供了我们本地系统与GridFS文件系统之间的存储对象接口。
      mongoimport.exe|用于将JSON,CSV或TSV等文件格式，导入到mongoDB数据库中。
      mongooplog.exe|于从运行的mongod服务中拷贝运行日志到指定的服务器，主要用于增量备份。
      mongoperf.exe|用于独立检查mongoDB的I/O性能的工具。
      mongorestore.exe|用于恢复导出的BSON文件到mongodb数据库中。
      mongos.exe|用于注册系统处理
      mongos.pdb|
      mongostat.exe|当前mongod状态监控工具，像linux中监控linux的vmstat
      mongotop.exe|提供了一个跟踪mongod数据库花费在读写数据的时间，为每个collection都会记录，默认记录时间是按秒记录。
      dbname.0 |数据文件
      dbname.ns文件|存储命名空间信息。
      
38. 从shell访问mongodb

执行mongo.exe

常用命令

``` 
#查看数据库
show dbs
#切换数据库
use dbname
#查看表/文档
show tables/collections
#查看帮助
help
       db.help()                    help on db methods
       db.mycoll.help()             help on collection methods
       sh.help()                    sharding helpers
       rs.help()                    replica set helpers
       help admin                   administrative help
       help connect                 connecting to a db help
       help keys                    key shortcuts
       help misc                    misc things to know
       help mr                      mapreduce

       show dbs                     show database names
       show collections             show collections in current database
       show users                   show users in current database
       show profile                 show most recent system.profile entries with time >= 1ms
       show logs                    show the accessible logger names
       show log [name]              prints out the last segment of log in memory, 'global' is default
       use <db_name>                set current database
       db.foo.find()                list objects in collection foo
       db.foo.find( { a : 1 } )     list objects in foo where a == 1
       it                           result of the last line evaluated; use to further iterate
       DBQuery.shellBatchSize = x   set default number of items to display on shell
       exit                         quit the mongo shell
 
#建库--隐式创建
use newdbname

#建表--显式创建--没有任何意义,因为是文档类型,并不是固定格式的
db.createCollection('tablename');
#建表--隐式创建
db.tablename.insert({xxxxx}); #直接插入文档即可

#删除表
db.tablename.drop()

#删除库
先use dbname,然后 db.dropDatabase();--删除当前库



```

39. 权限相关

创建用户，并启用用户验证

用户可以分为用户管理员和数据库管理员，但不强制这么分类

角色|说明
:---|:---
read|允许用户从数据库的任何集合中读取数据
readAnyDatabase|同read，但针对所有数据库
readWrite|读写
readWriteAnyDatabase|读写所有数据库
dbAdmin|允许读写，以及清理/修改/压缩/得到统计概要等
dbAdminAnyDatabase|同上，但针对所有数据库
clusterAdmin|允许执行一般的管理，如连接/集群/复制/列出数据库/删除数据库
userAdmin|允许创建和修改数据库的用户账户
userAdmin|同上，但针对所有数据库

列出用户的命令
```
use xxx  //切换库
show users //显示用户
db.system.users.find() //这个也可以

```

用户属性：

字段|格式|说明
:---|:---|:---
user|string|用户名
roles|array|角色名数组
pwd|hashorstring|密码
userSource|<database>|可选，可代替pwd，但与pwd互斥
otherDBRoles|{<database>:[array],<database>:[array]}|可选，对其他数据库的操作权限

配置用户管理员账户
```
use admin
db.createUser({
    user:'userAdmin',
    pwd:'123123',
    roles:['userAdminAnyDatabase']
})

//注：具有AnyDatabase权限的用户，只能在admin库里创建
//注：教程中使用的addUser已经不支持
```

启用身份验证

```
//启动mongo时，添加--auth参数
mongod --dbpath "c:/data" --auth
```

使用用户登录mongo shell

```
//方法一：
mongo  //打开shell
use admin //切换库
db.auth('username','pwd'); //验证，注意引号

//方法二:

mongo admin -u username -p pwd  //注意，不要有引号



```

创建数据库管理员账户

```
use admin
db.createUser({
    user:'dbadmin',
    pwd:'123123',
    roles:['readWriteAnyDatabase','dbAdminAnyDatabase','clusterAdmin']
});
```

创建集合

```
//既可以显式创建，也可以隐式创建

//隐式创建
直接调用db.tablename.insert({xxxx})等方法

//显式创建
db.createCollection('tablename',[options]);

options属性：
capped,如果为true，则为封顶集合
size,封顶集合的大小,单位时字节
max，封顶集合的最大文档数
autoIndexID，默认为true,自动为添加到集合的每个文档创建一个_id字段，并实现索引。封顶集合应为false


```

增删改查(shell中)

注：这里没有进行详细的学习，在nodejs+mongo阶段，在进行深入学习

集合的操作，<br>
可以使用db.tablename.xxx,<br>
也可以使用 var coll=db.getCollection('tablename');获取游标，<br>
然后通过游标操作  coll.find()

查询
db.tablename.find({xx:xx})

插入
db.tablename.insert({xx:xx})
或者 db.tablename.save({xxx:xx})

删除
db.tablename.remove({})

更新
db.tablename.update({xxxx:xxx,xxx:xxx})

40. node.js+mongodb原生驱动

* 安装mongodb驱动模块

    npm install mongodb
    
* 使用MongoClient.open方法连接数据库(mongodb1.4之前版本支持此方法,现在的版本不支持,这里的实验重在练习)    
    
    注:教程中使用的mongodb模块较老(1.4),当前版本为2.2,很多api已经不支持,比如mongoClient.open
    注:下面的试验,使用 npm install mongodb@1.4,然后进行试验
    
* 写入关注
    
    级别|说明
    :---|:---
    -1|网络错误被忽略
    0|写确认是不必要的
    1|请求写确认
    2|写确认请求跨主服务器和副本集中的一个辅助服务器
    majority|写确认是从副本集的主服务器请求的
    
    基本思想:强的写入关注告诉mongodb,在作出反应之前保持等待,知道一个写入被成功的写入磁盘.
    
* Server对象
    
   这个对象定义了Mongodb驱动程序应该怎样连接到服务器。
   Server对象包含诸如创建连接时所使用的主机/端口/池以及超时信息等
   
   用来创建MongoClient连接的Server对象的选项
   
   选项|说明
   :---|:---
   readPrefernce|指定从副本集读取对象时使用的读取首选项.设置读取首选项可以优化读取操作,如仅从辅助服务器读取以释放主服务器.详细:略
   ssl|布尔值,当设置为true时,表示启用ssl,需要指定sslCA/sslCert/sslKey和sslPass选项来设置ssl证书颁发机构/证书/秘钥和密码
   poolSize|指定在服务器连接池使用的连接数量,默认是5.
   sokcetOptions|定义套接字创建选项,如下:<br>noDelay,布尔值,指定无延迟套接字<br>keepAlibe,指定套接字保持活动的时间<br>connectTimeoutMS,指定连接在超时之前等待的时间,单位是毫秒<br>socketTimeoutMS,指定套接字超时之前等待的时间
   auto_reconnect|布尔值,当为true时,表示该客户端在遇到错误时将尝试重新连接
   
* 通过Client对象连接到mongoDB
   
   使用MongoClient对象连接到Mongodb,可以分为几步,创建客户端实例,打开到数据库的连接,如果需要,验证到数据库,然后处理注销和关闭.
   
   1. 创建MongoClient实例
   
   MongoClient(Server,option);
   Server对象作为第一个参数,数据库的连接选项的对象options作为第二个参数.
   
   数据库连接选项:
   
   选项|说明
   :---|:---
   w|写入关注级别
   wtimeout|指定等待写入关注结束的时间量,单位是毫秒.这个值会被加到正常的超时值上
   fsync|布尔值,当为true时,让写请求在返回前等待fsync完成
   journal|布尔值,当为true时,让写请求在返回前等待日志同步完成
   retryMilliSeconds|指定重试连接时等待的毫秒数,默认5000
   numberOfRetries|指定失败之前重试连接的次数,默认5
   bufferMaxEntries|指定连接失败前被缓冲等待连接操作的最大数量,默认-1,无限制
   
   示例:
   var client=new MongoClient(new Server('localhost',27017,{poolSize:5}),{retryMilliSeconds:500})
   
   2. 创建连接
   
   client.open(function(err,client){})
   
   3. 创建数据库对象
   
   var db=client.db('dbname');
   
   4. 身份验证,如果需要的话
   
   db.authenticate('username','password',function(err,results){});
   
   5. 注销数据库
   
   db.logout()
   
   6. 关闭mongodb连接
   
   client.close()
   
   * 示例参见 mongodb驱动试验\mongo1.4/MongoClient对象实例连接到Mongodb_db_conect_object.js
   
   注意: 该教程使用mongodb@1.4版本,执行时报错 { Error: Cannot find module '../build/Release/bson' <br> 
   原因是bson模块的文件结构已经变了,解决方法,复制 node_modules\bson\browser_build 到 node_modules\bson\build\Release <br>
   另外,需要在数据库中,提前创建好用户<br>
   use testdb;
   db.createUser({
    user:'dbadmin',
    pwd:'123123',
    roles:['readWrite']
    });
    db.auth('dbadmin','123123');
    
*  使用MongoClient连接字符串方法连接数据库(这种方法更好)
    
    MongoClient.connect(connString,options,callback);
    
    connString字符串的语法格式:
    mongodb://username:password@host:port/database?options
    
    callback第一个参数是err,第二个参数是db对象实例
    
    * 示例参见: mongodb驱动试验\MongoClient使用连接字符串连接数据库db_connect_string.js
    
    注: 此实验使用mongodb 2.2版,且教程中options参数也比较老了
    
    *由于教程中使用的mongodb模块比较老,教程中的部分方法已经不再使用,下面的学习中,只参考教程完成里面的例子,但不完全安装教程来进行试验*
    
    
* 列出数据库  示例参见: mongodb驱动试验/MongoClient列出数据库.js
* 创建数据库  示例参见: mongodb驱动试验/MongoClient创建数据库.js
* 删除数据库  var newDB=db.db('newDB');//切换数据库 newDB.dropDatabase(function(err,result){})
* 数据库综合 示例参见:  mongodb驱动试验/MongoClient创建删除列出数据库db_create_list_delete.js
* 获取服务器状态 示例参见: mongodb驱动试验/MongoClient获取服务器状态.js
* 列出集合  示例参见: mongodb驱动试验/MongoClient列出集合.js
* 集合综合  示例参见: mongodb驱动试验/MongoClient创建删除列出集合collection_create_list_delete.js
* 集合的统计信息  示例参见: mongodb驱动试验/MongoClient集合统计信息collection_stat.js

下面是nodejs+mongodb驱动 文档的增删改查

文档更新时的常用运算符:

运算符|说明
:---|:---
$inc|指定递增字段,格式:field:inc_value
$rename|重命名字段,格式field:newName
$setOnInsert|设置当更新操作中,创建一个新闻当时,其字段的值,格式field:value
$set|设置现有文档中一个字段的值,格式field:new_value
$unset|删除指定字段,格式field:''
$|用作占位符,以更新符合一个更新中的查询条件的第一个元素
$addToSet|往数组中添加元素,仅当他在数组中不存在时才插入,格式array_field:new_value
$pop|删除数组中第一个或最后一个条目,如果pop_value=-1,删第一个,1删最后一个,格式array_field:pop_value
$pullAll|删除数组中的多个值,格式array_field:[value1,value2...]
$pull|删除与查询语句匹配的数组项,格式array_field:[<query>]
$push|将条目添加到数组,格式array_field:new_value
$each|修改$push和$addToSet运算符来追加多个条目用于数组更新,arrar_field:{$each:[value1,value2]}
$slice|修改$push运算符,限制更新的数组的大小,格式array_field:{$slice:num}
$sort|修改$push运算符,对数组重新排序
$bit|对整数值进行按位and和or更新,格式int_field:{and:<integer>}和int_field:{or:<integer>}


更改数据库时可以在options中指定的选项

选项|说明
:---|:---
w|写入级别
wtimeout|等待写入时间量
fsync|布尔值,为true时,等待fsync完成
journal|布尔值,为true时,等待日志写入完成
serializeFunctions|为true时,附加到对象的函数存储在文档中应进行序列化
forceServerObjectId|为true时,客户端设置的任何对象id,在插入过程中将被服务器覆盖
checkKeys|为true时,文档的键在插入时会进行检查,默认true
upsert|为true时,如果没有与更新匹配的文档,则插入
multi|当为true时,如果多个文档匹配,则都会被更新,如果false,只更第一个
new|为true时,表示返回由findAndModify方法新修改的对象,而不是返回修改前版本

    
* 文档插入  语法 insert(docs,options,callback) <br>
示例参见: mongodb驱动试验/mongodb文档插入doc_insert.js
* 简单查询  find  findOne  语法 find(query,[options],callback) <br> find返回可迭代的游标,findOne返回单个对象 <br>
对于游标,可以使用toArray或者each方法
<br>示例参见: mongodb驱动试验/mongodb文档简单查询doc_find.js
    
* 文档更新  语法 update(query,update,[options],[callback]) 
<br>示例参见:  mongodb驱动试验/mongodb文档更新doc_update.js    

* 原子修改 单个文档原子写,防止写入时其他进程同时写入同一文档<br> 语法 findAndModify(query,sort,update,[options],callback),其中sort是个数组,如[['name',1],['type':-1]]<br>
示例参见: mongodb驱动试验/mongodb文档原子修改doc_modify.js
    
* 试验save方法保存文档,比insert和update简单,但是效率低,优点是可以同时满足插入和更新 <br> 语法 save(doc,[options],callback);
<br> 示例参见: mongodb驱动试验/mongodb文档的save方法doc_save.js

* 试验upsert方法  示例参见: mongodb驱动试验/mongodb文档的upsert方法doc_upsert.js
* 删除文档  语法: remove(query,[options],callback)示例参见: mongodb驱动试验/mongodb文档的删除doc_remove.js

* 删除单个文档,原子的  语法 findAndRemove(query,sort,[options],callback); 
<br> 示例参见: mongodb驱动试验/mongodb删除单个文档doc_remove_one.js

------------
下面学习 高级查询 包括排序/限制/分组/聚合等等等等

数据准备,教程提供的generate_data.js,在nodejs里执行以下即可,这个脚本中,显示定义了一个单词的数组,
然后分别统计每个单词中的元音和非元音的个数,然后组装成一个对象数据,保存到数据库中.

* query对象运算符

运算符|说明
:---|:---
field:value|等于
$gt|大于,如{size:{$gt:5}}
$gte|大于等于
$lt|小于
$lte|小于等于
$ne|不等于
$in|匹配数组中任意项,如 {name:{$in:['zhangsan','lisi']}}
$nin|匹配不再数组中的项
$or|或者,数组,用于连接多个查询,如 {$or:[{size:{$gt:5}},{size:{$lt:3}}]}
$and|并且,数组
$nor|数组,都不匹配的
$not|反转表达式
$exists|字段存在,布尔型,如 {name:{$exists:true}}
$type|匹配指定类型,值为类型号,在最前边学习mongodb数据类型时列出过
$mod|取模运算,数组,第一个是除数,第二个是余数,如{age:{$mod:[2,0]}}
$regex|正则表达式匹配
$all|数组,必须匹配数组中所有的项
$elemMatch|子文档的数组中的元素,匹配所有指定条件的文档(暂时理解为,文档的某个字段是数组,但数组的元素还是文档,这里匹配的是数组中的文档),如{myArr:{$elemMatch:{age:{$gt:5}},{size:{$gt:3}}}}
$size|匹配数组字段指定大小的文档,如{myArr:{$size:5}}

* options对象

查询文档时,可以在options中设置的项
    
选项|说明
:---|:---
limit|返回文档的最大数量
sort|排序,数组,1正序,-1倒序 注:当前版本可以使用对象,如sort:{name:1}
fields|显示的字段,1显示-1不显示,不能同时使用两者
skip|跳过的文档数
hint|使用特定的索引
explain|执行计划
snapshot|如果true,则创建快照查询
timeout|如果true,则游标允许超时
maxScan|扫描的文档的最大数量,当文档数非常非常大时,不能让查询永远查询下去
comment|指定将在mongodb日志中输出的字符串,便于诊断问题
readPreference|指定从哪个服务器上读
numberOfRetries|重试次数
partial|如果true,则表示对分片系统间共享的数据进行查询时,游标会返回部分结果

按照教程顺序开始试验

* 查找一组特定的文档  示例参见 mongodb驱动试验/mongodb查找特定文档doc_query.js
* 统计数量,计数 语法: count([query],[options],callback); 示例参见: 示例参见 mongodb驱动试验/mongodb文档计数doc_count.js
* 对结果集进行限制 如数量/字段/分页等(options中的选项)
    * 数量 limit    示例参见: mongodb驱动试验/mongodb文档数量限制doc_limit.js
    * 显示字段 field 示例参见: mongodb驱动试验/mongodb文档显示字段限制doc_field.js
    * 分页  skip+limit+sort 一定要排序,保证顺序一致  示例参见: mongodb驱动试验/mongodb文档分页doc_paging.js
    * 排序 sort 略
    * 查找不通值(去重) distinct 语法 distinct(key,[query],[options],callback) 示例参见: mongodb驱动试验/mongodb文档去重doc_distinct.js
    * 结果分组 group 注:此方法在高版本mongodb中已经不支持,使用聚合方法来实现  语法 group(keys,query,initial,reduce,finalize,command,[options],callback);
        说明: <br>
        keys,分组依据,可以是数组/对象或函数;<br>
        query,查询对象;<br>
        initial,汇总时,初始对象;<br>
        reduce,函数,两个参数,obj和prev,obj指当前文档,prev指initial中指定的对象,意思是,当发现一个文档时,对prev进行相应的处理,比如计数/求和等等<br>
        finalize,函数,参数是obj,从initial中的到的对象,进过reduce加工后的最终对象<br>
        command:布尔值,默认true.为true时,使用内部group命令,而不是eval()<br>
        options:可以定义readPreference选项<br>
        callback:回调函数<br>
        * 示例参见: mongodb驱动试验/mongodb文档分组doc_group.js   //由于版本问题,示例执行失败
    
    * <b>聚合函数 aggregate 语法 aggregate(operation,[options],callback); <br>
     operation: 聚合运算符的数组;管道,结果传输到下一个运算符,$加上字段名,表示引用字段值 <br>
     常用聚合运算符<b><br>
     
     ###聚合函数很重要,很强大,需要深入学习一下
     
	运算符|说明
	:---|:---
	$project|通过重命名/添加或删除字段重塑文档,也可以重新计算值,并添加子文档,如:<br>a. 包括title,不包括name,{$project:{title:1,name:0}}<br>b. name重命名为title {$project:{title:"$name"}}<br>c.新增total字段,值为xx和xx的和,{$project:{total:{$add:["$price","$tax"]}}}
	$match|匹配,查询,{$match:{value:{$gt:5}}}
	$limit|限制数量,{$limit:5}
	$skip|跳过的文档数量,{$skip:10}
	$unwind|分割数组字段,并为每个值创建一个单独的文档,{$unwind:"$myArr"}  //我的理解是行转列
	$group|分组
	$sort|排序
		
	*$group表达式运算符*
		
	运算符|说明
	:---|:---
	$addToSet|返回一组文档中所有文档所选字段的全部唯一值的数组,例如:colors:{$addToSet:"$color"} //我的理解是列转行,并且去重
	$first|返回一组文档中一个字段的第一个值,如firstValue:{$first:"$value"}
	$last|同上,最后一个值
	$max|最大值
	$min|最小值
	$avg|平均值
	$push|返回一组文档中所有文档所选字段的全部值的数组 //我的理解是 列转行,不去重
	$sum|求和
	
	*可用在聚合表达式的字符串和算数运算符*
	
	运算符|说明
	:---|:---
	$add|求和
	$divide|第一个数除以第二个数,如:valuePlus5:{$divide:["$value",5]}
	$mod|取模
	$multiply|乘积
	$subtract|差
	$concat|连接两个字符串
	$strcasecmp|比较两个字符串,并返回一个整数反映比较的结果. ???不懂
	$substr|字符串包含
	$toLower|小写
	$toUpper|大写
	
	* 示例参见:mongodb驱动试验/mongodb文档聚合doc_aggregate.js  

		重点 分组 限制 排序 分组的运算符 字符串数组算数运算符<br>
		分组:类似于sql中的group by <br>
	
        
        
        

41. nodejs+mongoose模块

    
    