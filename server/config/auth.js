const passport = require('passport');
const bcrypt = require('bcrypt-nodejs');
const LocalStrategy = require('passport-local').Strategy;
const expressJwt = require('express-jwt');
const User = require('../../db/models/userModel');

const authenticate = expressJwt({
  secret: 'React-Ion-Secret',
  getToken: (req) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
      return req.query.token;
    } else if (req.cookies.access_token) {
      return req.cookies.access_token;
    }
    return null;
  },
});


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

module.exports.authenticate = authenticate;
