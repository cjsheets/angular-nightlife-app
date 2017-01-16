/* -----------------------------------|
 *|  Router  ::  Development
 *|
 *|  Handles any routes delivered to /dev/...
 */
var express     = require('express')
var passport    = require('passport');
var authHelper  = require('../authHelper')
var env         = require('../../config/environment');
var debug       = require('debug')('router:dev');
var router      = express.Router()

if(env.express.dev_routes) {

  // Landing page, redirect assigned because it's also login page
  router.get('/', authHelper.returnTo, function(req, res, next) {
    debug('Debug panel landing page accessed');
    res.render('index.ejs'); // Debug landing page
  });

  // Login Form
  router.get('/login', authHelper.returnTo, function(req, res, next) {
    // render the page and pass in any flash data if it exists
    res.render('login.ejs', { message: req.flash('loginMessage') }); 
  });

  // Signup Form
  router.get('/signup', function(req, res, next) {
    // render the page and pass in any flash data if it exists
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  });

  // Protected session information page
  // Enabled for server debugging
  router.get('/profile', authHelper.isAuthOrRedirect, function(req, res, next) {
    res.render('profile.ejs', {user : req.user});
  });

  debug('Routes initialized successfully');
  module.exports = router;
}