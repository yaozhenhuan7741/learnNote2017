/**
 * Created by Administrator on 2017/2/6.
 */
var express=require('express');
var bodyParser=require('body-parser');
var cookieParser=require('cookie-parser');
var expressSession=require('express-session');
var mongoStore=require('connect-mongo')({session:expressSession});
var mongoose=require('mongoose');

require('./models/users_model');

mongoose.Promise = global.Promise;
var conn=mongoose.connect('mongodb://localhost/myapp');

var app=express();
app.engine('.html',require('ejs').__express);
app.set('views',__dirname+'/views');
app.set('view engine','html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({
    secret:'fdsfdsf',
    cookie:{maxAge:10*1000},
    resave: true,
    saveUninitialized: true,
    store:new mongoStore(
        {
            mongooseConnection:mongoose.connection,
            collection:'sessions'
        })
}));

require('./routes')(app);
app.listen(80);