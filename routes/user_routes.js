const express = require('express');
const jwtAuth = require(__dirname + '/../lib/jwt_auth');
const jsonParser = require('body-parser').json();
const User = require(__dirname + '/../models/user');
const handleDBError = require(__dirname + '/../lib/handle_db_error');

// const router = module.exports = exports = express.Router();

module.exports = (apiRouter) => {

apiRouter.route('/currentuser')
  .get(jsonParser, jwtAuth, (req, res) => {
    User.findOne({_id: req.user._id}, (err, data) => {
      if (err) return handleDBError(err, res);

      res.json({username: data.username});
    });
  })
}
