'user strict';

var Poll = require('../models/Poll.js');

exports.add = function(req, res) {
  var pollId = req.params.id;
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
    })
}
