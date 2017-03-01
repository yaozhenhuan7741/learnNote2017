/**
 * Created by Administrator on 2017/2/4.
 */
var express=require('express');
//var url=require('url');
var app=express();
app.listen(80);
app.get('/image',function (req,res) {
    res.sendFile('a.jpg',
        {maxAge:1,
        root:'./images/'},
        function (err) {
            if(err){
                console.log("Error: "+err);
            }else{
                console.log("Success");
            }
        });

});