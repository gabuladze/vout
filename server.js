'use strict';

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

const polls = require('./api/routes/polls.js');
const auth = require('./api/routes/auth.js');

// DB
const dbUrl = process.env.MONGOLAB_URI;
mongoose.connect(dbUrl);

app.use(cors());

app.use(bodyParser.json());

app.use(express.static('./public'));

app.use('/api/polls', polls);
app.use('/api/auth', auth);

// Redirect all requests to index html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
})


const port = process.env.PORT || 3500;

app.listen(port, function () {
  console.log("Magic on port " + port);
});
