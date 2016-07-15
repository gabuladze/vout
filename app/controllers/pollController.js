'use strict';

exports.index = function(req, res) {
  res.render('polls/index', {title: 'Index'});
};
