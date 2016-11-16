const express = require('express');
const projectController = require('../../../db/controllers/projectController');

const router = new express.Router();

// Get all projects
router.route('/')
  .get(projectController.getProjects);

// Get one project
router.route('/:projectId')
  .get(projectController.getProject);

// Create one project
router.route('/')
  .post(projectController.createProject);

// Update one project
router.route('/:projectId')
  .put(projectController.updateProject);

// Remove one project
router.route('/:projectId')
  .delete(projectController.removeProject);

// Generate files for project
router.route('/generate')
  .post(projectController.generateProject);

module.exports = router;
