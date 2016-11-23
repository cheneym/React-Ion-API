module.exports.authCheck = (req, res, next) => {
  console.log('reqbody2', req.body);
  if (!req.isAuthenticated()) {
    return res.status(401).send('Unauthorized');
  }
  return next();
};
