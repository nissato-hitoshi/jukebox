var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var ECT = require('ect');

var routes = require('./routes/index');
var search = require('./routes/search');
var play = require('./routes/play');
var webapi = require('./routes/api/movies');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('ect', ECT({ watch: true, root: __dirname + '/views', ext: '.ect' }).render);
app.set('view engine', 'ect');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/playlist', routes);
app.use('/search', search);
app.use('/play', play);

app.get('/api/movies', webapi.index);
app.get('/api/movies/:id', webapi.show);
app.post('/api/movies', webapi.create);
app.put('/api/movies/:id', webapi.update);
app.delete('/api/movies/:id', webapi.destroy);
app.get('/api/updatePlayCount/:_id', webapi.updatePlayCount);
app.get('/api/getPlayVideoId', webapi.getPlayVideoId);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
