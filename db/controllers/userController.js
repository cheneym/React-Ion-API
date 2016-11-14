const User = require('../models/userModel');

module.exports.getUser = (req, res) => {
  const id = req.params.userId;
  User.get({ id }, (err, users) => {
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
  const id = req.body.userId;
  User.get({ id }, (err, users) => {
    if (err) { res.status(404).end('Unable to retrieve user'); }
    if (users.length > 0) {
      res.status(404).end('User already exists');
    } else {
      User.create({ id }, (err2, status) => {
        if (err2) { res.status(404).end('Unable to create user'); }
        res.json(status);
      });
    }
  });
};

// NOTE: When user is remove, need to remove projects related to user if
// that user is te only one who owned them
module.exports.removeUser = (req, res) => {
  const id = req.body.userId;
  User.remove({ id }, (err2, status) => {
    if (err2) { res.status(404).end('Unable to remove user'); }
    res.json(status);
  });
};

// module.exports.makeOutline = (req, res) => {
// };

module.exports.loginPage = (req, res) => {
  res.render('/');
};

module.exports.login = (req, res) => {
   passport.authenticate('local-login', {
     successRedirect: '/profile', // redirect to the secure profile section
     failureRedirect: '/signup', // redirect back to the signup page if there is an error
   });
};

module.exports.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};

module.exports.getProfile = (req, res) => {
  res.render('/:id');
};

module.exports.signupPage = (req, res) => {
  res.render('/signupPage');
};

module.exports.signup = (req, res) => {
  passport.authenticate('local-signup', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/signup', // redirect back to the signup page if there is an error
  });
}

