/**
 * Created by Administrator on 2017/5/2.
 */
//静态文件服务器
var fs=require('fs');
var http=require('http');
var url=require('url');
var ROOT_DIR="html/";
http.createServer(function (req,res) {
    var urlObj=url.parse(req.url,true,false);
    fs.readFile(ROOT_DIR+urlObj.pathname,function (err,data) {
        if(err){
            console.log('请求的文件不存在：'+ROOT_DIR+urlObj.pathname);
            res.writeHead(404);
            res.end(JSON.stringify(err));
            return;
        }
        res.writeHead(200);
        res.end(data,'utf-8');
    })
}).listen(3000,function () {
    console.log('服务器已启动，请访问 http://127.0.0.1:3000/1.jpg')
});