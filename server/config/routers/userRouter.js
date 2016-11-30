const express = require('express');
const expressJwt = require('express-jwt');
const userController = require('../../../db/controllers/userController');

const authenticate = expressJwt({ secret: 'React-Ion-Secret' });
const router = new express.Router();

router.route('/projects')
  .get(authenticate, userController.getProjects);

router.route('/info')
  .get(authenticate, userController.getInfo);

module.exports = router;
