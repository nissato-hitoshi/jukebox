var express = require('express');
var router = express.Router();
var data = require('../config/navbar.json');

var mongodb = require('mongodb');
var movies;

mongodb.MongoClient.connect("mongodb://localhost:27017/jukebox", function(err, db) {
  movies = db.collection("movies");
});

/* GET home page. */
router.get('/', function(req, res) {
  
  movies.find().sort({ playCount: 1,  registeredDate: 1 }).toArray(function(err, items) {
    if (err) {
      res.json({ result : false,  message: err });
    } else {
      res.render('index', { navbar: data, items : items });
    }
  });
});

module.exports = router;
