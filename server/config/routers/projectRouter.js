const express = require('express');
const projectController = require('../../../db/controllers/projectController');
const authCheck = require('../../utils/authCheck').authCheck;

const router = new express.Router();

// Get all projects
router.route('/')
  .get(projectController.getProjects);

// Generate files for project
router.route('/generate')
  .get(projectController.generateProject);

// Get one project
router.route('/:projectId')
  .get(projectController.getProject);

// Create one project
router.route('/')
  .post(authCheck, projectController.createProject);

// Update one project
router.route('/:projectId')
  .put(authCheck, projectController.updateProject);

// Remove one project
router.route('/:projectId')
  .delete(projectController.removeProject);

module.exports = router;
