'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./User.js');

var pollOptionSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  votes: {
    type: Number,
    default: 0
  }
});

var pollSchema = new Schema({
  title: {
    type: String,
    required: true,
    index: true
  },
  options: [pollOptionSchema],
  _creator: {type: Schema.Types.ObjectId, ref: "User"}
});

var Poll = mongoose.model('Poll', pollSchema);

module.exports = Poll;
