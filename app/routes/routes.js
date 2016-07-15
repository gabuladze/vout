'use strict';

var express = require('express');
var router = express.Router();
var pollController = require('../controllers/pollController.js');
var authController = require('../controllers/authController');
var userController = require('../controllers/userController');

router.route("/")
  .get(pollController.index);
router.route("/login")
  .get(authController.login)
  .post(authController.verify);
router.route("/signup")
  .get(userController.signup)
  .post(userController.add);

module.exports = router;
