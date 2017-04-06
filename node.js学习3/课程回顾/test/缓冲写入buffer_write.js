/**
 * Created by Administrator on 2017/4/6.
 */
//buffer缓冲

//创建/写入缓冲区的几种方式
buf256=new Buffer(256);  //定义一个缓冲区
buf256.fill(0);          //用0填充

buf256.write('add some text');
console.log(buf256.toString());
buf256.write('more text',9,9);
console.log(buf256.toString());
buf256[18]=43;
console.log(buf256.toString());
