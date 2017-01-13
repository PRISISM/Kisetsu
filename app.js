var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var uglifyJs = require('uglify-js');
var fs = require('fs');

var index = require('./app_server/routes/index');

var routesApi = require('./app_api/routes/index');

var app = express();

if ((process.env.NODE_ENV || 'development') === 'development') {
  require('dotenv').load();
} 

// Put a database connection under var 'database' in .env file
mongoose.connect(process.env.database);

// On successful connection
mongoose.connection.on('connected', function () {  
  console.log('Mongoose default connection open to ' + process.env.database);
}); 

// If the connection throws an error
mongoose.connection.on('error',function (err) {  
  console.log('Mongoose default connection error: ' + err);
}); 

require('./app_api/models/anime');

// view engine setup
app.set('views', path.join(__dirname, 'app_server' ,'views'));
app.set('view engine', 'pug');

// UglifyJS
var appClientFiles = [
  'app_client/app.js',
  'app_client/ranking/ranking.controller.js',
  'app_client/home/home.controller.js',
  'app_client/navbar/navbar.controller.js',
  'app_client/common/services/aniData.service.js',
  'app_client/common/services/ratings.service.js',
  'app_client/common/directives/tooltip/tooltip.directive.js',
  'app_client/common/filters/formatCount.filter.js',
  'app_client/common/filters/formatRating.filter.js'
];

var uglified = uglifyJs.minify(appClientFiles, {compress: false});

fs.writeFile('public/angular/kisetsu.min.js', uglified.code, function(err) {
  if(err) {
    console.log(err);
  }
  else {
    console.log('Script generated and saved: kisetsu.min.js');
  }
});


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_client')));

app.use(index);
app.use('/api', routesApi);

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
