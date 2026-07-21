const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  quote: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    default: 5,
  }
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
