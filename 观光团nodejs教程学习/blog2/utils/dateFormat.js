/**
 * Created by malei on 2017/6/15.
 */
//时间格式化函数,第一个参数为时间戳,第二个参数为格式
//用法 dateFormat('xxxx','yyyy-MM-dd hh:mm:ss')

function dateFormat (indate,format) {
    //console.log('***********');
    //console.log(indate);
    _this=new Date(indate);
    var date = {
        "M+": _this.getMonth() + 1,
        "d+": _this.getDate(),
        "h+": _this.getHours(),
        "m+": _this.getMinutes(),
        "s+": _this.getSeconds(),
        "q+": Math.floor((_this.getMonth() + 3) / 3),
        "S+": _this.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (_this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1
                ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
        }
    }
    return format;
};

module.exports=dateFormat;