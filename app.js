
/**
 * Module dependencies.
 */

var express = require('express');
var expressValidator = require('express-validator');
var lessMiddleware = require('less-middleware');

// ROUTES
var blog = require('./routes/blog');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'your secret goes here' }));
  app.use(app.router);

  app.use(lessMiddleware({
      src: __dirname + '/public',
      compress: true,
      debug: true
  }));


  app.use(express.static(__dirname + '/public'));



});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes for the blog
app.get('/', blog.home);

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
