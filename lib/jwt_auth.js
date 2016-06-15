const User = require(__dirname + '/../models/user');
const jwt = require('jsonwebtoken');

module.exports = exports = function(req, res, next) {
  console.log('JWT AUTH HAS BEEN HIT WITH SUPPOSED HEADERS' + req.body);
  var decoded;
  try {
    decoded = jwt.verify(req.headers.token, process.env.APP_SECRET || 'changethis');
  } catch(e) {
    return res.status(401).json({msg: 'could not authenticate'});
  }
  User.findOne({_id: decoded.id}, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(401).json({msg: 'could not authenticate'});
    }

    if (!user) return res.status(401).json({msg: 'could not authenticate'});

    req.user = user;
    next();
  });
};
