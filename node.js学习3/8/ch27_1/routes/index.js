var express = require('express');
var router = express.Router();
var photos=require('../controllers/photos_conttorller');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('photos');
});

router.get('/photosList',photos.getPhotosList);

module.exports = router;
