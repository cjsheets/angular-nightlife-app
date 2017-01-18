var Event               = require('../models').Event;
var Venue               = require('../models').Venue;
var mongoose            = require('mongoose');
    mongoose.Promise    = require('bluebird');
var getVenueAttendance  = require('./getVenueAttendance');

/**
 * This controller adds/removes records in the database 
 * relating to a specific user and a specific venue
 *
 * @param: {venue_id  : string
 *          user_id   : string} - `user._id` per their server-side session
 * 
 * @return: boolean - Success
 */

module.exports = function(uid, vid){
  var promise = Event.find({user_id: uid, venue_id: vid}, function(err, events){
    if(err) throw err;
      console.log('events: ', events)
  }).exec();
  return promise.then(function(venues) {
    if(venues.length !== 0){
      console.log('Not there, continuing', venues)
      return Promise.resolve('done')
    } else {
      console.log('Found it...', venues)
      console.log('length', venues.length)
      console.log('events', venues.events)
      console.log('user', uid)
      console.log('venue', vid)
      return Promise.resolve(vid)
    }
  }).catch(function(error) {
    res.json(error);
  });


  // let venueDetails = getVenueAttendance([venue_id]);
  // if(venueDetails) {
  //   let attendind = venueDetails + 1, new = false;
  // } else {
  //   let attendind = 1, new = true;
  // }

  // let event = new Event({
  //   venue_id  : venue_id,
  //   user_id   : user_id
  // });

  // let venue = new Venue({
  //   id          : venue_id,
  //   attendees   : attendance
  // });
  
  // event.isNew = true;
  // event.save(function(err){
  //   if(err) throw err;
  //   console.log('saved');
  // });
  
  // venue.isNew = true;
  // venue.save(function(err){
  //   if(err) throw err;
  //   console.log('saved');
  // });
}