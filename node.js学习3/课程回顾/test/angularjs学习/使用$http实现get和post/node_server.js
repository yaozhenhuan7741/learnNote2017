/**
 * Created by Administrator on 2017/9/18.
 */
// 使用$http实现get和post---angularjs

var express=require('express');
var bodyParser=require('body-parser');
var app=express();

app.use('/',express.static('./'));


app.use(bodyParser.json());

var days=['星期一','星期二','星期三','星期四','星期五'];
var serviceDays=days.slice(0);

app.get('/reset/days',function (req,res) {
	serviceDays=days.slice(0);
	console.log(serviceDays);
	res.json(serviceDays);
});

app.post('/remove/day',function (req,res) {
	if (serviceDays.length > 2){
		serviceDays.splice(serviceDays.indexOf(req.body.day),1); //删除

		res.json(serviceDays);
	}else {
		res.send(400,{msg:'你最少工作两天!'});
	}
});
app.listen(3000,function () {
	console.log('http://127.0.0.1:3000/service_http.html')
});