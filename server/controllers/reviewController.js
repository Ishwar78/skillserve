const Review = require('../models/Review');
const multer = require('multer');
const path = require('path');

// Multer config for image upload
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/'));
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png|webp|gif|svg/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Images only (jpg, jpeg, png, webp, gif, svg)!'));
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// @desc    Get all reviews
// @route   GET /reviews
// @access  Public
const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({}).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    console.error("Error in getReviews:", error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a review
// @route   POST /reviews
// @access  Admin
const createReview = async (req, res) => {
  try {
    const { name, company, quote } = req.body;
    let img = '';
    if (req.file) {
      img = `https://skillserve-nm1n.onrender.com/uploads/${req.file.filename}`;
    }

    const review = new Review({
      name,
      company,
      quote,
      img,
      rating: 5,
    });

    const createdReview = await review.save();
    res.status(201).json(createdReview);
  } catch (error) {
    console.error("Error in createReview:", error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a review
// @route   DELETE /reviews/:id
// @access  Admin
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (review) {
      await review.deleteOne();
      res.json({ message: 'Review removed' });
    } else {
      res.status(404).json({ message: 'Review not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getReviews,
  createReview,
  deleteReview,
  upload,
};
