var express = require('express');
var router = express.Router();

//导入用户控制类
var users=require('../controllers/user_controllers');

/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.session.user){
        res.render('index', { username: req.session.username,msg:req.session.msg });
    }else{
        req.session.msg='用户信息失效，请重新登录！';
        res.redirect('/login');
    }

});

//用户注册页
router.get('/signup',function (req,res,next) {
    res.render('signup',{msg:req.session.msg})
});
//用户注册提交处理
router.post('/doSignup',users.doSignup);


//用户登录页
router.get('/login',function (req,res,next) {
    res.render('login',{msg:req.session.msg})
});
//用户登录提交处理
router.post('/doLogin',users.doLogin);

//用户注销--清空session并跳转到登录页
router.get('/logout',function (req,res) {
    req.session.destroy(function () {
        res.redirect('/login');
    });
});


//用户信息--通过函数直接返回
router.get('/userinfo1',users.userInfo1);

//用户信息--页面通过angularjs主动拉用户信息
//页面通过ajax获取信息，而不是通过路由函数传递这些信息，这样更容易控制和维护
router.get('/userinfo2',function (req,res) {
    if(req.session.user){
        res.render('userinfoB',{msg:req.session.msg});
    }else{
        req.session.msg='获取用户信息失败，请重新登录!';
        res.redirect('/login');
    }
});
//用户信息页调用此方法，获取用户信息，然后展示
router.get('/getUserInfo',users.getUserInfo);


//更新用户信息
router.post('/doUserUpdate',users.doUserUpate);

//删除用户
router.post('/doUserDelete',users.doUserDelete);

//添加测试页，用于调试
router.get('/test',function (req,res,next) {
    res.render('test',{msg:'测试页'})
})

module.exports = router;
