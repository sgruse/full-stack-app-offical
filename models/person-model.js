'use strict';

var mongoose = require('mongoose');

var personSchema = new mongoose.Schema({
  name: String,
  age: {
    type: Number,
    default: 21
  }
});

module.exports = mongoose.model('Person', personSchema);
