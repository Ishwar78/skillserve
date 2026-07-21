const Inquiry = require('../models/Inquiry');

// @desc    Get all inquiries
// @route   GET /inquiries
// @access  Admin
const getInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find({}).sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (error) {
    console.error("Error in getInquiries:", error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new inquiry
// @route   POST /inquiries
// @access  Public
const createInquiry = async (req, res) => {
  try {
    const {
      name,
      fatherName,
      mobile,
      email,
      state,
      district,
      domain,
      course,
      message,
      source,
    } = req.body;

    const inquiry = new Inquiry({
      name,
      fatherName,
      mobile,
      email,
      state,
      district,
      domain,
      course,
      message,
      source: source || 'Popup',
    });

    const createdInquiry = await inquiry.save();
    res.status(201).json(createdInquiry);
  } catch (error) {
    console.error("Error in createInquiry:", error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete an inquiry
// @route   DELETE /inquiries/:id
// @access  Admin
const deleteInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    if (inquiry) {
      await inquiry.deleteOne();
      res.json({ message: 'Inquiry removed' });
    } else {
      res.status(404).json({ message: 'Inquiry not found' });
    }
  } catch (error) {
    console.error("Error in deleteInquiry:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getInquiries,
  createInquiry,
  deleteInquiry,
};
