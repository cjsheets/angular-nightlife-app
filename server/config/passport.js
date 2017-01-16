/* -----------------------------------|
 *|  Passport login configuration
 */

var passport          = require('passport');
var LocalStrategy     = require('passport-local').Strategy;
var FacebookStrategy  = require('passport-facebook').Strategy;
var TwitterStrategy   = require('passport-twitter').Strategy;
var GoogleStrategy    = require('passport-google-oauth').OAuth2Strategy;
var User              = require('../models').User;
var debug             = require('debug')('pass:main');
var env               = require('./environment');


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
 * Strategy - Facebook
 *   Facebook provides the token and profile info
 *   which we'll store in our database
 */
function facebookLogin(req, token, refreshToken, profile, done) { // async callback
  // Passport standardizes callbacks with profile object
  //  - http://passportjs.org/guide/profile/
  // User.findOne wont fire unless data is sent back
  process.nextTick(function() {
    if (!req.user) { // Is user already logged in?
      // Find user in database using Facebook ID
      User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
        if (err) return done(err); // ie. error connecting to the database
        if (user) { 
          return done(null, user); // user found, return that user

        } else {
          // See: passport user profile for how names are returned       
          var newUser             = new User();
          newUser.facebook.id     = profile.id; // Facebook ID                   
          newUser.facebook.token  = token; // Facebook provided user token       
          newUser.facebook.name   = profile.name.givenName + ' ' + profile.name.familyName;
          newUser.facebook.email  = profile.emails[0].value; // Array of emails returned

          newUser.save(function(err) { // Commit to database
            if (err) throw err;
            return done(null, newUser); // User added, return the new user
          });
        }
      }); // / User.findOne({..

    } else { // user exists and is logged in, link accounts
      var existingUser            = req.user; // pull the user out of the session
      existingUser.facebook.id    = profile.id; // update facebook credentials
      existingUser.facebook.token = token;
      existingUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
      existingUser.facebook.email = profile.emails[0].value;

      existingUser.save(function(err) { // Commit to database
        if (err) throw err;
        return done(null, existingUser); // User linked, return the new user
      });
     }
  });
};

function newFacebookStrategy(callback){
  return new FacebookStrategy({
    clientID          : env.facebook.client_id,
    clientSecret      : env.facebook.client_secret,
    callbackURL       : env.facebook.callback,
    profileFields     : ['name', 'displayName', 'emails'],
    passReqToCallback : true  // pass in req from route (check if already logged in)
  }, callback);
}
passport.use(newFacebookStrategy(facebookLogin));

/**
 * Strategy - Twitter
 *   Twitter provides the token and profile info
 *   which we'll store in our database
 */
function twitterLogin(req, token, tokenSecret, profile, done) { // async callback
  // User.findOne wont fire unless data is sent back
  process.nextTick(function() {
    if (!req.user) { // Is user already logged in?
    // Find user in database using Twitter ID
    User.findOne({ 'twitter.id' : profile.id }, function(err, user) {
      if (err) return done(err); // ie. error connecting to the database
      if (user) { 
        return done(null, user); // user found, return that user

      } else {
        var newUser                   = new User();
        newUser.twitter.id            = profile.id; // Twitter ID                   
        newUser.twitter.token         = token; // Twitter provided user token
        newUser.twitter.username      = profile.username;
        newUser.twitter.displayName   = profile.displayName;
        newUser.twitter.photo         = profile.photos[0].value; // Array of photos returned

        newUser.save(function(err) { // Commit to database
          if (err) throw err;
          return done(null, newUser); // User added, return the new user
        });
      }
    }); // / User.findOne({..

    } else { // user exists and is logged in, link accounts
    var existingUser                    = req.user; // pull the user out of the session
      existingUser.twitter.id           = profile.id; // Twitter ID                   
      existingUser.twitter.token        = token; // Twitter provided user token
      existingUser.twitter.username     = profile.username;
      existingUser.twitter.displayName  = profile.displayName;
      existingUser.twitter.photo        = profile.photos[0].value; // Array of photos returned

      existingUser.save(function(err) { // Commit to database
        if (err) throw err;
        return done(null, existingUser); // User linked, return the new user
      });
     }
  });
};

function newTwitterStrategy(callback){
  return new TwitterStrategy({
    consumerKey       : env.twitter.consumer_key,
    consumerSecret    : env.twitter.consumer_secret,
    callbackURL       : env.twitter.callback,
    passReqToCallback : true  // pass in req from route (check if already logged in)
  }, callback);
}
passport.use(newTwitterStrategy(twitterLogin));

/**
 * Strategy - Google
 *   Google provides the token and profile info
 *   which we'll store in our database
 */
function googleLogin(req, token, refreshToken, profile, done) { // async callback
  // User.findOne wont fire unless data is sent back
  process.nextTick(function() {
    if (!req.user) { // Is user already logged in?
    // Find user in database using Google ID
    User.findOne({ 'google.id' : profile.id }, function(err, user) {
      if (err) return done(err); // ie. error connecting to the database
      if (user) { 
        return done(null, user); // user found, return that user

      } else {
        var newUser           = new User();
        newUser.google.id     = profile.id; // Google ID                   
        newUser.google.token  = token; // Google provided user token
        newUser.google.name   = profile.displayName;
        newUser.google.email  = profile.emails[0].value; // Array of photos returned

        newUser.save(function(err) { // Commit to database
          if (err) throw err;
          return done(null, newUser); // User added, return the new user
        });
      }
    }); // / User.findOne({..

    } else { // user exists and is logged in, link accounts
      var existingUser          = req.user; // pull the user out of the session
      existingUser.google.id    = profile.id; // Google ID                   
      existingUser.google.token = token; // Google provided user token
      existingUser.google.name  = profile.displayName;
      existingUser.google.email = profile.emails[0].value; // Array of photos returned

      existingUser.save(function(err) { // Commit to database
        if (err) throw err;
        return done(null, existingUser); // User linked, return the new user
      });
     }
  });
};

function newGoogleStrategy(callback){
  return new GoogleStrategy({
    clientID          : env.google.client_id,
    clientSecret      : env.google.client_secret,
    callbackURL       : env.google.callback,
    passReqToCallback : true  // pass in req from route (check if already logged in)
  }, callback);
}
passport.use(newGoogleStrategy(googleLogin));

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