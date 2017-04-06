/**
 * Created by Administrator on 2017/4/6.
 */
//缓冲切片
var numbers=new Buffer("123456789");
console.log(numbers.toString());

//切片，截取索引3-6的片段
var slice=numbers.slice(3,6);
console.log(slice.toString());

//修改
slice[0]='#'.charCodeAt(0);
slice[slice.length-1]='#'.charCodeAt(0);

console.log(slice.toString());
//对原缓冲造成影响
console.log(numbers.toString());
