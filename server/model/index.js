/* -----------------------------------|
 *|  MongoDB schema and helper
 *|  functions
 */

var mongoose    = require('mongoose');
var userSchema  = require('./user');
var bcrypt      = require('bcrypt-nodejs');


/* -----------------------------------|
 *|  Helper Methods
 */

// Generate a hash
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// Is password valid
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

// Expose the user model
module.exports = mongoose.model('User', userSchema);