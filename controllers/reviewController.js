// Import necessary modules and models
const Review = require('../models/review');

// Import necessary modules and models
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Get all reviews
exports.getAllReviews = catchAsync(async (req, res, next) => {
  let reviews = await Review.find();
  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

exports.getReview = catchAsync(async (req, res, next) => {
    let review = await Review.findById(req.params.id);
    if (!review) {
        return next(new AppError('No review found with that ID', 404));
    }
    res.status(200).json({
        status: 'success',
        data: {
            review,
        },
    });
});

exports.createReview = catchAsync(async (req, res, next) => {
    let newReview = await Review.create(req.body);
    res.status(201).json({ status: 'success', data: { review: newReview } });
});

exports.updateReview = catchAsync(async (req, res, next) => {
    let review = await Review.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ status: 'success', data: { review } });
});

exports.deleteReview = catchAsync(async (req, res, next) => {
    await Review.findByIdAndDelete(req.params.id);
    res.status(204).json({ status: 'success', data: null });
});

exports.setTourUserIds = (req, res, next) => {
    // Allow nested routes
    if (!req.body.tour) req.body.tour = req.params.tourId;
    if (!req.body.user) req.body.user = req.user.id;
    next();
}