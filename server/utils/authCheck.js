module.exports.authCheck = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).send('Unauthorized');
  }
  return next();
};
