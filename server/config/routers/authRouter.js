const express = require('express');
const authController = require('../../../db/controllers/authController');
const passport = require('passport');

const router = new express.Router();

router.route('/login')
  .post((req, res, next) => {
    passport.authenticate('local', (err, user) => {
      if (err) { return next(err); }
      if (!user) {
        return res.status(401).json({
          errorCode: 401,
          errorMessage: 'Unauthorized',
        });
      }
      return req.logIn(user, (err2) => {
        if (err2) { return next(err2); }
        return next();
      });
    })(req, res, next);
  }, authController.login);

router.route('/signup')
  .post(authController.signup);

router.route('/logout')
  .get(authController.logout);

// router.route('/authenticated')
//   .get(authController.checkAuthentication);

module.exports = router;
