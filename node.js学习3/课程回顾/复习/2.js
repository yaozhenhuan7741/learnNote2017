/**
 * Created by malei on 2017/5/2.
 */
var http=require('http');
var options={
    host:'php.weather.sina.com.cn',
    path:'/xml.php?city=%B1%B1%BE%A9&password=DJOYnieT8234jlsK&day=0',
    method:'GET'
}
http.request(options,function (res) {
    console.log(res);
}).end()