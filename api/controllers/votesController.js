'user strict';

// Import poll model
var Poll = require('../models/Poll.js');

//Add vote to poll
// example.com/poll/:id/vote/create (POST)
exports.add = function(req, res) {
  // get poll id from parameters
  var pollId = req.params.id;

  // Add new subdoc to given poll if
  // requested
  if (req.body.option === 'custom') {
    Poll.findById(pollId, 'options')
      .exec(function(err, poll) {
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
          req.flash('success', 'Your vote has been added!');
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
      if(err) throw err;
      req.flash('success', 'Your vote has been added.');
      res.redirect('back');
    });
  }
}
