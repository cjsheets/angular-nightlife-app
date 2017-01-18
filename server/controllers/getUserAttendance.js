var Event             = require('../models').Event;
var mongoose          = require('mongoose');
    mongoose.Promise  = require('bluebird');

/**
 * This controller searches the database for a
 * users ID and returns all events they're attending
 *
 * @param: string - `user_id` per their server-side session
 * 
 * @return: [{venue_id: venue_id, user_id: user_id}, ...]
 *           containing all venue_ids user is attending
 */

module.exports = function(uid) {
  return Event.find({user_id: uid}, function(err, events){
    if(err) throw err;
  }).exec();
}