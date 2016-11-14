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


function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  //lint says I need to put a return here???
  return res.redirect('/');
}

router.route('/login')
      .get(userController.loginPage);

router.route('/login')
      .post(userController.login);

router.route('/logout')
      .get(userController.logout);

router.route('/:id')
///do we put isLoggedin Middleware here????
      .get(isLoggedIn, userController.getProfile);

router.route('/signup')
      .get(userController.signupPage);

router.route('/signup')
      .post(userController.signup);

module.exports = router;


