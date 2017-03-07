var express = require('express');
var router = express.Router();

//引入自定义的控制器
var photos=require('../controllers/photos_contorller');
var comments=require('../controllers/comments_contorller');
var pages=require('../controllers/pages_controller');


/* GET home page. */
router.get('/', function(req, res) {
  res.render('photos');
});

router.get('/photos',photos.getPhotos);
router.get('/photo',photos.getPhoto);
router.get('/page',pages.getPage);
router.get('/comments/get',comments.getComment);
router.post('/comments/add',comments.addComment);

module.exports = router;
