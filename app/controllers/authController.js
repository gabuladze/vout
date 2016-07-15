'use strict';

exports.login = function(req, res) {
  res.render('auth/login', {title: 'Log In'});
};

exports.verify = function(req, res) {

};
