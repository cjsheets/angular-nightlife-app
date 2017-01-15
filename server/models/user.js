/* -----------------------------------|
 *|  Model: User Authentication
 */

var mongoose = require('mongoose');

module.exports = mongoose.Schema({

  local           : {
    email         : String,
    password      : String,
  },
  facebook        : {
    id            : String,
    token         : String,
    email         : String,
    name          : String
  },
  twitter         : {
    id            : String,
    token         : String,
    displayName   : String,
    username      : String,
    photo         : String
  },
  google          : {
    id            : String,
    token         : String,
    email         : String,
    name          : String
  }

});
