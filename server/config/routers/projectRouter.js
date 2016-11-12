const express = require('express');
const projectController = require('../../../db/controllers/projectController');

const router = new express.Router();

router.route('/:id')
  .get(projectController.getProject);

module.exports = router;
