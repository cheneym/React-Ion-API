const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');

module.exports = (app, express) => {
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, '/../views'));
  app.use(morgan('dev'));
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, '/../../dist')));
  app.use(session({ secret: 'password', resave: true, saveUninitialized: true }));
  app.use(passport.initialize());
  app.use(passport.session());
};
