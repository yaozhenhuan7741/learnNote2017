var express = require('express');
var router = express.Router();

var userCtrl=require('../controllers/userCtrl');

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


module.exports = router;
