'use strict';

var express = require('express');
var router = express.Router();
var pollController = require('../controllers/pollController.js');

router.route("/")
  .get(pollController.index);

module.exports = router;
