var getUserAttendance       = require('./getUserAttendance');
var getVenueAttendance      = require('./getVenueAttendance');
var setUserAttendance       = require('./setUserAttendance');
var removeUserAttendance    = require('./removeUserAttendance');

module.exports = {
  getUserAttendance     : getUserAttendance,
  getVenueAttendance    : getVenueAttendance,
  setUserAttendance     : setUserAttendance,
  removeUserAttendance  : removeUserAttendance
}