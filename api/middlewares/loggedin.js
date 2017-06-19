'use strict';

module.exports = function(req, res, next) {
  if (req.user) {
    next();
  } else {
    req.flash("warning", "Please, log in!");
    res.redirect('back');
  }
}
