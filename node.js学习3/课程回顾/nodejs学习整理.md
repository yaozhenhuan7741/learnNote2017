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