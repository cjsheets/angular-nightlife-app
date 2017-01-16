/* -----------------------------------|
 *|  Determine if a user is authenticated
 *|  prior to route responding
 */

function isAuthOrRedirect(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}

function isNotAuthOrRedirect(req, res, next) {
  if (!req.isAuthenticated()) return next();
  res.redirect('/'); // If unauthenticated, redir to landing page
}

function isAuth(req, res, next) {
  if (req.isAuthenticated()) { return next() };
  res.status(401).json({"authenticated": false});
}

function isNotAuth(req, res, next) {
  if (!req.isAuthenticated()) return next();
  res.json({"authenticated": true});
}

module.exports = {
  isAuthOrRedirect    : isAuthOrRedirect,
  isNotAuthOrRedirect : isNotAuthOrRedirect,
  isAuth              : isAuth,
  isNotAuth           : isNotAuth
}
