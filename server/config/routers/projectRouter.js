const express = require('express');
const projectController = require('../../../db/controllers/projectController');
const { authenticate } = require('../auth.js');

const router = new express.Router();

// Get all projects
router.route('/')
  .get(authenticate, projectController.getProjects);

// Generate files for project
router.route('/generate')
  .post(projectController.generateProject);

// Get one project
router.route('/:projectId')
  .get(authenticate, projectController.getProject);

// Create one project
router.route('/')
  .post(authenticate, projectController.createProject);

// Update one project
router.route('/:projectId')
  .put(authenticate, projectController.updateProject);

// Remove one project
router.route('/:projectId')
  .delete(authenticate, projectController.removeProject);

// Get owner of project
router.route('/:projectId/owner')
  .get(authenticate, projectController.findOwner);

module.exports = router;
