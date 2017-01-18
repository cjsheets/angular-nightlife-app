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
  // First, check to ensure 'event' doesn't already exist
  return Event.find({user_id: uid, venue_id: vid}, function(err, events){
    if(err) throw err;
      console.log('First, check to ensure')
  }).exec()
  .then(function(existingEvent) {
    if(existingEvent.length === 0){
      // Event doesn't exist. Update venue and create event
      console.log('Event doesnt exist. Update venue and create event')

      return getVenueAttendance([vid])
      .then(function(venueRecord){
        console.log('venue record: ', venueRecord)
        if(venueRecord.length === 0){
        console.log('attendance = 1;')
          var attendance = 1;
        } else {
        console.log('exists: ', venueRecord.attendees)
          var attendance = venueRecord.attendees;
          attendance += 1;
        console.log('funally: ', attendance)
        }

        console.log('values: ', vid, attendance);
        let venue = new Venue({
          id          : vid,
          attendees   : attendance
        });

        if(venueRecord.length === 0) venue.isNew = true;
        return venue.save(function(err){
          if(err) throw err;
        })
        .then(function(savedVenue){ // Finally, create the event
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
      }).catch(function(err){ throw err }); // .then(function(currentAttendance)
    } else {
      return Promise.resolve({existingEvent: true})
    }
  }).catch(function(err){ throw err });
}