const express = require('express');
const passport = require('passport');
const authController = require('../../../db/controllers/authController');
const { authenticate } = require('../auth.js');

const router = new express.Router();

router.route('/login')
  .post((req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user) => {
      if (err) { return next(err); }
      if (!user) {
        return res.status(401).json({
          errorCode: 401,
          errorMessage: 'Unauthorized',
        });
      }
      req.user = user;
      return next();
    })(req, res, next);
  }, authController.login);

router.route('/signup')
  .post(authController.signup);

// router.route('/logout')
//   .get(authController.logout);

router.route('/authenticate')
  .get(authenticate, authController.authenticate);

module.exports = router;
