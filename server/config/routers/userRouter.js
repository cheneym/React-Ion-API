const express = require('express');
const userController = require('../../../db/controllers/userController');
const authCheck = require('../../utils/authCheck').authCheck;

const router = new express.Router();

router.route('/projects')
  .get(authCheck, userController.getProjects);

module.exports = router;
