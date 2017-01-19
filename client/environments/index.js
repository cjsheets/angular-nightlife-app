var _      = require('lodash');
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = _.merge(
  {},
  require(`./${env}.env.js`) || require(`./${env}.js`) || {});