const express = require('express');
const userController = require('../../../db/controllers/userController');

const router = new express.Router();

router.route('/:userId')
  .get(userController.getUser);

router.route('/')
  .post(userController.createUser);

module.exports = router;
