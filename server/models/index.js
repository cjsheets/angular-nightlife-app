/* -----------------------------------|
 *|  MongoDB schema and helper
 *|  functions
 */

var mongoose          = require('mongoose');
var venueSchema       = require('./nightlife').venueSchema;
var eventSchema       = require('./nightlife').eventSchema;
var userSchema        = require('./user');
var bcrypt            = require('bcrypt-nodejs');

/**
 * Helper Methods
 */

// Generate a hash
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// Is password valid
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

/**
 * Build and export model array
 */
module.exports = {
  User        : mongoose.model('User', userSchema),
  Venue       : mongoose.model('Venue', venueSchema),
  Event       : mongoose.model('Event', eventSchema),
}