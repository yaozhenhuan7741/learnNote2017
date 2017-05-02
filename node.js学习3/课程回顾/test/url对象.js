/**
 * Created by Administrator on 2017/5/2.
 */
var url=require('url');
var urlStr='http://malei:123123@test.com:90/resource/path?query=stringaaa#hash';

console.log("当参数默认时")
var urlObj1=url.parse(urlStr);
console.log(urlObj1);

console.log("当parseQueryString为true时，解析的query为对象")
var urlObj2=url.parse(urlStr,true,false);
console.log(urlObj2);

console.log('重新将urlobj格式化为url字符串');
var urlStr2=url.format(urlObj2);
console.log(urlStr2);

console.log("--------------");
console.log('更改资源位置')
var newResource='/another/path?querynew=fff';
console.log(url.resolve(urlStr,newResource));