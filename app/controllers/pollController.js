'use strict';
var Poll = require('../models/Poll.js');

exports.index = function(req, res) {
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

exports.new = function(req, res, next) {
  var data = {
    title: 'New Poll',
    user: req.user,
  };
  res.render('polls/new', data);
}

exports.create = function(req, res) {
  var poll = new Poll({
    title: req.body.title,
    options: [],
    _creator: req.user._id
   });
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
        var data = {
          title: poll[0].title,
          poll: poll[0],
          user: req.user || null,
          author: (req.user && String(poll[0]._creator) == String(req.user._id)) ? true : false
        };
        res.render('polls/view', data);
      }
    })
};

exports.userPolls = function(req, res) {

}
