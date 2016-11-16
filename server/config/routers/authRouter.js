const express = require('express');
const authController = require('../../../db/controllers/authController');

const router = new express.Router();

router.route('/login')
  .post(authController.login);

router.route('/signup')
  .post(authController.signup);

router.route('/logout')
  .get(authController.logout);

module.exports = router;
