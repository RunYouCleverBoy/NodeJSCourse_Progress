const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title for the review'],
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: [true, 'Please provide a rating between 1 and 5'],
    },
    description: {
        type: String,
        required: [true, 'Please provide a description for the review'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    // Parent referencing
    tour: {
        type: mongoose.Schema.ObjectId,
        ref: 'Tour',
        required: [true, 'Review must belong to a tour'],
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Review must belong to a user'],
    },
});

reviewSchema.pre(/^find/, function (next) {
    this
    .populate({ path: 'user', select: 'name photo' })
    .populate({ path: 'tour', select: 'name' });
    next();
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
