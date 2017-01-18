var Event               = require('../models').Event;
var Venue               = require('../models').Venue;
var mongoose            = require('mongoose');
    mongoose.Promise    = require('bluebird');
var getVenueAttendance  = require('./getVenueAttendance');

/**
 * This controller adds records to the database 
 * relating to a specific user and a specific venue
 *
 * @param: {venue_id  : string
 *          user_id   : string} - `user._id` per their server-side session
 * 
 * @return: boolean - Success
 */

module.exports = function(uid, vid){
  // First, check to ensure 'event' doesn't already exist
  return Event.find({user_id: uid, venue_id: vid}, function(err, events){
    if(err) throw err;
      console.log('First, check to ensure')
  }).exec()
  .then(function(existingEvent) {
    if(existingEvent.length === 0){
      // Event doesn't exist. Update venue and create event
      console.log('Event doesnt exist. Update venue and create event')

      return Venue.findOne({id: vid}, function(err, venueRecord){
        console.log('Record checked', venueRecord)
        if(err) throw err;
        if (venueRecord.length === 0) {
        console.log('new venue');
          let venue = new Venue({
            id          : vid,
            attendees   : 1
          });
          venue.isNew = true;
          return venue.save(function(err){
            if(err) throw err;
          });
        } else {
        console.log('existing venue');
          venueRecord.attendees += 1;
          return venueRecord.save(function(err){
            if(err) throw err;
          });
        } 
      }).exec().then(function(savedVenue){ // Finally, create the event
        console.log('now creating the event')
        let event = new Event({
          venue_id  : vid,
          user_id   : uid
        });

        event.isNew = true;
        return event.save(function(err){
          if(err) throw err;
        });
      }).catch(function(err){ throw err }); // .then(function(savedVenue)
    } else {
      return Promise.resolve({existingEvent: true})
    }
  }).catch(function(err){ throw err });
}