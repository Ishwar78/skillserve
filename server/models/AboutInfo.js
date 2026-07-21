const mongoose = require('mongoose');

const aboutInfoSchema = new mongoose.Schema({
  heroTitle: {
    type: String,
    required: true,
  },
  heroDescription: {
    type: String,
    required: true,
  },
  introTitle: {
    type: String,
    required: true,
  },
  introLeadText: {
    type: String,
    required: true,
  },
  introContent: {
    type: String,
    required: true,
  },
  missionTitle: {
    type: String,
    required: true,
  },
  missionDescription: {
    type: String,
    required: true,
  },
  visionTitle: {
    type: String,
    required: true,
  },
  visionDescription: {
    type: String,
    required: true,
  }
}, { timestamps: true });

const AboutInfo = mongoose.model('AboutInfo', aboutInfoSchema);

module.exports = AboutInfo;
