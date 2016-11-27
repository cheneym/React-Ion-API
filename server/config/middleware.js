const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');

module.exports = (app) => {
  app.use(morgan('dev'));
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(session({ secret: 'password', resave: true, saveUninitialized: true }));
  app.use(passport.initialize());
  app.use(passport.session());
};
