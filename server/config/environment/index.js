var _      = require('lodash');

// All configurations will extend these options
// ============================================
var all = {

  // Should we populate the DB with sample data?
  seedDB              : false,

  // Node.js Params
  node: {
    env               : process.env.NODE_ENV  || 'development',
    port              : process.env.PORT || 9000,
    ip                : process.env.IP || '0.0.0.0',
  },

  // Express.js Params
  express: {
    allowed_origins   : ['http://localhost:4200', 
      'https://angular-nightlife.herokuapp.com'],
    // Anything not matching this pattern returns 404
    valid_routes      : '/:url(api|auth|nl)/*'
  },
};


// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require(`./${all.node.env  || 'development'}.env.js`) || {});
  