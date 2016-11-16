const userRouter = require('./routers/userRouter');
const projectRouter = require('./routers/projectRouter');

module.exports = (app) => {
  app.use('/user', userRouter);
  app.use('/api/project', projectRouter);
};
