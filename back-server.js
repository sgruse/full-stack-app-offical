'use strict';

var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;
mongoose.connect('mongodb://localhost/db');
var apiRouter = express();

// CARS ROUTE
// require('./routes/cars-route')(apiRouter);
//PEOPLE ROUTE
require('./routes/people-route')(apiRouter);

app.use(bodyParser.json());

app.use( function(req, res, next) {
  console.log('REQUEST MIDDLEWARE : ' + req);
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  return next();
});

app.use('/api', apiRouter);

app.listen(port, () => {
  console.log('Server started on port 3000');
});
