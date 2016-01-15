var express = require('express');
var router = express.Router();
var data = require('../config/navbar.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('play', { navbar: data });
});

module.exports = router;