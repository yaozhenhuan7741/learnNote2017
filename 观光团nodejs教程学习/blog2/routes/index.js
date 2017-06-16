var express = require('express');
var router = express.Router();

var userCtrl=require('../controllers/userCtrl');
var blogCrtl=require('../controllers/blogCtrl');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//用户注册
router.get('/reg',userCtrl.LoginChk.mustNoLogin,userCtrl.reg.get);
router.post('/reg',userCtrl.reg.post);

//用户登录
router.get('/login',userCtrl.LoginChk.mustNoLogin,userCtrl.login.get);
router.post('/login',userCtrl.login.post);

//用户注销
router.get('/logout',userCtrl.LoginChk.mustLogin,userCtrl.logout.get);

//用户个人中心
router.get('/user/:_id',userCtrl.LoginChk.mustLogin,userCtrl.userinfo.get);

//修改用户信息(因为当前只有用户名和密码,所以只修改密码)
router.get('/user/:_id/edit',userCtrl.LoginChk.mustLogin,userCtrl.useredit.get);
router.post('/user/:_id/edit',userCtrl.useredit.post);


//发表微博
router.get('/add',userCtrl.LoginChk.mustLogin,blogCrtl.add.get);
router.post('/add',blogCrtl.add.post);

//查看微博
router.get('/view/:_id',userCtrl.LoginChk.mustLogin,blogCrtl.view.get);

//修改微博
router.post('/view/:_id/edit',userCtrl.LoginChk.mustLogin,blogCrtl.view.post);

//微博列表
router.get('/list',userCtrl.LoginChk.mustLogin,blogCrtl.list.get);


module.exports = router;
