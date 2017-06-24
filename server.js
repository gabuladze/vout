'use strict';

const express = require('express');
const app = express();
// const routes = require('./api/routes/routes.js');
// const configPassport = require('./api/config/passport.js')(passport);
// const passport = require('passport');
//const flash = require('flash');
// const session = require('express-session');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

const polls = require('./api/routes/polls.js');

// DB
const dbUrl = process.env.MONGOLAB_URI;
mongoose.connect(dbUrl);

// app.use(session({
//   secret: 'muchSecretSoSessionWOW',
//   saveUninitialized: true,
//   resave: true
// }));

//app.use(flash());

app.use(cors());

//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use(passport.initialize());
// app.use(passport.session());

// app.use(routes);

// app.use(express.static('./public'));

// app.set('views', './api/views');
// app.set('view engine', 'pug');

app.use('/api/polls', polls);

// Redirect all requests to index html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
})


const port = process.env.PORT || 3500;

app.listen(port, function () {
  console.log("Magic on port " + port);
});
