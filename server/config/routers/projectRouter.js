const express = require('express');
const projectController = require('../../../db/controllers/projectController');
const authCheck = require('../../utils/authCheck').authCheck;

const router = new express.Router();

// Get all projects
router.route('/')
  .get(authCheck, projectController.getProjects);

// Generate files for project
router.route('/generate')
  .post(projectController.generateProject);

// Get one project
router.route('/:projectId')
  .get(authCheck, projectController.getProject);

// Create one project
router.route('/')
  .post(authCheck, projectController.createProject);

// Update one project
router.route('/:projectId')
  .put(authCheck, projectController.updateProject);

// Remove one project
router.route('/:projectId')
  .delete(authCheck, projectController.removeProject);

// Get owner of project
router.route('/:projectId/owner')
  .get(authCheck, projectController.findOwner);

module.exports = router;
