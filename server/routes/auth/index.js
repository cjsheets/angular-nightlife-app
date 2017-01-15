/* -----------------------------------|
 *|  Router  ::  Authorization
 *|
 *|  Handles any routes delivered to /auth/...
 */
var express     = require('express')
var passport    = require('passport');
var authHelper  = require('../authHelper')
var router      = express.Router()

/**
 * Authorization route for Facebook provider
 */
router.get('/facebook',
  passport.authenticate('facebook', { scope : 'email' }));

// Handle callback after Facebook authentication
router.get('/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect : '/profile',
    failureRedirect : '/'
  })
);

/**
 * Authorization route for Twitter provider
 */
router.get('/twitter',
  passport.authenticate('twitter'));

// Handle callback after Twitter authentication
router.get('/twitter/callback',
  passport.authenticate('twitter', {
    successRedirect : '/profile',
    failureRedirect : '/'
  })
);

/**
 * Authorization route for Google provider
 */
router.get('/google',
  passport.authenticate('google', { scope : ['profile', 'email'] }));

// Handle callback after Google authentication
router.get('/google/callback',
  passport.authenticate('google', {
    successRedirect : '/profile',
    failureRedirect : '/'
  })
);

module.exports = router;