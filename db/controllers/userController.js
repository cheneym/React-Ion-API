const User = require('../models/userModel');
const bcrypt = require('bcrypt-nodejs');
const passport = require('passport');

module.exports.login = passport.authenticate('local',
  {
    successRedirect: '/',
    failureRedirect: '/login',
  });

module.exports.signup = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  User.find({ username }, (err, users) => {
    if (err) {
      res.status(404).end('Unable to retrieve user');
    } else if (users.length > 0) {
      res.status(404).end('Username taken');
    } else {
      bcrypt.genSalt(10, (err2, salt) => {
        if (err2) {
          res.status(404).end('Unable to create salt');
        } else {
          bcrypt.hash(password, salt, null, (err3, hash) => {
            if (err3) {
              res.status(404).end('Unable to hash password');
            } else {
              User.create({
                username,
                password: hash,
                salt,
              });
              res.send('user created');
            }
          });
        }
      });
    }
  });
};
