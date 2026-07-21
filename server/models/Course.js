const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    index: true,
  },
  category: {
    type: String,
    required: true, // e.g. "cnc-programming-course"
  },
  img: {
    type: String,
    required: true,
  },
  badge: {
    type: String,
    default: '',
  },
  badgeColor: {
    type: String,
    default: 'badge-orange',
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  reviews: {
    type: Number,
    default: 100,
  },
  duration: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    default: 'Gurugram',
  },
  price: {
    type: String,
    required: true,
  },
  titleColor: {
    type: String,
    default: 'text-blue',
  },
  overview: {
    type: String,
    required: true,
  },
  features: {
    type: [String],
    default: [],
  },
  curriculum: [
    {
      title: { type: String, required: true },
      desc: { type: String, required: true }
    }
  ],
  isFeatured: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
