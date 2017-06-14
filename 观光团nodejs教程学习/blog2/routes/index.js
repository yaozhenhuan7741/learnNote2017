var express = require('express');
var router = express.Router();

var userCtrl=require('../controllers/userCtrl');
var blogCrtl=require('../controllers/blogCtrl');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//用户注册
router.get('/reg',userCtrl.reg.get);
router.post('/reg',userCtrl.reg.post);

//用户登录
router.get('/login',userCtrl.login.get);
router.post('/login',userCtrl.login.post);

//用户注销
router.get('/logout',userCtrl.logout.get);

//用户个人中心
router.get('/user/:_id',userCtrl.userinfo.get);

//修改用户信息(因为当前只有用户名和密码,所以只修改密码)
router.get('/user/:_id/edit',userCtrl.useredit.get);
router.post('/user/:_id/edit',userCtrl.useredit.post);


//发表微博
router.get('/add',blogCrtl.add.get);
router.post('/add',blogCrtl.add.post);

//查看微博
router.get('/view/:_id',blogCrtl.view.get);

//修改微博
router.post('/view/:_id/edit',blogCrtl.view.post);

//微博列表
router.get('/list',blogCrtl.list.get);


module.exports = router;
