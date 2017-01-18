var Venue             = require('../models').Venue;
var mongoose          = require('mongoose');
    mongoose.Promise  = require('bluebird');

/**
 * This controller accepts a list of venue ids and searches
 * the database for attendance levels of each venue
 *
 * @param: string[] - `venue_id`s in need of attendance numbers
 * 
 * @return: [{venue_id: "id", attendees: ##}, ...]
 */

module.exports = function(venues) {
  return Venue.find({venue_id: {$in: venues}}, function(err, events){
    if(err) throw err;
  }).exec();
}
