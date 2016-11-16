const User = require('../models/userModel');
const bcrypt = require('bcrypt-nodejs');
const passport = require('passport');

module.exports.login = passport.authenticate('local',
  { failureRedirect: '/user/login' },
  (req, res) => {
    res.end('works');
  });

module.exports.signup = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username }, (err, user) => {
    if (err) { return res.status(404).end('Unable to retrieve user'); }
    if (user) { return res.status(404).end('Username taken'); }
    return bcrypt.genSalt(10, (err2, salt) => {
      if (err2) { return res.status(404).end('Unable to create salt'); }
      return bcrypt.hash(password, salt, null, (err3, hash) => {
        if (err3) { return res.status(404).end('Unable to hash password'); }
        return User.create({ username, password: hash, salt }, (err4) => {
          if (err4) { return res.status(404).end('Unable to create user'); }
          return res.end('works');
        });
      });
    });
  });
};
