/**
 * Created by Administrator on 2017/1/23.
 */
var fs=require('fs');
var http=require('http');
var url=require('url');
var ROOT_DIR="html/";
http.createServer(function (req,res) {
    var urlObj=url.parse(req.url,true,false);
    fs.readFile(ROOT_DIR+urlObj.pathname,function (err,data) {
        if(err){
            res.writeHead(404);
            res.end(JSON.stringify(err));
        }
        res.writeHead(200);
        res.end(data);
    });
}).listen(3000,function () {
    console.log("http://127.0.0.1:3000/")
});