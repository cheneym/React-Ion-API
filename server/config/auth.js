const passport = require('passport');
const bcrypt = require('bcrypt-nodejs');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../../db/models/userModel');

module.exports = () => {
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
