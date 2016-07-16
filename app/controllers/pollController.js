'use strict';



exports.index = function(req, res) {
  console.log(req.user);
  var current_user = req.user || null;
  res.render('polls/index', {title: 'Index', user: current_user});
};
