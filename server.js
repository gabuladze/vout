'use strict';

var express = require('express');
var app = express();
var port = process.env.PORT || 3500;
var routes = require('./app/routes/routes.js');
var configPassport = require('./app/config/passport.js')(passport);
var passport = require('passport');
var flash = require('flash');
var session = require('express-session');
var mongoose = require('mongoose');
var dbUrl = process.env.MONGOLAB_URI;
mongoose.connect(dbUrl);

app.use(session({
  secret: 'muchSecretSoSessionWOW',
  saveUninitialized: true,
  resave: true
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);
app.use(express.static('./public'));

app.set('views', './app/views');
app.set('view engine', 'pug');

app.listen(port, function() {
  console.log("Magic on port " + port);
});
