'use strict';
var mongoose = require('mongoose');
var Schema = require('Schema');
var dbUrl = process.env.MONGOLAB_URI;
mongoose.connect(dbUrl);

var pollOptionSchema = new Schema({
  option: String,
  votes: Number
});

var pollSchema = new Schema({
  name: String,
  options: [pollOptionSchema],
  user_id: Number
});
