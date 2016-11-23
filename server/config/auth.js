const { passport } = require('./middleware');
const User = require('../../db/models/userModel');
const bcrypt = require('bcrypt-nodejs');
const LocalStrategy = require('passport-local').Strategy;


module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findOne({ id }, (err, user) => {
      done(err, user);
    });
  });

  const validateUserPass = (username, password, done) => {
    User.findOne({ username }, (err, user) => {
      if (err) {
        return done(null, false, { message: 'Incorrect username or password.' });
      }
      if (user) {
        const salt = user.salt;
        const encryptpw = user.password;
        if (bcrypt.hashSync(password, salt) === encryptpw) {
          return done(null, user);
        }
        return done(null, false, { message: 'Incorrect username or password.' });
      }
      return done(null, false, { message: 'Incorrect username or password.' });
    });
  };

  passport.use(new LocalStrategy(validateUserPass));
};

module.exports.passport = passport;
