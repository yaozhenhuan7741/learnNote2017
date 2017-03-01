/**
 * Created by Administrator on 2017/2/4.
 */
var express = require('express');
var app = express();
app.use('/',express.static('./static'));
app.use('/images', express.static( './images'));
app.listen(80);

app.get('*',function (req,res) {
    console.log(req.url);
});