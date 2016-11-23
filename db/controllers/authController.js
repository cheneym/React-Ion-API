const User = require('../models/userModel');

module.exports.login = (req, res) =>
  res.json({ data: {
    id: req.user.id,
    username: req.user.username,
  } });

module.exports.signup = (req, res) => {
  const username = req.body.username;
  User.findOne({ username }, (err, user) => {
    if (err) {
      return res.status(400).json({
        errorCode: 400,
        errorMessage: 'Unable to retrieve user',
      });
    }
    if (user) {
      return res.status(400).json({
        errorCode: 400,
        errorMessage: 'Username taken',
      });
    }
    return User.create(req.body, (err2, newUser) => {
      if (err2) {
        return res.status(400).json({
          errorCode: 400,
          errorMessage: 'Unable to create user',
        });
      }
      return res.json({ data: {
        id: newUser.id,
        username: newUser.username,
      } });
    });
  });
};

module.exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({
        errorCode: 500,
        errorMessage: 'Failed to destroy session',
      });
    }
    return res.status(304).json({ data: 'Logout Successful' });
  });
};
