//http://localhost:3000/?guid=5756d38ddd1213ac368b4567
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var index = require('./routes/index');
var users = require('./routes/users');
var na_campaign = require('./routes/not_available_campaign');

var app = express();

// view engine setup
app.engine('ejs', require('ejs-locals'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/not_available_campaign', na_campaign);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
    res.render('not_available_campaign', {'hide_branding': 0, 'code' : err.code});
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  var error = req.app.get('env') === 'development' ? err : {};
//console.log(err);
  // render the error page
  res.status(err.status || 500);
  res.render('error', {
      message: err.message,
      error: err

  });
});

module.exports = app;
