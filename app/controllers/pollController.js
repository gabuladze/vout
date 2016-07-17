'use strict';
var Poll = require('../models/Poll.js');

exports.index = function(req, res) {
  var polls = Poll.all;
  var data = {
    title: 'Index',
    user: req.user || null,
    polls: polls
  };
  res.render('polls/index', data);
};

exports.new = function(req, res, next) {
  var data = {
    title: 'New Poll',
    user: req.user,
  };
  res.render('polls/new', data);
}

exports.create = function(req, res) {

};
