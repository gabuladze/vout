const express = require('express');
const router = express.Router();
const Poll = require('../models/Poll.js');

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

module.exports = router;