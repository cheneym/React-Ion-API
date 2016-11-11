const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');

module.exports = (app, express) => {
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, '/../views'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(morgan('dev'));
  app.use(express.static(path.join(__dirname, '/../../client')));
};
