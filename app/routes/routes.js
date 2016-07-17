'use strict';

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var parser = bodyParser.urlencoded({extended: false});
var passport = require('passport');
var loggedIn = require('../middlewares/loggedin.js');
var pollController = require('../controllers/pollController.js');
var authController = require('../controllers/authController.js');

router.route("/")
  .get(pollController.index);
router.route("/oauth/google")
  .get(passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

router.route("/oauth/google/callback")
  .get(passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  }
);

router.route("/logout")
  .get(authController.logout);

router.route("/polls/new")
  .all(loggedIn)
  .get(pollController.new)
  .post(parser, pollController.create);


module.exports = router;
