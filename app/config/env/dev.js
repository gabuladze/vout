'use strict';

module.exports = {
  google: {
    consumerKey: process.env.key,
    consumerSecret: GOOGLE_CONSUMER_SECRET,
    callbackURL: "http://localhost:3500/"+"oauth/google/callback"
  }
};
