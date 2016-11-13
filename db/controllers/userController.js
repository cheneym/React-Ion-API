const User = require('../models/userModel');

module.exports.getUser = (req, res) => {
  const userId = req.params.userId;
  User.get({ id: userId }, (err, users) => {
    if (err) { res.status(404).end('Unable to retrieve user'); }
    if (users.length > 0) {
      res.json(users[0]);
    } else {
      res.status(404).end('User does not exist');
    }
  });
};

module.exports.getUsers = (req, res) => {
  User.get({}, (err, users) => {
    if (err) { res.status(404).end('Unable to retrieve user'); }
    res.json(users);
  });
};

module.exports.createUser = (req, res) => {
  const userId = req.body.userId;
  User.get({ id: userId }, (err, users) => {
    if (err) { res.status(404).end('Unable to retrieve user'); }
    if (users.length > 0) {
      res.status(404).end('User already exists');
    } else {
      User.create({ id: userId }, (err2, status) => {
        if (err2) { res.status(404).end('Unable to create user'); }
        res.json(status);
      });
    }
  });
};

module.exports.removeUser = (req, res) => {
  const userId = req.body.userId;
  User.remove({ id: userId }, (err2, status) => {
    if (err2) { res.status(404).end('Unable to remove user'); }
    res.json(status);
  });
};
