const express = require('express');
const userController = require('../../../db/controllers/userController');

const router = new express.Router();

router.route('/:userId')
  .get(userController.getUser);

router.route('/')
  .get(userController.getUsers);

router.route('/')
  .post(userController.createUser);

router.route('/remove')
  .delete(userController.removeUser);

module.exports = router;

