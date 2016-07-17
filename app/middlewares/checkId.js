'user strict';

module.exports = function(req, res, next) {
  if(req.params.id !== req.user._id) {
    req.flash('danger', 'Invalid User ID');
    res.redirect('/');
  } else {
    next();
  }
}
