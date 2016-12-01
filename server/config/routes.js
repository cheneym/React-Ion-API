const userRouter = require('./routers/userRouter');
const projectRouter = require('./routers/projectRouter');
const authRouter = require('./routers/authRouter');

module.exports = (app) => {
  app.use((req, res, next) => {
    const allowedOrigins = ['http://localhost:8080', 'http://react-ion.herokuapp.com', 'https://react-ion.herokuapp.com', 'http://www.react-ion.com'];
    const origin = req.headers.origin;
    if (allowedOrigins.indexOf(origin) > -1) { res.header('Access-Control-Allow-Origin', origin); }
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials', true);
    next();
  });
  app.use('/api/user', userRouter);
  app.use('/api/project', projectRouter);
  app.use('/', authRouter);
  app.get('/*', (req, res) => {
    res.status(404).json({
      errorCode: 404,
      errorMessage: '404 Invalid Request',
    });
  });
  app.options('/*', (req, res) => { res.status(200).end(); });
};
