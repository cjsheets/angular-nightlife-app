/* -----------------------------------|
 *|  Model: User Authentication
 */

var mongoose = require('mongoose');

module.exports = mongoose.Schema({

  venue           : {
    id            : String,
    attendees     : Number,
  },
  event           : {
    venue_id      : String,
    user_id       : String,
  }

});
