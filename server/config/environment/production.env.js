/* -----------------------------------|
 *|  Environment variables for use 
 *|  during development. Not commited
 *|  to git repository
 */

module.exports = {
  // Sentry.io Access Keys
  raven: {
    key     : process.env.RAVEN_KEY,
    secret  : process.env.RAVEN_SECRED,
    host    : 'sentry.io',
    app_id  : '128901'
  },
  // MongoDB connection options
  mongo: {
    user  : process.env.MONGO_USER,
    pass  : process.env.MONGO_PASS,
    host  : 'ds163758.mlab.com',
    port  : '63758',
    db    : 'nightlife-app'
  },
  // Express.js Params
  express: {
    session_secret    : process.env.EXPRESS_SESSION_SECRET,
    // Anything not matching this pattern returns 404
    valid_routes      : process.env.EXPRESS_VALID_ROUTES,
    dev_routes        : false,  // Disable /dev routes
  },
  /**
   * Authentication - API Credentials
   */
  facebook : {
    client_id         : process.env.FACEBOOK_ID,
    client_secret     : process.env.FACEBOOK_SECRET,
    callback          : 'https://angular-nightlife.herokuapp.com/auth/facebook/callback'
  },
  twitter : {
    consumer_key      : process.env.TWITTER_KEY,
    consumer_secret   : process.env.TWITTER_SECRET,
    callback          : 'https://angular-nightlife.herokuapp.com/auth/twitter/callback'
  },

  google : {
    client_id         : process.env.GOOGLE_ID,
    client_secret     : process.env.GOOGLE_SECRET,
    callback          : 'https://angular-nightlife.herokuapp.com/auth/google/callback'
  }
};