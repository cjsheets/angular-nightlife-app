var Event             = require('../models').Event;
var mongoose          = require('mongoose');
    mongoose.Promise  = require('bluebird');

/**
 * This controller searches the database for a
 * users ID and returns all events they're attending
 *
 * @param: string - `user_id` per their server-side session
 * 
 * @return: string[] - `venue_id` of each venue they're "attending"
 */

module.exports = function(user_id) {

  return Event.find({user_id: user_id}, function(err, events){
    if(err) throw err;
    console.log(events);
  }).exec();

}