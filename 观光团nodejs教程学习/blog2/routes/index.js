var express = require('express');
var router = express.Router();

var userCtrl=require('../controllers/userCtrl');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/reg',userCtrl.reg.get);
router.post('/reg',userCtrl.reg.post);

module.exports = router;
