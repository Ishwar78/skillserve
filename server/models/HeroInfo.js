const mongoose = require('mongoose');

const heroInfoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  images: {
    type: [String],
    default: [],
  }
}, { timestamps: true });

const HeroInfo = mongoose.model('HeroInfo', heroInfoSchema);

module.exports = HeroInfo;
