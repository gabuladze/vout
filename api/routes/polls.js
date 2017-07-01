const express = require('express');
const router = express.Router();
const Poll = require('../models/Poll.js');

/**
 * Return all polls ordered by title in desc order
 */
router.get('', (req, res, next) => {
  //Get all polls
  Poll.find()
    .select({
      title: 1,
      _id: 1
    })
    .sort({
      title: -1
    })
    .lean()
    .exec(function (err, polls) {
      if (err) {
        return res.json({ success: false, message: 'Failed to retrieve Polls!' });
      } else {
        return res.json({ polls: polls });
      }
    });
});

/**
 * Return a single poll by id
 */
router.get('/:id', (req, res, next) => {
  Poll.findOne({ _id: req.params.id })
    .select({
      title: 1,
      _creator: 1,
      options: 1
    })
    .lean()
    .exec(function (err, poll) {
      if (err) {
        return res.json({ success: false, message: 'Failed to retrieve Polls!' });
      } else {
        return res.json({ poll: poll });
      }
    })
});

/**
 * Vote for a single option in single poll
 * poll & corresponding option are found by ids
 */
router.post('/vote', (req, res, next) => {
  Poll.update({
    _id: req.body.poll,
    "options._id": req.body.option
  },
    {
      $inc: {
        "options.$.votes": 1
      }
    }, function (err, result) {
      if (err) {
        return res.json({ success: false, message: 'Failed to submit the vote!' });
      } else {
        return res.json({ success: true, message: 'Your vote has been submitted!' });
      }
    });
});

/**
 * Vote for a single custom option in a single poll
 * The request should have the option (string) & the id of poll
 */
router.post('/vote/custom', (req, res, next) => {
  Poll.findById(req.body.poll, 'options')
    .exec(function (err, poll) {
      if (err) throw err;

      // Add option with 1 vote
      poll.options.push({
        name: req.body.option,
        votes: 1
      });

      // save the poll
      poll.save(function (err) {
        if (err) {
          return res.json({ success: false, message: 'Failed to submit the vote!' });
        } else {
          return res.json({ success: true, message: 'Your vote has been submitted!' });
        }
      })
    })
});

/**
 * Create a single poll
 * The request should include title, array of options (strings), author's
 * user id
 */
router.post('/create', (req, res, next) => {
  let poll = new Poll({
    title: req.body.title,
    options: [],
    _creator: req.body.userId
  });

  // add poll options
  req.body.options.forEach(function (option) {
    poll.options.addToSet({ name: option });
  });

  poll.save(function (err) {
    if (err) {
      return res.json({ success: false, message: 'Failed to add poll!' });
    } else {
      return res.json({ success: true });
    }
  })
});

/**
 * Delete a single poll
 * The request should include an id of poll to delete
 */
router.post('/destroy', (req, res, next) => {
  Poll.remove({ _id: req.body.id }, function (err) {
    if (err) {
      return res.json({ success: false, message: JSON.stringify(err) });
    } else {
      return res.json({ success: true, message: 'The poll has been deleted!' });
    }
  })
});

/**
 * Fetch all polls that belong to a user with certain id
 */
router.get('/user/:id', (req, res, next) => {
  Poll.find({ _creator: req.params.id })
    .select({ title: 1, _id: 1 })
    .lean()
    .exec(function (err, polls) {
      if (err) {
        return res.json({ success: false, message: 'Failed to retrieve polls!' });
      } else {
        return res.json({ success: true, polls: polls });
      }
    })
})

module.exports = router;