/**
 * Created by malei on 2017/6/13.
 */
//引入用户模型
var UserModel = require('../models/user');

//用户注册
module.exports.reg = {
    get: function (req, res) {
        //res.send('注册成功ff')
        res.render('reg', {title: '用户注册'});
    },
    post: function (req, res) {
        var postData = {
            username: req.body.username,
            password: req.body.password
        };
        //console.log(postData);
        var resJson = {
            status: false,
            msg: ''
        };
        UserModel.findOne({
            username: postData.username
        }, function (err, data) {
            if (err) console.log(err);
            if (data) {
                resJson.msg = '用户名已存在';
                res.send(resJson);
            } else {
                UserModel.create(postData, function (err, data) {
                    if (err) {
                        resJson.msg = "注册失败";
                        resJson.err = err;
                        res.send(resJson);
                    } else {
                        req.session.user = data;
                        resJson.status = true;
                        resJson.msg = '注册成功';
                        res.send(resJson);
                    }
                });
                //res.send('注册成功');
            }
        });
    }
};

//用户登录
module.exports.login = {
    get: function (req, res) {
        //res.send('登录页面');
        res.render('login', {title: '用户登录'});
    },
    post: function (req, res) {
        var postData = {
            username: req.body.username,
            password: req.body.password
        };

        var resJson = {
            status: false,
            msg: ''
        };

        UserModel.findOne({
            username: postData.username
        }, function (err, data) {
            if (err) {
                resJson.msg = '登录失败';
                res.send(resJson);
            }
            ;
            if (data) {
                if (data.password == postData.password) {
                    req.session.user = data;
                    resJson.status = true;
                    resJson.msg = '登录成功';
                    res.send(resJson);
                } else {
                    resJson.msg = '密码错误';
                    res.send(resJson);
                }

            } else {
                resJson.msg = '没有此用户';
                res.send(resJson);
            }

        });
        // res.send('登录成功')
    }
};

//用户注销
module.exports.logout = {
    get: function (req, res) {
        delete req.session.user;
        res.redirect('/login');
    }
};

//用户中心(个人信息)
module.exports.userinfo = {
    get: function (req, res) {
        //因为个人信息都在session.user中,并且赋值给了app.locals.user,所以用户信息可以直接通过user变量得到
        //使用userinfo页面展示出来即可
        res.render('userinfo', {title: '个人中心'});
    }
};

//修改用户信息(因为当前用户模型只有用户名和密码,所以这里只修改密码)

module.exports.useredit={
    get:function (req,res) {
        //同上,调用user变量中的信息,只是把页面上的元素内容变为可修改
        res.render('useredit',{title:'修改信息'});
    },
    post:function (req,res) {
        var resJson={
            status:false,
            msg:''
        };
        UserModel.update({_id:req.params._id},
            {$set:{username:req.body.username,password:req.body.password}},function (err) {
                if(err){
                    resJson.msg='修改失败';
                    console.log(err);
                    res.send(resJson);
                }else {
                    resJson.status=true;
                    resJson.msg='修改成功';
                    req.session.user={
                        _id:req.params._id,
                        username:req.body.username,
                        password:req.body.password
                    };
                    res.send(resJson);
                }
            });
        //res.send('修改完成');
    }
}
