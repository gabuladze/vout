'use strict';

var passport = require('passport');
var User = require('../models/User.js');
var googleStrategy = require('./strategies/google.js');

module.exports = function() {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findOne(
      {_id: id},
      function(err, user) {
        done(err, user);
      }
    );
  });

  googleStrategy();
}
