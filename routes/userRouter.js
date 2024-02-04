const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.param('id', userController.checkID);
router.route('/forgotPassword').post(authController.forgotPassword);
router.route('/resetPassword/:token').patch(authController.resetPassword);

// Protect all routes after this middleware
router.use(authController.protect);

router.use(authController.restrictTo('admin'));
router.route('/').get(userController.getAllUsers)

router.use(authController.restrictTo('admin', 'lead-guide', 'user'));
router.route('/').post(userController.postNewUser);

router
  .route('/:id')
  .get(userController.getUser)

router.route('/updateMyPassword').patch(authController.updatePassword);


router.route('/me').get(userController.getMe, userController.getUser);
router.route('/updateMe').patch(userController.updateMe);
router.route('/deleteMe').delete(userController.deleteMe);

module.exports = router;