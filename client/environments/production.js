/* -----------------------------------|
 *|  Environment variables for use 
 *|  during development. Not commited
 *|  to git repository
 */

module.exports = {
  // Yelp API Access Key
  yelp: {
    expires_in: 15551999,
    token_type: 'Bearer',
    access_token: process.env.YELP_ACCESS_TOKEN
  }
};
