var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongo = require("mongodb");
var monk = require("monk");
var mongoose = require('mongoose');

mongoose.connect("mongodb://admin:admin@ds161931.mlab.com:61931/cpp");
var db = mongoose.connection;

var index = require('./routes/index');
var itemslist = require('./routes/itemslist');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(require('body-parser').json());
app.use(require('body-parser').urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// make db accessible to router
app.use(function(req, res, next){
    //console.log("db connection...")
    req.db = db;
    //console.log(db)
    next();
})

app.use('/', index);
app.use('/itemslist', itemslist);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;
