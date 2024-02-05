const express = require('express');
const router = express.Router();
const tourController = require('../controllers/tourController');
const authController = require('../controllers/authController');
const reviewRouter = require('./reviewRouter');

router
  .route('/tour-stats')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide', 'guide'),
    tourController.getTourStats
  );
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);
router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);
router
  .route('/')
  .get(tourController.getAllTours)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.createTour
  );
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.updateTour
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );

router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(tourController.getToursWithin);

router.use('/:tourId/reviews', reviewRouter);

module.exports = router;
