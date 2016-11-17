const userRouter = require('./routers/userRouter');
const projectRouter = require('./routers/projectRouter');
const authRouter = require('./routers/authRouter');

module.exports = (app) => {
  app.use('/api/user', userRouter);
  app.use('/api/project', projectRouter);
  app.use('/', authRouter);
};
