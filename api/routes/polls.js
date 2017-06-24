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
    .populate('_creator')
    .lean()
    .exec(function (err, poll) {
      if (err) {
        return res.json({ success: false, message: 'Failed to retrieve Polls!' });
      } else {
        return res.json({ poll: poll });
      }
    })
});


router.post('/:id/vote', (req, res, next) => {
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

module.exports = router;