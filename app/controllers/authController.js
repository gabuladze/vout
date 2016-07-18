'use strict';

// Log out
// example.com/logout (GET)
exports.logout = function(req, res) {
  req.logout();
  res.redirect("/");
}
