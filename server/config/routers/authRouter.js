const express = require('express');
const authController = require('../../../db/controllers/authController');
const { passport } = require('../auth');

const router = new express.Router();

router.route('/login')
  .post(passport.authenticate('local'), authController.login);

router.route('/signup')
  .post(authController.signup);

router.route('/logout')
  .get(authController.logout);

module.exports = router;
