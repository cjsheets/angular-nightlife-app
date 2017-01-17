/* -----------------------------------|
 *|  Router  ::  Authentication
 *|
 *|  Handles any routes delivered to /auth/...
 */
var express     = require('express')
var passport    = require('passport');
var authHelper  = require('../authHelper')
var debug       = require('debug')('router:auth');
var router      = express.Router();

// Import all other route modules
router.use('/connect',  require('./connect'));

// User is authenticated
router.get('/valid', authHelper.isAuth, function(req, res, next) {
  res.json({"authenticated": true});
});

// Logout of passport authenticated session
router.get('/logout', function(req, res, next) {
  req.logout();
  debug('Logged out, return to: ' + (req.session.returnTo || '/'));
  res.json({"authenticated": false});
});
router.get('/logout_redir', function(req, res, next) {
  req.logout();
  debug('Logged out, return to: ' + (req.session.returnTo || '/'));
  res.redirect(req.session.returnTo || '/');
});

/* -----------------------------------|
 *|  Auth Handlers for Post Data
 *|
 *|  Recieve and handle data from forms
 */

/**
 * Local Authentication - Handle data posted from signup form
 */
router.post('/signup', function(req, res, next) {
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

/**
 * Authentication route for 'local' provider
 */
router.post('/login', function(req, res, next) {
  // Implement custom passport callback for req. access
  passport.authenticate('local-login', function(err, user, info){
    debug('Local authentication: /login')
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
 * Authentication route for Facebook provider
 */
router.get('/facebook',
  passport.authenticate('facebook', { scope : 'email' }));

// Handle callback after Facebook authentication
router.get('/facebook/callback', function(req, res, next) {
  // Implement custom passport callback for req. access
  passport.authenticate('facebook', function(err, user, info){
    debug('Facebook authentication callback: /facebook/callback')
    if (err) return next(err)
    if (!user) return res.redirect(req.session.returnTo || '/');
    req.logIn(user, function(err) {
      if (err) return next(err)
      debug('Authentication Successful, return to: ' + req.session.returnTo || '/');
      return res.redirect(req.session.returnTo + '/profile' || '/');
    });
  })(req, res, next);
});

/**
 * Authentication route for Twitter provider
 */
router.get('/twitter',
  passport.authenticate('twitter'));

// Handle callback after Twitter authentication
router.get('/twitter/callback', function(req, res, next) {
  // Implement custom passport callback for req. access
  passport.authenticate('twitter', function(err, user, info){
    debug('Twitter authentication callback: /twitter/callback, from: ' + req.session.returnTo)
    if (err) return next(err)
    if (!user) return res.redirect(req.session.returnTo || '/');
    req.logIn(user, function(err) {
      if (err) return next(err)
      debug('Authentication Successful, return to: ' + req.session.returnTo || '/');
      return res.redirect(req.session.returnTo + '/profile' || '/');
    });
  })(req, res, next);
});

/**
 * Authentication route for Google provider
 */
router.get('/google',
  passport.authenticate('google', { scope : ['profile', 'email'] }));

// Handle callback after Google authentication
router.get('/google/callback', function(req, res, next) {
  // Implement custom passport callback for req. access
  passport.authenticate('google', function(err, user, info){
    debug('Google authentication callback: /google/callback')
    if (err) return next(err)
    if (!user) return res.redirect(req.session.returnTo || '/');
    req.logIn(user, function(err) {
      if (err) return next(err)
      debug('Authentication Successful, return to: ' + req.session.returnTo || '/');
      return res.redirect(req.session.returnTo + '/profile' || '/');
    });
  })(req, res, next);
});
// // Standard callback handler for passport.js
// router.get('/google/callback',
//   passport.authenticate('google', {
//     successRedirect : '/search',
//     failureRedirect : '/'
//   })
// );

debug('Routes initialized successfully');
module.exports = router;