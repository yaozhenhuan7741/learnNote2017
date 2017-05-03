/**
 * Created by Administrator on 2017/5/2.
 */
//与外部源交互，例子为获取天气信息
//http://openweathermap.org/接口有变化，待修改

/**
使用某第三方免费天气接口 http://wthrcdn.etouch.cn/weather_mini?city=%E5%8C%97%E4%BA%AC
 其中，URL需要使用encodeURI转码，返回的结果，需要使用gunzip解压
*/
var http=require('http');
var url=require('url');
var qs=require('querystring');

var zlib=require('zlib');


function sendResponse(weatherData,res) {
    var page='<html><head><title>天气预报</title><meta charset="UTF-8"><meta></head>' +
        '<body>' +
        '<form method="post">' +
        '城市:<input name="city"><br>' +
        '<input type="submit" value="获取天气信息" >' +
        '</form>';
    if(weatherData){
        page+='<h1>天气信息</h1><p>' +
            weatherData +
            '</p>';
    };
    page+='</body></html>';
    res.end(page);
};

function parseWeather(weatherResponse,res) {

    var weatherData=[];
    weatherResponse.on('data',function (chunk) {
        weatherData.push(chunk);
    });
    weatherResponse.on('end',function () {
        var buffer=Buffer.concat(weatherData);
        //console.log(buffer.length);
        //console.log(weatherResponse.headers['content-encoding']);
        zlib.gunzip(buffer, function(err, decoded) {
            //console.log(err);
            //console.log(decoded.toString())
            if(decoded.desc=='OK'){
                console.log('获取天气信息成功')
            }else{
                console.log('获取天气信息失败')
            }
            sendResponse(decoded.toString(),res);
        });

    })

};

function getWeather(city,res) {
    console.log('获取'+city+'的天气信息')
    var options={
        host:'wthrcdn.etouch.cn',
        path:encodeURI('/weather_mini?city='+city),
        method:'GET',
    }

    http.request(options,function (weatherResponse) {
        parseWeather(weatherResponse,res);
    }).end();
};

http.createServer(function (req,res) {
    //console.log(req.method);
    if(req.method.toLowerCase()=="post"){
        var reqData='';
        req.on('data',function (chunk) {
            reqData+=chunk;
        });
        req.on('end',function () {
            var postParams=qs.parse(reqData);
            //console.log(postParams);
            getWeather(postParams.city,res);
        });

    }else{
        sendResponse(null,res);
    }
}).listen(3000);