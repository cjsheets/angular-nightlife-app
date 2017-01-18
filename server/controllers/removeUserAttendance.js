var Event               = require('../models').Event;
var Venue               = require('../models').Venue;
var mongoose            = require('mongoose');
    mongoose.Promise    = require('bluebird');
var getVenueAttendance  = require('./getVenueAttendance');

/**
 * This controller removes records in the database 
 * relating to a specific user and a specific venue
 *
 * @param: {venue_id  : string
 *          user_id   : string} - `user._id` per their server-side session
 * 
 * @return: boolean - Success
 */

module.exports = function(uid, vid){
  return Event.findOneAndRemove({user_id: uid, venue_id: vid}, function(err) {
    if (err) throw err; // First find and remove the event
  }).exec(function(err, deletedRecord) {
    if(deletedRecord && deletedRecord.length !== 0){  // Reduce attendance count if event existed
      return Venue.findOne({venue_id: vid}, function(err, venueRecord){
        if(err) throw err;
        if (venueRecord.length !== 0) {
          venueRecord.attendees -= 1;
          return venueRecord.save(function(err){
            if(err) throw err;
            return Promise.resolve({attendanceRemoved: true});
          });
        } 
      }).exec()
    }
  }).catch(function(err){ throw err });
}