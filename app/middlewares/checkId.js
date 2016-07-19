'user strict';

module.exports = function(req, res, next) {
  if(String(req.params.id) !== String(req.user._id)) {
    req.flash('danger', 'Invalid User ID');
    res.redirect('/');
  } else {
    next();
  }
}
