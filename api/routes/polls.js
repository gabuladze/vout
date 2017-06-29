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

router.post('/destroy', (req, res, next) => {
  Poll.remove({ _id: req.body.id }, function (err) {
    if (err) {
      return res.json({ success: false, message: JSON.stringify(err) });
    } else {
      return res.json({ success: true, message: 'The poll has been deleted!' });
    }
  })
});

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