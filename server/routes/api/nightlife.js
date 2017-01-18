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

// GET: Venues attended by the authenticated user
var getUserAttendance = require('../../controllers').getUserAttendance;
router.get('/my/venues', authHelper.isAuth, function(req, res) {
  getUserAttendance(req.user._id).then(function(venues) {
    res.json(venues);
  }).catch(function(error) {
    res.json(error);
  });
});

// POST: Attendance number of each supplied venue_id ([id1, id2,...])
var getVenueAttendance = require('../../controllers').getVenueAttendance;
router.post('/venue/attendance', function(req, res) {
  getVenueAttendance(req.body).then(function(attendance) {
    res.json(attendance);
  }).catch(function(error) {
    res.json(error);
  });
});

// GET: Set attendance at venue with venue_id
var setUserAttendance = require('../../controllers').setUserAttendance;
router.get('/set/:vid', authHelper.isAuth, function(req, res) {
  setUserAttendance(req.user._id, req.params.vid).then(function(set) {
    res.json(set);
  }).catch(function(error) {
    res.json(error);
  });
});

// GET: Remove attendance at venue with venue_id
var removeUserAttendance = require('../../controllers').removeUserAttendance;
router.get('/rm/:vid', authHelper.isAuth, function(req, res) {
  removeUserAttendance(req.user._id, req.params.venue_id).then(function(set) {
    res.json(set);
  }).catch(function(error) {
    res.json(error);
  });
});

debug('Routes initialized successfully');
module.exports = router;