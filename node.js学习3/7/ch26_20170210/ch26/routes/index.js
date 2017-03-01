var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: '首页' ,username:'马雷',msg:'测试信息'});
    //res.redirect('/login');
});

router.get('/login',function (req,res,next) {
    res.render('login',{title:'用户登录',msg:''})
});

router.get('/signup',function (req,res,next) {
    res.render('signup',{title:'用户注册',msg:''});
});

router.get('/user',function (req,res,next) {
    res.render('user',{title:'用户信息',msg:''});
});

router.get('/user/profile',function (req,res,next) {
    //for test1
    var user={username:'malei',email:'malei@tchzt.com',color:'blue'};
    res.json(user);
});
router.get('/user/profile3',function (req,res,next) {
    //for test3
    User.findOne({username:'malei'}).exec(function (err,user) {
        console.log(user);
        if(!user){
            user={};
        }
        res.json(user);
        });
});

router.get('/test',function (req,res,next) {
    res.render('user_test',{title:'用户信息',msg:''});
});

router.get('/test2',function (req,res,next) {
    res.render('user_test2',{user:{},title:'用户查询',msg:''});
});

router.get('/test3',function (req,res,next) {
    res.render('user_test3',{title:'用户查询'});
});

router.post('/test2',function (req,res,next) {
    // var user={username:'malei',email:'malei@tchzt.com',color:'blue'}
    // res.render('user_test2',{user:user});
    User.findOne({username:req.body.username}).exec(function (err,user) {
        var msg='';
        if(!user){
            user={};
            msg='用户未找到';
        };
        console.log(user);
        res.render('user_test2',{user:user,title:'用户查询',msg:msg});
    });
});
module.exports = router;
