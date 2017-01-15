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

module.exports = router;