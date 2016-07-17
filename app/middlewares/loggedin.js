'use strict';

module.exports = function(req, res, next) {
  if (req.user) {
    next();
  } else {
    req.flash("Error", "Please, log in!");
    res.redirect('back');
  }
}
