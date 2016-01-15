var express = require('express');
var router = express.Router();
var data = require('../config/navbar.json');
var youTube = require('./youtube-node');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('search', { navbar: data });
});

router.post('/', function(req, res) {
  var keyword = req.body.keyword;
 
  if (req.body.pageToken) {
    youTube.addParam('pageToken', req.body.pageToken);
  }

  youTube.addParam('order', 'viewCount');
  youTube.addParam('safeSearch', 'strict');
  youTube.addParam('type', 'video');
  youTube.addParam('type', 'video');
  
  youTube.search(keyword, 5, function(error, result) {
    if(error){
      console.log(error);
    }else{
      res.render('container', { navbar : data, videos : result });
    }    
  });
});

module.exports = router;
