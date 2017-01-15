/* -----------------------------------|
 *|  Passport login configuration
 */

var passport        = require('passport');
var LocalStrategy   = require('passport-local').Strategy;
var User            = require('../models').User;


/**
 * Setup Sessions
 *   Required for session persistance, passport needs the
 *   ability to serialize and unserialize users out of session
 */
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

/**
 * Strategy - Local Signup
 *   Defaults to just 'local', we're using named strategies to
 *   differentiate login and signup
 */
function localSignup(req, email, password, done) { // async callback
  // User.findOne wont fire unless data is sent back
  process.nextTick(function() {
    // Check if login email already exists
    User.findOne({ 'local.email' :  email }, function(err, user) {
      if (err) return done(err);
      if (user) { // User already exists
        return done(null, false, req.flash('signupMessage', 'That email is already taken.'));

      } else { // New email provided
        var newUser             = new User();
        newUser.local.email     = email;
        newUser.local.password  = newUser.generateHash(password);

        newUser.save(function(err) {
          if (err) throw err;
          return done(null, newUser);
        });
      }
    });  
  });
};

/**
 * Strategy - Local Login
 */
function localLogin(req, email, password, done) { // callback with email and password
  // Check if user email exist
  User.findOne({ 'local.email' :  email }, function(err, user) {
    if (err) return done(err);
    // req.flash is a connect-flash method for sending flashdata
    // Saving a login message to the session (as flashdata)
    if (!user) return done(null, false, 
      req.flash('loginMessage', 'No user found.'));
    if (!user.validPassword(password)) return done(null, false, 
      req.flash('loginMessage', 'Oops! Wrong password.'));
  // Successfully authenticated
  return done(null, user);
  });
};

function newLocalStrategy(callback){
  return new LocalStrategy({
    // Default: 'local' uses username and password, we will override with email
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true // pass back the entire request to the callback
  }, callback);
}
passport.use('local-signup', newLocalStrategy(localSignup));
passport.use('local-login', newLocalStrategy(localLogin));