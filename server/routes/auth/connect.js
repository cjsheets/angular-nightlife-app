/* -----------------------------------|
 *|  Router  ::  Authorization
 *|
 *|  Handles any routes delivered to /auth/...
 */
var express     = require('express')
var passport    = require('passport');
var authHelper  = require('../authHelper')
var debug       = require('debug')('router:connect');
var router      = express.Router()

/* -----------------------------------|
 *|  Auth Handlers for Post Data
 *|
 *|  Recieve and handle data from forms
 */

/**
 * Authorization route for Facebook, connect account
 */
router.get('/local', function(req, res) {
  res.render('connect-local.ejs', { message: req.flash('loginMessage') });
});
// Handle data posted from sign-up form
router.post('/local', function(req, res, next) {
  // Implement custom passport callback for req. access
  passport.authenticate('local-signup', function(err, user, info){
    debug('Local authentication: /signup')
    if (err) return next(err)
    if (!user) return res.redirect(req.session.returnTo || '/');
    req.logIn(user, function(err) {
      if (err) return next(err)
      req.flash();
      debug('Authentication Successful, return to: ' + req.session.returnTo || '/');
      return res.redirect(req.session.returnTo + '/profile' || '/');
    });
  })(req, res, next);
});

/* -----------------------------------|
 *|  Auth Handlers for 3rd Party Providers
 *|
 *|  See the commented-out Google handler
 *|  for an example of the standard passport
 *|  callback syntax
 */

/**
 * Authorization route for Facebook, connect account
 */
router.get('/facebook',
  passport.authorize('facebook', { scope : 'email' }));

// Handle callback after Facebook authorization
router.get('/facebook/callback', function(req, res, next) {
  // Implement custom passport callback for req. access
  passport.authorize('facebook', function(err, user, info){
    debug('Connect Facebook: authorize callback')
    if (err) return next(err)
    if (!user) return res.redirect(req.session.returnTo || '/');
    req.logIn(user, function(err) {
      if (err) return next(err)
      debug('Authorization Successful, return to: ' + req.session.returnTo || '/');
      return res.redirect(req.session.returnTo + '/profile' || '/');
    });
  })(req, res, next);
});

/**
 * Authorization route for Twitter, connect account
 */
router.get('/twitter',
  passport.authorize('twitter', { scope : 'email' }));

// Handle callback after Twitter authorization
router.get('/twitter/callback', function(req, res, next) {
  // Implement custom passport callback for req. access
  passport.authorize('twitter', function(err, user, info){
    debug('Connect Twitter: authorize callback')
    if (err) return next(err)
    if (!user) return res.redirect(req.session.returnTo || '/');
    req.logIn(user, function(err) {
      if (err) return next(err)
      debug('Authorization Successful, return to: ' + req.session.returnTo || '/');
      return res.redirect(req.session.returnTo + '/profile' || '/');
    });
  })(req, res, next);
});


/**
 * Authorization route for Google, connect account
 */
router.get('/google',
  passport.authorize('google', { scope : ['profile', 'email'] }));

// Handle callback after Google authorization
router.get('/google/callback', function(req, res, next) {
  // Implement custom passport callback for req. access
  passport.authorize('google', function(err, user, info){
    debug('Connect Google: authorize callback')
    if (err) return next(err)
    if (!user) return res.redirect(req.session.returnTo || '/');
    req.logIn(user, function(err) {
      if (err) return next(err)
      debug('Authorization Successful, return to: ' + req.session.returnTo || '/');
      return res.redirect(req.session.returnTo + '/profile' || '/');
    });
  })(req, res, next);
});

debug('Routes initialized successfully');
module.exports = router;