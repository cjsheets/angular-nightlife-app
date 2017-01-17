var Event             = require('../models').Event;
var Venue             = require('../models').Venue;
var mongoose          = require('mongoose');
    mongoose.Promise  = require('bluebird');

/**
 * This controller adds/removes records in the database 
 * relating to a specific user and a specific venue
 *
 * @param: {`venue_id`: `attending` (boolean)
 *          user_id:  `user_id` } - `user_id` per their server-side session
 * 
 * @return: boolean - Success
 */

module.exports = function(user_id){ 

//console.log(user)

  // var event = new Event({
  //   venue_id          : 'this-is-yet-another-id',
  //   user_id   : user_id
  // })
  
  // event.isNew = true;
  // event.save(function(err){
  //   if(err) throw err;
  //   console.log('saved');
  // });

  // var venue = new Venue({
  //   id          : 'this-is-yet-another-id',
  //   attendees   : 0
  // })
  
  // venue.isNew = true;
  // venue.save(function(err){
  //   if(err) throw err;
  //   console.log('saved');
  // });
}