const express = require('express');
const userController = require('../../../db/controllers/userController');
const { authenticate } = require('../auth.js');

const router = new express.Router();

router.route('/projects')
  .get(authenticate, userController.getProjects);

router.route('/info')
  .get(authenticate, userController.getInfo);

module.exports = router;
