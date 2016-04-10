'use strict';

var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;
var apiRouter = express.Router();
mongoose.connect('mongodb://localhost/db');

// CARS ROUTE
// require('./routes/cars-route')(apiRouter);
//PEOPLE ROUTE

app.use(bodyParser.json());

require(__dirname + '/routes/people-route')(apiRouter);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

app.use('/api', apiRouter);

app.listen(port, () => {
  console.log('Server started on port 3000');
});
