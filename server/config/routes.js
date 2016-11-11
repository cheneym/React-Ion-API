const outlineRouter = require('./routers/outline');

module.exports = (app) => {
  app.use('/api/outline', outlineRouter);
};
