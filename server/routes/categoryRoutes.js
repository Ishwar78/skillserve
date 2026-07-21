const express = require('express');
const router = express.Router();
const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  upload
} = require('../controllers/categoryController');

router.route('/')
  .get(getCategories)
  .post((req, res, next) => {
    upload.single('image')(req, res, function (err) {
      if (err) {
        return res.status(400).json({ message: err.message || err });
      }
      next();
    });
  }, createCategory);

router.route('/:id')
  .put((req, res, next) => {
    upload.single('image')(req, res, function (err) {
      if (err) {
        return res.status(400).json({ message: err.message || err });
      }
      next();
    });
  }, updateCategory)
  .delete(deleteCategory);

module.exports = router;
