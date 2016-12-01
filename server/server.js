const express = require('express');

const app = express();

require('./config/connection');
require('./config/middleware')(app, express);
require('./config/auth')();
require('./config/routes')(app, express);

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({
      errorCode: 401,
      errorMessage: err.message,
    });
  }
  next();
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
