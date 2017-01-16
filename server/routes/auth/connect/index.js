/* -----------------------------------|
 *|  Router  ::  Authorization
 *|
 *|  Handles any routes delivered to /auth/...
 */
var express     = require('express')
var passport    = require('passport');
var authHelper  = require('../../authHelper')
var debug       = require('debug')('router:connect');
var router      = express.Router()

// locally --------------------------------
app.get('/local', function(req, res) {
res.render('connect-local.ejs', { message: req.flash('loginMessage') });
});
app.post('/local', passport.authenticate('local-signup', {
successRedirect : '/dev/profile', // redirect to the secure profile section
failureRedirect : '/dev/local', // redirect back to the signup page if there is an error
failureFlash : true // allow flash messages
}));

// facebook -------------------------------

// send to facebook to do the authentication
app.get('/facebook', passport.authorize('facebook', { scope : 'email' }));

// handle the callback after facebook has authorized the user
app.get('/facebook/callback',
passport.authorize('facebook', {
successRedirect : '/dev/profile',
failureRedirect : '/dev/'
}));

// twitter --------------------------------

// send to twitter to do the authentication
app.get('/twitter', passport.authorize('twitter', { scope : 'email' }));

// handle the callback after twitter has authorized the user
app.get('/twitter/callback',
passport.authorize('twitter', {
successRedirect : '/dev/profile',
failureRedirect : '/dev/'
}));


// google ---------------------------------

// send to google to do the authentication
app.get('/google', passport.authorize('google', { scope : ['profile', 'email'] }));

// the callback after google has authorized the user
app.get('/google/callback',
passport.authorize('google', {
successRedirect : '/dev/profile',
failureRedirect : '/dev/'
}));

// Signup Form - Process submission
// Enabled for server debugging
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

debug('Routes initialized successfully');
module.exports = router;