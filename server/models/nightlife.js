/* -----------------------------------|
 *|  Model: User Authentication
 */

var mongoose = require('mongoose');

var venueSchema = mongoose.Schema({

  venue_id      : { type : String, required : true, unique : true},
  attendees     : { type : Number, required : true }

});

var eventSchema = mongoose.Schema({

  venue_id      : String,
  user_id       : String

});

module.exports = {
  venueSchema   : venueSchema,
  eventSchema   : eventSchema
}
 