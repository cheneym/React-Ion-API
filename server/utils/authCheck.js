module.exports.authCheck = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({
      errorCode: 401,
      errorMessage: 'Unauthorized',
    });
  }
  return next();
};
