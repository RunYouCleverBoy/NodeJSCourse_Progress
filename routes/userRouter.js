const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.param('id', userController.checkID);

router.route('/').get(userController.getAllUsers).post(userController.postNewUser);

router
  .route('/:id')
  .get(userController.getUser)

router.route('/forgotPassword').post(authController.forgotPassword);
router.route('/resetPassword/:token').patch(authController.resetPassword);
router.route('/updateMyPassword').patch(authController.protect, authController.updatePassword);

router.route('/me').get(authController.protect, userController.getMe, userController.getUser);
router.route('/updateMe').patch(authController.protect, userController.updateMe);
router.route('/deleteMe').delete(authController.protect, userController.deleteMe);

module.exports = router;