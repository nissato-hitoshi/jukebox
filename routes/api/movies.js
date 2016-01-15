var mongodb = require('mongodb');
var movies;

mongodb.MongoClient.connect("mongodb://localhost:27017/jukebox", function(err, db) {
  movies = db.collection("movies");
});

module.exports = {
    index : function (req, res) {
      movies.find().sort({ playCount: 1, registeredDate: 1 }).toArray(function(err, items) {
        if (err) {
          res.json({ result : false,  message: err });
        } else {
          res.json( items );
        }
      });
    },
    show : function (req, res) {
      movies.findOne({_id: mongodb.ObjectID(req.params.id)}, function(err, item) {
        if (err) {
          res.json({ result : false,  message: err });
        } else {
          res.json( item );
        }
      });
    },
    create : function (req, res, next) {
      var movie = req.body;
      
      movie.registeredDate = new Date();
      movie.playCount = 0;
      
      movies.save(movie, function(err) {
        if (err) {
          res.json({ result : false,  message: err });
        } else {
          res.json({ result : true, message: "insert success !!" });
        }
      });
    },
    update : function (req, res) {
        res.json({ message : "update in !!" });
    },
    destroy : function (req, res) {
      movies.remove({_id: mongodb.ObjectID(req.params.id)}, function(err) {
        if (err) {
          res.json({ result : false,  message: err });
        } else {
          res.json({ result : true, message: "delete success !!" });
        }
      });
    },
    getPlayVideoId: function (req, res) {
      movies.find().sort({ playCount: 1, registeredDate: 1 }).toArray(function(err, items) {
        if (err) {
          res.json({ result : false,  message: err });
        } else {
          var ret;
          var videoId = '';
          var _id = '';
          
          if (items.length > 0) {
            videoId = items[0].id.videoId;
            _id = items[0]._id;
          }

          ret = {
              returnCode : true,
              videoId : videoId,
              _id : _id
            };

          res.json( ret );
        }
      });
    },
    updatePlayCount: function(req, res) {
      var item;
      var count = 0;
 
      movies.find({ _id:  mongodb.ObjectID(req.params._id) }).toArray(function(err, items) {
        if (err) {
          res.json({ result : false,  message: err });
        } else {
          item = items[0];

          if (item.playCount) {
            count = item.playCount + 1;
          } else {
            count = 1;
          }
          movies.update({ _id: mongodb.ObjectID(req.params._id) }, { $set: { playCount: count }});
          res.json({ result : true, message: "updatePlayCount success !!" });
        }
      });
    }
};
