'use strict';

var userController = require('../../controllers/userController.js');
var User = require('../../models/User.js');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var appUrl = process.env.APP_URL || 'http://localhost:3500';

module.exports = function() {
  passport.use(new GoogleStrategy({
    clientID: process.env.ID,
    clientSecret: process.env.SECRET,
    callbackURL: appUrl + "/oauth/google/callback",
    passReqToCallback: true
  },
    function(req, accessToken, refreshToken, profile, done) {
      profile = profile._json;
      var userProfile = {
        name: profile.displayName,
        googleId: profile.id,
        photoUrl: profile.image.url
      }

      userController.save(req, userProfile, done);
    }
  ));
};
