'user strict';

var Poll = require('../models/Poll.js');

exports.add = function(req, res) {
  var pollId = req.params.id;

  if (req.body.option === 'custom') {
    Poll.findById(pollId, 'options')
      .exec(function(err, poll) {
        console.log(poll);
        if (err) throw err;
        poll.options.push({
          name: req.body.customOption,
          votes: 1
        });
        poll.save(function(err) {
          if (err) {
            console.log(err);
            req.flash('danger', JSON.stringify(err));
            res.redirect('/');
          }
          req.flash('success', 'Vote Added');
          res.redirect('back');
        })
      })
  } else {
    var optionId = req.body.option.substring(1, req.body.option.length - 1);

    Poll.update({
      _id: pollId,
      "options._id": optionId
    },
    {
      $inc: {
        "options.$.votes": 1
      }
    }, function(err, result) {
      console.log(result);
      if(err) throw err;
      req.flash('success', 'Vote added');
      res.redirect('back');
    });
  }
}
