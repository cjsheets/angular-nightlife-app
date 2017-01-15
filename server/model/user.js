/* -----------------------------------|
 *|  Model: User Authentication
 */

var mongoose = require('mongoose');

module.export = mongoose.Schema({

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
    username      : String
  },
  google          : {
    id            : String,
    token         : String,
    email         : String,
    name          : String
  }

});
