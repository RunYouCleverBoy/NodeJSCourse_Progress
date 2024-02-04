// Import necessary modules and models
const Review = require('../models/reviewModel');
const handlerFactory = require('./handlerFactory');

// Import necessary modules and models
// const catchAsync = require('../utils/catchAsync');
// const AppError = require('../utils/appError');

// Get all reviews
exports.getAllReviews = handlerFactory.getAll(Review);
exports.getReview = handlerFactory.getOne(Review);
exports.createReview = handlerFactory.createOne(Review);
exports.updateReview = handlerFactory.updateOne(Review);
exports.deleteReview = handlerFactory.deleteOne(Review);

exports.setTourUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};
