const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} = require('../controllers/blogController');

// Multer configuration for blog image uploads
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/'));
  },
  filename(req, file, cb) {
    cb(
      null,
      `blog-${Date.now()}${path.extname(file.originalname)}`
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

router.route('/')
  .get(getBlogs)
  .post((req, res, next) => {
    upload.single('image')(req, res, function (err) {
      if (err) {
        return res.status(400).json({ message: err.message || err });
      }
      next();
    });
  }, createBlog);

router.route('/:id')
  .get(getBlogById)
  .put((req, res, next) => {
    upload.single('image')(req, res, function (err) {
      if (err) {
        return res.status(400).json({ message: err.message || err });
      }
      next();
    });
  }, updateBlog)
  .delete(deleteBlog);

module.exports = router;
