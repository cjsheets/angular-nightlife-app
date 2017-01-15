/* -----------------------------------|
 *|  Router  ::  Root
 */
var express     = require('express')
var passport    = require('passport');
var authHelper  = require('./authHelper')
var router      = express.Router()

// Import all other route modules
var auth        = require('./auth');

const allowedOrigins = ['http://localhost:4200', 'https://angular-nightlife.herokuapp.com'];

/**
 * Restrict access to pre-defined origins
 */
router.use(function(request, response, next) {
  var origin = request.headers.origin;
  if (allowedOrigins.indexOf(origin) > -1) {
    response.setHeader('Access-Control-Allow-Origin', origin);
  }
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With');
  response.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
  response.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

/**
 * "use" should be before any other route definitions
 */
router.use('/auth', auth);

// Landing page
router.get('/', function(req, res, next) {
  res.render('index.ejs'); // load the index.ejs file
});

// Login Form
router.get('/login', function(req, res, next) {
  // render the page and pass in any flash data if it exists
  res.render('login.ejs', { message: req.flash('loginMessage') }); 
});

// Login Form - Process submission
router.post('/login', passport.authenticate('local-login', {
  successRedirect : '/profile',
  failureRedirect : '/login',
  failureFlash : true // allow flash messages
}));

// Signup Form
router.get('/signup', function(req, res, next) {
  // render the page and pass in any flash data if it exists
  res.render('signup.ejs', { message: req.flash('signupMessage') });
});

// Signup Form - Process submission
router.post('/signup', passport.authenticate('local-signup', {
  successRedirect : '/profile',
  failureRedirect : '/signup',
  failureFlash : true // allow flash messages
}));

// Protected profile page
router.get('/profile', function(req, res, next) {
  res.render('profile.ejs', {
  // we will want this protected so you have to be logged in to visit
  // we will use route middleware to verify this (the isNotAuthOrRedirect function)
  user : req.user // get the user out of session and pass to template
  });
});

// Landing page
router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

/**
 * Anything else under '/', facilitates Angular HTML 5 routing. Must
 * declare below all other routes to avoid catching their requests
 */
router.get("/*", authHelper.isAuthOrRedirect, function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'index.html'));
  //res.render('index');
});

module.exports = router;