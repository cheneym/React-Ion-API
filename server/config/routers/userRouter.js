const express = require('express');
const userController = require('../../../db/controllers/userController');

const router = new express.Router();

router.route('/projects')
  .get(userController.getProjects);

module.exports = router;
