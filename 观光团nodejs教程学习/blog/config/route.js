/**
 * Created by malei on 2017/6/7.
 */
//自定义路由


var PluginUser=require('../plugin/user');
var PluginBlog=require('../plugin/blog');


module.exports = function (app) {

    app.use(function (req, res, next) {
        var user = req.session.user;
        app.locals.user = user;
        next();
    });


    app.get('/', function (req, res, next) {
        // res.send('这是首页！');
        res.render('index', {title: '首页'});
    });

    //登陆相关
    app.get('/login', PluginUser.loginNo,PluginUser.login.get);
    app.post('/login',PluginUser.login.post);


    app.get('/reg',PluginUser.loginNo,PluginUser.reg.get);

    app.post('/reg',PluginUser.reg.post);

    app.get('/user/:_id',PluginUser.user.get);


    app.get('/logout', PluginUser.logout.get);

    //发表微博
    app.get('/add',PluginUser.loginYes,PluginBlog.add.get);

    app.post('/add',PluginBlog.add.post );

    app.get('/view/:_id',PluginBlog.view.get);

    app.get('/list',PluginUser.loginYes,PluginBlog.list.get );
};