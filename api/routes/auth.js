const express = require('express');
const router = express.Router();
const User = require('../models/User.js');

router.post('/login', (req, res, next) => {
  User.findOne({ googleId: req.body.uid }, function (err, user) {
    if (err) {
      return res.json({ success: false, message: JSON.stringify(err) });
    } else {
      if (!user) {
        user = new User({
          name: req.body.name,
          googleId: req.body.uid,
          photoUrl: req.body.image,
          token: req.body.token
        });

        user.save(function (err) {
          if (err) {
            return res.json({ success: false, message: JSON.stringify(err) });
          } else {
            return res.json({ success: true, id: user._id });
          }
        });

      } else {

        user.token = req.body.token;

        user.save(function (err, updUser) {
          if (err) {
            return res.json({ success: false, message: JSON.stringify(err) });
          } else {
            return res.json({ success: true, id: user._id });
          }
        });

      }
    }
  });
});

router.post('/logout', (req, res, next) => {
  User.update(
    { email: req.body.email },
    { $unset: { token: "" } },
    function (err, result) {
      if (err) {
        return res.json({ success: false, message: 'Operation Failed!' });
      } else {
        return res.json({ success: true });
      }
    });
})

module.exports = router;