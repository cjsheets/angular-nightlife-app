/* -----------------------------------|
 *|  Determine if a user is authenticated
 *|  prior to route responding
 */

function isAuthOrRedirect(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect(req.session.returnTo || '/');
}

function isNotAuthOrRedirect(req, res, next) {
  if (!req.isAuthenticated()) return next();
  res.redirect(req.session.returnTo || '/');
}

function isAuth(req, res, next) {
  if (req.isAuthenticated()) { return next() };
  res.status(401).json({"authenticated": false});
}

function isNotAuth(req, res, next) {
  if (!req.isAuthenticated()) return next();
  res.json({"authenticated": true});
}

function returnTo(req, res, next) {
  req.session.returnTo = req.baseUrl || '';
  return next();
}

module.exports = {
  isAuthOrRedirect    : isAuthOrRedirect,
  isNotAuthOrRedirect : isNotAuthOrRedirect,
  isAuth              : isAuth,
  isNotAuth           : isNotAuth,
  returnTo            : returnTo
}
