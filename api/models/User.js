'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Poll = require('./Poll.js');

var userSchema = new Schema({
  name: String,
  googleId: String,
  photoUrl: String,
  token: String
});

var User = mongoose.model('User', userSchema);

module.exports = User;
