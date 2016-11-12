const express = require('express');
const projectController = require('../../../db/controllers/projectController');

const router = new express.Router();

router.route('/:userId')
  .get(projectController.getProjects);

router.route('/')
  .post(projectController.createProject);

router.route('/generate')
  .post(projectController.generateProject);

module.exports = router;
