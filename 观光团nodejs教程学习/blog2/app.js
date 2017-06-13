var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//引入mongoose
var mongoose=require('mongoose');
mongoose.Promise=global.Promise;

//引入配置文件
var setting=require('./config/set.js');


//连接数据库
mongoose.connect(setting.url);


//引入session和connect-mongo
var session=require('express-session');
var MongoStore=require('connect-mongo')(session);

//在下边加入session调用的中间件


//路由
var index = require('./routes/index');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



//加入session处理的中间件,需要在调用路由之前
app.use(session({
    secret:'aaa',
    resave: true,
    saveUninitialized:true,
    store: new MongoStore({
        url: setting.url
    })
}));


//将session信息保存为本地变量
app.use(function (req,res,next) {
    var user=req.session.user;
    app.locals.user=user;

    //这一处待验证，使用app.locals还是res.locals
    //结论：使用app可以在登录成功后一直有效，res.locals只对只一次访问有效
    //需要放到路由调用的前面，因为部分页面需要调用user变量，如果放到路由后面，就会找不到变量
    next();
});

//调用路由
app.use('/', index);





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
