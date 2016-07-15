'use strict';

var express = require('express');
var app = express();
var port = process.env.PORT || 3500;
var routes = require('./app/routes/routes.js');

app.use(routes);
app.use(express.static('./public'));

app.set('views', './app/views');
app.set('view engine', 'pug');

app.listen(port, function() {
  console.log("Magic on port " + port);
});
