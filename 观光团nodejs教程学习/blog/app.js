var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//增加Mongo相关和session相关
var mongoose=require('mongoose');
mongoose.Promise=global.Promise;
var session=require('express-session');
var MongoStore=require('connect-mongo')(session);


var routes=require('./config/route');
// var index = require('./routes/index');
// var users = require('./routes/users');

var app = express();

//连接数据库
var dbConnection=mongoose.connect('mongodb://localhost/blog');


// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('.html',require('ejs').__express);

// Uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
    resave:false,
    saveUninitialized: true,
    secret:'11121',
    store:new MongoStore({
        url:'mongodb://localhost/blog'
    })
}));

routes(app);



module.exports = app;
