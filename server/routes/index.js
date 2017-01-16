/* -----------------------------------|
 *|  Router  ::  Root
 */
var express     = require('express')
var passport    = require('passport');
var path        = require('path');
var authHelper  = require('./authHelper')
var env         = require('../config/environment');
var debug       = require('debug')('router:root');
var router      = express.Router()

// Import all other route modules
var auth        = require('./auth');
var dev         = require('./dev');

/**
 * Restrict access to pre-defined origins
 */
router.use(function(req, res, next) {
  var origin = req.headers.origin;
  if (env.express.allowed_origins.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

/**
 * "use" should be before any other route definitions
 */
router.use('/auth', auth);
if(env.express.dev_routes) router.use('/dev', dev);

// Return 404 for any undefined routes
// router.get(env.express.valid_routes, function(req, res, next) {
//   debug('Invalid route attempted.');
//   res.render('error.ejs', { message: req.flash('404, Page Not Found') });
// });

// Landing page
router.get('/', function(req, res, next) {
  debug('API root accessed. JSON response.');
  res.json({"apiRoot": true});
});

// Landing page
router.get('/nl', function(req, res, next) {
  debug('Route /nl accessed. Serving Angular site');
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

/**
 * Anything else under '/', facilitates Angular HTML 5 routing. Must
 * declare below all other routes to avoid catching their requests
 */
router.get('*', function(req, res, next) {
  debug('Catch-All route accessed. Serving index');
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
  //res.render('index');
});

debug('Routes initialized successfully');
module.exports = router;
