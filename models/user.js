const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
  username: String,
  authentication: {
    email: String,
    password: String
  }
});

userSchema.methods.hashPassword = function(password) {
  console.log('pASSWORD' + password);
  var hash = this.authentication.password = bcrypt.hashSync(password, 8);
  console.log('HASH' + hash);
  return hash;
};

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.authentication.password);
};

userSchema.methods.generateToken = function() {
  console.log('GENERATE TOKEN FUNCTION HIT ON USER MODEL');
  return jwt.sign({id: this._id}, process.env.APP_SECRET || 'changethis');
};

module.exports = exports = mongoose.model('User', userSchema);
