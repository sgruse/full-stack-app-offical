'use strict';

var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;
var apiRouter = express.Router();
mongoose.connect('mongodb://localhost/db');

const jwtAuth = require(__dirname + '/lib/jwt_auth.js');


// CARS ROUTE
// require('./routes/cars-route')(apiRouter);
//PEOPLE ROUTE

app.use(bodyParser.json());

require(__dirname + '/routes/people-route')(apiRouter);
require(__dirname + '/routes/user_routes')(apiRouter);
// require(__dirname + '/routes/auth_routes')(apiRouter);



app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Headers', 'Content-Type, token, authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

const authRouter = require(__dirname + '/routes/auth_routes')

app.use('/api', apiRouter);
app.use(authRouter)

app.listen(port, () => {
  console.log('Server started on port 3000');
});
