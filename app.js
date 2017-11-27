var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongo = require("mongodb");
var monk = require("monk");
var db = monk("admin:admin@ds161931.mlab.com:61931/cpp");

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

//******************
var RateLimit = require('express-rate-limit');

//app.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc)

var limiter = new RateLimit({
    windowMs: 15*60*1000, // 15 minutes
    //windowMs: 1,
    delayAfter: 1,
    max: 30, // limit each IP to X requests per windowMs
    delayMs: 0 // disabled
});

// only apply to requests that begin with /api/
//app.use('/api/', limiter);
app.use(limiter);
//*******************


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// make db accessible to router
app.use(function(req, res, next){
    console.log("db connection...")
    req.db = db;
    //console.log(db)
    next();
})

app.use('/', index);
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
