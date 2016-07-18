'use strict';

//Express stuff
var express = require('express');
var router = express.Router();

// Route middlewares
var bodyParser = require('body-parser');
var parser = bodyParser.urlencoded({extended: false});
var loggedIn = require('../middlewares/loggedin.js');
var checkId = require('../middlewares/checkId.js');

// Passport for user authentication
var passport = require('passport');

// Controllers
var pollController = require('../controllers/pollController.js');
var votesController = require('../controllers/votesController.js');
var authController = require('../controllers/authController.js');

// Homepage
router.route("/")
  .get(pollController.index);

// Login request
router.route("/oauth/google")
  .get(passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

// Authenticate user
router.route("/oauth/google/callback")
  .get(passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  }
);

// Log out
router.route("/logout")
  .get(authController.logout);

// Add new poll
router.route("/polls/new")
  .all(loggedIn)
  .get(pollController.new);

// Create new poll
router.route("/polls/create")
  .all(loggedIn)
  .post(parser, pollController.create);

// View poll
router.route("/polls/view/:id")
  .get(pollController.view);

// Display polls that belong to logged in user
router.route("/polls/user/:userid")
  .all(loggedIn, checkId)
  .get(pollController.userPolls);

// Add vote to poll
router.route("/poll/:id/vote/create")
  .post(parser, votesController.add);


// Export router to use it in server.js
module.exports = router;
