/* -----------------------------------|
 *|  Router  ::  API/Proxy
 *|
 *|  Handles any routes delivered to /api/proxy/...
 */


var express     = require('express');
var request     = require('request');
var passport    = require('passport');
var authHelper  = require('../authHelper');
var debug       = require('debug')('router:api:proxy');
var router      = express.Router();

// User is authenticated
router.get('/authenticated', authHelper.isAuth, function(req, res, next) {
  res.json({"authenticated": true});
});

router.get('/*', function(req, res) {
  var url = 'https://api.yelp.com/v3/businesses/search?' + require('url').parse(req.originalUrl).query;
  req.pipe(request(url)).pipe(res);
});

debug('Routes initialized successfully');
module.exports = router;