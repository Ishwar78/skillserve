const express = require('express');
const router = express.Router();
const {
  getCourses,
  getCoursesByCategory,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  upload
} = require('../controllers/courseController');

router.route('/')
  .get(getCourses)
  .post((req, res, next) => {
    upload.single('img')(req, res, function (err) {
      if (err) {
        return res.status(400).json({ message: err.message || err });
      }
      next();
    });
  }, createCourse);

router.route('/category/:categoryId')
  .get(getCoursesByCategory);

router.route('/:id')
  .get(getCourseById)
  .put((req, res, next) => {
    upload.single('img')(req, res, function (err) {
      if (err) {
        return res.status(400).json({ message: err.message || err });
      }
      next();
    });
  }, updateCourse)
  .delete(deleteCourse);

module.exports = router;
