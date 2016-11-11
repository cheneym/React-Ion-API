const express = require('express');
const outlineController = require('../../../db/controllers/outlineController');

const router = new express.Router();

router.route('/:id')
  .get(outlineController.getOutline);

module.exports = router;
