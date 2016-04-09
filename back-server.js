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
app.use('/api', apiRouter);

app.listen(port, () => {
  console.log('Server started on ${port}');
});
