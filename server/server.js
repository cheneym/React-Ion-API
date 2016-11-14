const express = require('express');
const db = require('./config/connection');


//passport packages
const passport = require('passport');
const session = require('express-session');
const bcrypt = require('bcrypt-nodejs');


const app = express();

//passport set up
app.use(session({ secret: 'password', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

require('./config/middleware')(app, express);
//need to pass in passport to the routes /////////////////
require('./config/routes')(app, express);

require('./config/passport')(passport);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
