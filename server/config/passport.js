const LocalStrategy = require('passport-local').Strategy;
const User = require('../../db/models/userModel');

module.exports = function(passport) {

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    //need a findById function /////////////////////////
      User.get({id}, (err, user) => {
          done(err, user);
      });
  });

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass back the entire request to the callback
  },
  function(req, username, password, done) {

      // asynchronous
      // User.findOne wont fire unless data is sent back
      process.nextTick(function() {

      // find a user whose email is the same as the forms email
      // we are checking to see if the user trying to login already exists
      User.get({ username }, function(err, user) {
          // if there are any errors, return the error
        if (err) {
          return done(err);
        }

        if (user) {
          return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
        } else {
            // if there is no user with that email
            // create the user new User 
          var newUser = new User();

          // set the user's local credentials
          newUser.username = username;
          newUser.password = newUser.generateHash(password);

          // save the user
          //Need a .save function /////////////////////////////
          newUser.create(err => {
            if (err) {
              throw err;
            }
            return done(null, newUser);
          });
        }
      });
      });
  }));
};

passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
      usernameField : 'username',
      passwordField : 'password',
      passReqToCallback : true // allows us to pass back the entire request to the callback
  },
  function(req, username, password, done) { // callback with email and password from our form
      // find a user whose email is the same as the forms email
      // we are checking to see if the user trying to login already exists
    User.get({ 'local.username': username }, (err, user) => {
        // if there are any errors, return the error before anything else
      if (err) {
        return done(err);
      }
      // if no user is found, return the message
      if (!user) {
        return done(null, false, { loginMessage: 'No user found.' }); // req.flash is the way to set flashdata using connect-flash
      }

      // if the user is found but the password is wrong
      if (!user.validPassword(password)) {
        return done(null, false, { loginMessage: 'Oops! Wrong password.' }); // create the loginMessage and save it to session as flashdata
      }

      // all is well, return successful user
      return done(null, user);
    });
  }));

