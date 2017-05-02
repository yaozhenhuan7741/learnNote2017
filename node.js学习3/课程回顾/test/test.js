/**
 * Created by Administrator on 2017/4/6.
 */
// var Path=require('path');
// var a=Path.join('./','ff','dd');
// console.log(a);

var  aa=['1','2','3'];

function ls(message,callback) {
    process.nextTick(function () {
        callback(message)
    })

}

for(var i in aa){
        ls(aa[i],function () {
            console.log(aa[i])
        });
}

aa.forEach(function (idx) {
    ls(idx,function () {
        console.log(idx)
    });
})

var qs=require('querystring');
var queryObj=qs.parse("name=malei&age=29&color=blue");
console.log(queryObj);