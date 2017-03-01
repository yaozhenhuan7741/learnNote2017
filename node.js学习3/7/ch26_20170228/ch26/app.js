var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//添加依赖
var expressSession=require('express-session');
var mongoStore=require('connect-mongo')({session:expressSession});
var mongoose=require('mongoose');
mongoose.Promise=global.Promise;

//导入user模型
require('./models/users_model');

//导入配置文件
var settings=require('./settings');

//创建数据库连接
mongoose.connect("mongodb://"+settings.host+":"+settings.port+"/"+settings.db);

var index = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

//修改引擎为html
//app.set('view engine', 'ejs');
app.engine('.html',require('ejs').__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//session设置，保存到mongodb中sessions中
app.use(expressSession({
    secret:'HELLO',
    cookie:{maxAge:60*60*1000}, //设置缓存有效期为1小时
    resave:true,
    saveUninitialized:true,
    store:new mongoStore({
      mongooseConnection: mongoose.connection, //参考connect-mongo官网例子
      collection:'sessions'
    })
}));


app.use('/', index);
//app.use('/users', users);

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
