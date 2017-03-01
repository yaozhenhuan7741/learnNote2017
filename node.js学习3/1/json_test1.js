/**
 * Created by Administrator on 2017/1/19.
 */
var accountStr='{"name":"jedi","members":["Yoda","obi wan"],\
    "number":35421,"location":"a galaxy far,far away"}';
var accountObj=JSON.parse(accountStr); //字符串转对象
console.log(accountObj.name)

var newStr=JSON.stringify(accountObj);  //json转字符串
console.log(newStr)