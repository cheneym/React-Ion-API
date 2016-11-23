const User = require('../models/userModel');

module.exports.login = (req, res) => {
  if (req.user) {
    const user = req.user;
    return res.json({
      id: user.id,
      username: user.username,
    });
  }
  return res.status(404).end('Failed to authenticate user');
};

module.exports.signup = (req, res) => {
  const username = req.body.username;
  User.findOne({ username }, (err, user) => {
    if (err) { return res.status(404).end('Unable to retrieve user'); }
    if (user) { return res.status(404).end('Username taken'); }
    return User.create(req.body, (err2, newUser) => {
      if (err2) { res.status(404).end('Unable to create user'); }
      return res.json({
        id: newUser.id,
        username: newUser.username,
      });
    });
  });
};

module.exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) { return res.status(404).end('Failed to destroy session'); }
    return res.status(304).end('Logout Successful');
  });
};
