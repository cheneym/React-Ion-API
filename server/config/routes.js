const outlineRouter = require('./routers/outlineRouter');

module.exports = (app) => {
  app.use('/api/outline', outlineRouter);
};
