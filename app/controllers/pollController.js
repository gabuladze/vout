'use strict';

// Import poll model
var Poll = require('../models/Poll.js');

// Homepage
// example.com/ (GET)
exports.index = function(req, res) {
  //Get all polls
  var polls = Poll.find()
    .select({
      title: 1,
      _id: 1
    })
    .sort({
      title: -1
    })
    .exec(function(err, polls) {
      if (err) {
        req.flash('danger', err);
        res.redirect('/')
      } else {
        var data = {
          title: 'Index',
          user: req.user || null,
          polls: polls
        };
        res.render('polls/index', data);
      }
    });
};

// Add new poll
// example.com/polls/new (GET)
exports.new = function(req, res, next) {
  var data = {
    title: 'New Poll',
    user: req.user,
  };
  res.render('polls/new', data);
}

// Create poll
// example.com/polls/create (POST)
exports.create = function(req, res) {
  var poll = new Poll({
    title: req.body.title,
    options: [],
    _creator: req.user._id
   });
  // add poll options
  req.body.options.forEach(function(option) {
    poll.options.addToSet({ name: option });
  });

  poll.save(function(err) {
    if (err) {
      req.flash('danger', err);
      res.redirect('back');
    } else {
      req.flash('success', 'Successfully added!');
      res.redirect('/');
    }
  })
};

// View poll
// example.com/polls/view/:id (GET)
exports.view = function(req, res) {
  var pollId = req.params.id;
  var poll = Poll.find({ _id: pollId })
    .select({
      title: 1,
      _creator: 1,
      options: 1
    })
    .lean(true)
    .exec(function(err, poll) {
      if (err) {
        req.flash("danger", err);
        res.redirect('/');
      } else {
        var app_url = process.env.APP_URL || "http://localhost:3500";
        var data = {
          title: poll[0].title,
          poll: poll[0],
          pageUrl: app_url + '/polls/view/' + poll[0]._id,
          user: req.user || null,
          author: (req.user && String(poll[0]._creator) == String(req.user._id)) ? true : false
        };
        res.render('polls/view', data);
      }
    })
};

// Display polls that belong to user
// example.com/polls/user/:userid (GET)
exports.userPolls = function(req, res) {
  var userId = req.params.id;

  Poll.find({
    _creator: userId
  })
  .select({
    title: 1,
    _id: 1
  })
  .lean(true)
  .exec(function(err, polls) {
    if (err) {
      req.flash('danger', JSON.stringify(err));
      res.redirect('/');
    }
    var data = {
      title: "My Polls",
      user: req.user || null,
      polls: polls
    };

    res.render('polls/user', data);
  })
}
