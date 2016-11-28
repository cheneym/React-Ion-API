const userRouter = require('./routers/userRouter');
const projectRouter = require('./routers/projectRouter');
const authRouter = require('./routers/authRouter');

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
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
};
