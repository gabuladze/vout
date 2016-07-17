'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./User.js');

var pollOptionSchema = new Schema({
  option: String,
  votes: Number
});

var pollSchema = new Schema({
  name: String,
  options: [pollOptionSchema],
  _creator: {type: Schema.Types.ObjectId, ref: "User"}
});

var Poll = mongoose.model('Poll', pollSchema);

module.exports = Poll;
