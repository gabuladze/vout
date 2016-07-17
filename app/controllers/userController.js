'use strict';

var User = require('../models/User.js');

exports.save = function(req, userProfile, done) {
  User.findOne({googleId: userProfile.googleId}, function(err, user) {
    if (err) {
      return done(err);
    } else {
      if (!user) {
        user = new User(userProfile);
        user.save(function(err) {
          if(err) {
            console.log(err);
            req.flash("danger",err);
            res.redirect('/');
          } else {
            return done(err, user);
          }
        });
      } else {
        return done(err, user);
      }
    }

  }
  );
}
