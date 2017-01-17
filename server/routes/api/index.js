/* -----------------------------------|
 *|  Router  ::  API
 *|
 *|  Handles any routes delivered to /auth/...
 */
var express     = require('express')
var passport    = require('passport');
var authHelper  = require('../authHelper')
var debug       = require('debug')('router:api');
var router      = express.Router()

// Import all other route modules
router.use('/nightlife', require('./nightlife'));

// User is authenticated
router.get('/authenticated', authHelper.isAuth, function(req, res, next) {
  res.json({"authenticated": true});
});


debug('Routes initialized successfully');
module.exports = router;