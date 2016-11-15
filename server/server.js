const express = require('express');
const db = require('./config/connection');
const User = require('../db/models/userModel');

//passport packages
const passport = require('passport');
const session = require('express-session');
const bcrypt = require('bcrypt-nodejs');
const LocalStrategy = require('passport-local').Strategy;
const saltRounds = 10;

const app = express();
require('./config/middleware')(app, express);
require('./config/routes')(app, express);

//passport set up
app.use(session({ secret: 'password', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.get({ id }, (err, user) => {
    done(err, user);
  });
});

const validateUserPass = function (username, password, done) {
  User.get({ username }, (err, users) => {
    if (err) {
      return done(null, false, { message: 'Incorrect username or password.' });
    }
    if (users.length) {
      const salt = users[0].salt;
      const encryptpw = users[0].password;

      if (bcrypt.hashSync(password, salt) === encryptpw) {
        console.log('match');
        return done(null, users[0]);  
      } else {
        console.log('not a match')
        return done(null, false, { message: 'Incorrect username or password.' });
      }
    } else {
      console.log('no username exists')
      return done(null, false, { message: 'Incorrect username or password.' });
    }
  });
};

passport.use(new LocalStrategy(validateUserPass));

const loggedIn = function (req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect('/login');
  }
};

app.post('/login', passport.authenticate('local',
  {
    successRedirect: '/',
    failureRedirect: '/login',
  }));

app.post('/signup', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  User.get({ username }, (err, users) => {
    if (err) {
      res.status(404).end('unable to retrieve user');
    }
    if (users.length) {
      res.send('username exists');
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, null, (err, hash) => {
          if (err) {
            res.send(err);
          }

          User.create({
            username,
            password: hash,
            salt,
          });

          res.send('user created');
        });
      });
    }
  });
});


const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
