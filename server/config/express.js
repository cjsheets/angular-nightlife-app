/* -----------------------------------|
 *|  Core Modules
 */
var express         = require('express');
var session         = require('express-session');
var path            = require('path');
var env             = require('./environment');
var logger          = require('morgan');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var passport        = require('passport');
var passportConfig  = require('./passport');
var mongoose        = require('mongoose');
var morgan          = require('morgan');
var flash           = require('connect-flash');
var Raven           = require('raven');

/* -----------------------------------|
 *|  Configuration
 */
var app             = express();
var port            = process.env.PORT || 5000;

// Setup logging and database middlewares
let em = env.mongo, er = env.raven;
mongoose.connect('mongodb://' + em.user + ':' + em.pass + '@' + 
  em.host + ':' + em.port + '/' + em.db); // connect to database
Raven.config('https://' + er.key + ':' + er.secret + '@' + 
  er.host + '/' + er.app_id).install();

// require('./config/passport')(passport); // pass passport for configuration

// Setup express
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs'); // set up ejs for templating

// Initialize passport
app.use(session({ secret: env.node.session_secret }));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


/* -----------------------------------|
 *|  Routes
 */
var routes          = require('../routes');
app.use('/', routes);

// routes ======================================================================
//require('./routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log(' 🌎  Express server listening on %d, in %s mode  🌎', port, process.env.NODE_ENV);



// /**
//  * Import main route module
//  */
// var routes = require('./routes');

// var app = express();

// /**
//  * View engine setup
//  */
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(session({ secret: 'my_precious' }));
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(cookieParser());

// app.use('/node_modules', express.static(__dirname + '/node_modules'));

// /**
//  * PWA Static Exceptions
//  */
// app.use('/manifest.json', express.static(__dirname + '/manifest.json'));
// app.use('/192.png', express.static(__dirname + '/192.png'));
// app.use('/144.png', express.static(__dirname + '/144.png'));
// app.use('/96.png', express.static(__dirname + '/96.png'));

// /**
//  * Link main route module to app
//  */
// app.use('/', routes);

// /**
//  * Extraneous handler functions
//  */

// // Catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// // Error handlers

// // Development Handler
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }

// // Production Handler
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });

module.exports = app;