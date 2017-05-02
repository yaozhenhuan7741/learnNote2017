/**
 * Created by Administrator on 2017/5/2.
 */
//实现处理post请求的基本http服务器
var http=require('http');

http.createServer(function (req,res) {
    var jsonData='';
    //req为post请求发出的数据
    req.on('data',function (chunk) {
        jsonData+=chunk;
    });
    req.on('end',function () {
        var reqObj=JSON.parse(jsonData);
        var resObj={
          message:'hello '+reqObj.name,
          question:'Are you a good '+reqObj.occupation+'?'
        };
        res.writeHead(200);
        res.end(JSON.stringify(resObj));
    });

}).listen(3000);

