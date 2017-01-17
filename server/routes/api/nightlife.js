/* -----------------------------------|
 *|  Router  ::  API
 *|
 *|  Handles any routes delivered to /api/...
 */
var express     = require('express');
var passport    = require('passport');
var authHelper  = require('../authHelper');
var debug       = require('debug')('router:api:nightlife');
var router      = express.Router();

// User is authenticated
router.get('/authenticated', authHelper.isAuth, function(req, res, next) {
  res.json({"authenticated": true});
});

// Return the venues attended by the authenticated user
var getUserAttendance = require('../../controllers').getUserAttendance;
router.get('/my/venues', authHelper.isAuth, function(req, res) {
  getUserAttendance(req.user._id).then(function(venues) {
    res.json(venues);
  }).catch(function(error) {
    res.json(error);
  });
});

// Return the attendance number of each supplied venue_id
var getVenueAttendance = require('../../controllers').getVenueAttendance;
//router.get('/get_v', authHelper.isAuth, function(req, res) {
router.get('/venue/attendance', function(req, res) {
  var venues = req.query.venues || {};
  getVenueAttendance(venues).then(function(attendance) {
    res.json(attendance);
  }).catch(function(error) {
    res.json(error);
  });
});

// var setUserAttendance = require('../../controllers').setUserAttendance;
// router.get('/set', authHelper.isAuth, function(req, res) {
//   var offset = request.query.offset || 0;
//   var limit = request.query.limit || 50;
//   var desc = request.query.desc || false;
//   setUserAttendance(offset, limit, desc).then(function(users) {
//     res.json(users);
//   }).catch(function(error) {
//     res.json(error);
//   });
// });

debug('Routes initialized successfully');
module.exports = router;