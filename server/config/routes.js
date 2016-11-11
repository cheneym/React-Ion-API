// const userRouter = require('./routers/userRouter');
const outlineRouter = require('./routers/outlineRouter');

module.exports = (app) => {
  // app.use('/api/user', userRouter);
  app.use('/api/outline', outlineRouter);
};
