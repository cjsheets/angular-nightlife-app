/* -----------------------------------|
 *|  MongoDB schema and helper
 *|  functions
 */

var mongoose    = require('mongoose');
var userSchema  = require('./user');
var bcrypt      = require('bcrypt-nodejs');
var db          = {};


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

// Add models to export array
db['User'] = mongoose.model('User', userSchema)

// Expose the user model
module.exports = db;