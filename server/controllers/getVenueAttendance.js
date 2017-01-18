var Venue             = require('../models').Venue;
var mongoose          = require('mongoose');
    mongoose.Promise  = require('bluebird');

/**
 * This controller accepts a list of venue ids and searches
 * the database for attendance levels of each venue
 *
 * @param: string[] - `venue_id`s in need of attendance numbers
 * 
 * @return: [{id: venue_id, attendees: ##}, ...]
 */

module.exports = function(venues) {
  return Venue.find({id: {$in: venues}}).exec();
}
