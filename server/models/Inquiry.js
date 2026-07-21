const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  fatherName: {
    type: String,
    required: false,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  state: {
    type: String,
    required: false,
  },
  district: {
    type: String,
    required: false,
  },
  domain: {
    type: String,
    required: false,
  },
  course: {
    type: String,
    required: false,
  },
  message: {
    type: String,
    required: false,
  },
  source: {
    type: String,
    default: 'Popup',
  }
}, { timestamps: true });

const Inquiry = mongoose.model('Inquiry', inquirySchema);

module.exports = Inquiry;
