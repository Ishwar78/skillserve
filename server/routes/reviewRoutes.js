const express = require('express');
const router = express.Router();
const { getReviews, createReview, deleteReview, upload } = require('../controllers/reviewController');

router.route('/')
  .get(getReviews)
  .post((req, res, next) => {
    upload.single('img')(req, res, function (err) {
      if (err) {
        return res.status(400).json({ message: err.message || err });
      }
      next();
    });
  }, createReview);

router.route('/:id')
  .delete(deleteReview);

module.exports = router;
