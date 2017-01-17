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

var getUserAttendance = require('../../controllers').getUserAttendance;
router.get('/get', authHelper.isAuth, function(req, res) {
  getUserAttendance(req.user._id).then(function(venues) {
    response.json(venues);
  }).catch(function(error) {
    response.json(error);
  });
});



// var getUserAttendance = require('../../controllers').getUserAttendance;
// router.get('/get/:id', authHelper.isAuth, function(req, res) {
//   var offset = request.query.offset || 0;
//   var limit = request.query.limit || 50;
//   var desc = request.query.desc || false;
//   getUserAttendance(offset, limit, desc).then(function(users) {
//     response.json(users);
//   }).catch(function(error) {
//     response.json(error);
//   });
// });

// var getVenueAttendance = require('../../controllers').getVenueAttendance;
// router.get('/get_v', authHelper.isAuth, function(req, res) {
//   var offset = request.query.offset || 0;
//   var limit = request.query.limit || 50;
//   var desc = request.query.desc || false;
//   getVenueAttendance(offset, limit, desc).then(function(users) {
//     response.json(users);
//   }).catch(function(error) {
//     response.json(error);
//   });
// });

// var setUserAttendance = require('../../controllers').setUserAttendance;
// router.get('/set', authHelper.isAuth, function(req, res) {
//   var offset = request.query.offset || 0;
//   var limit = request.query.limit || 50;
//   var desc = request.query.desc || false;
//   setUserAttendance(offset, limit, desc).then(function(users) {
//     response.json(users);
//   }).catch(function(error) {
//     response.json(error);
//   });
// });

debug('Routes initialized successfully');
module.exports = router;