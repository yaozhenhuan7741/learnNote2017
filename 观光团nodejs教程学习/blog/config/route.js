/**
 * Created by malei on 2017/6/7.
 */
//自定义路由

var ModelUser = require('../model/user');
var ModelBlog = require('../model/blog');

module.exports = function (app) {

    app.use(function (req, res, next) {
        var user = req.session.user;
        app.locals.user = user;
        next();
    })


    app.get('/', function (req, res, next) {
        // res.send('这是首页！');
        res.render('index', {title: '首页'});
    });

    //登陆相关
    app.get('/login', function (req, res, next) {
        //res.send('登录');
        res.render('login', {title: '登录'})
    });
    app.post('/login', function (req, res, next) {
        var postData = {
            username: req.body.username
        };
        ModelUser.findOne(postData, function (err, data) {
            if (err) console.log(err);
            console.log(data);
            if (data) {
                if (data.password == req.body.password) {
                    req.session.user = data;
                    res.redirect('/user/' + data._id);
                    //res.send('登录成功');
                } else {
                    res.send('非法密码');
                }
            } else {
                res.send('无此用户');
                //console.log('aaa')
            }
        });


    });


    app.get('/reg', function (req, res, next) {
        //res.send('注册');
        res.render('reg', {title: '注册'})
    });

    app.post('/reg', function (req, res, next) {
        //console.log(req.body);
        var postData = {
            username: req.body.username,
            password: req.body.password
        };
        //console.log(postData);

        ModelUser.findOne({username: postData.username}, function (err, data) {
            if (err) console.log(err);
            if (data) {
                res.send('该用户名已被注册');
            } else {
                ModelUser.create(postData, function (err, data) {
                    if (err) console.log(err);
                    req.session.user = data;
                    res.send(data);
                });
            }
        });

    });

    app.get('/user/:_id', function (req, res, next) {
        //console.log(req.params);
        var getData = {
            // _id:req.param('_id')
            _id: req.params._id
        };
        if (getData._id) {
            ModelUser.findById(getData, function (err, data) {
                if (err) console.log(err);
                //console.log(data);
                if (data) {
                    res.render('userinfo', {
                        title: data.username + '的个人信息',
                        view: data
                    });
                } else {
                    res.send('查询不到您的个人信息');
                }
            });
        } else {
            res.send('非法访问')
        }

    });


    app.get('/logout', function (req, res, next) {
        //res.send('退出');
        delete req.session.user; //退出时先清理会话信息
        res.redirect('/');
    });

    //发表微博
    app.get('/add', function (req, res, next) {
        res.render('add', {title: '发表微博'});
    });

    app.post('/add', function (req, res, next) {
        var postData = {
            title: req.body.title,
            content: req.body.content
        };

        ModelBlog.create(postData, function (err, data) {
            if (err) console.log(err);
            res.redirect('/view/' + data._id);
            //res.send(data);
        });

        //res.send(postData);
    });

    app.get('/view/:_id', function (req, res, next) {
        var getData = {
            _id: req.params._id
        };
        ModelBlog.findOne(getData, function (err, data) {
            if (err) console.log(err);
            if (data) {
                res.render('view', {title: data.title, view: data});
            } else {
                res.send('此微博，不存在');
            }
        });

    });

    app.get('/list', function (req, res, next) {
        // ModelBlog.find({},function (err,data) {
        //     if(err) console.log(err);
        //     res.render('list',{title:'微博列表',blogs:data});
        // }); //不排序

        ModelBlog.find({}).sort({'_id': -1}).exec(function (err, data) {
            if (err) console.log(err);
            res.render('list', {title: '微博列表', blogs: data});
        });

    });
};