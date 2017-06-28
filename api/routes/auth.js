const express = require('express');
const router = express.Router();
const User = require('../models/User.js');

router.post('', (req, res, next) => {
  User.findOne({ googleId: req.body.uid }, function (err, user) {
    if (err) {
      return res.json({ success: false, message: JSON.stringify(err) });
    } else {
      if (!user) {
        user = new User({
          name: req.body.name,
          googleId: req.body.uid,
          photoUrl: req.body.image
        });

        user.save(function (err) {
          if (err) {
            return res.json({ success: false, message: JSON.stringify(err) });
          } else {
            return res.json({ success: true });
          }
        });

      } else {

        user.token = req.body.token;

        user.save(function (err, updUser) {
          if (err) {
            return res.json({ success: false, message: JSON.stringify(err) });
          } else {
            return res.json({ success: true });
          }
        });
        
      }
    }
  });
});

module.exports = router;