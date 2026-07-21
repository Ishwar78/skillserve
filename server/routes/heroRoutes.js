const express = require('express');
const router = express.Router();
const {
  getHeroInfo,
  updateHeroInfo,
  upload
} = require('../controllers/heroController');

router.route('/')
  .get(getHeroInfo)
  .put((req, res, next) => {
    upload.array('images', 10)(req, res, function (err) {
      if (err) {
        return res.status(400).json({ message: err.message || err });
      }
      next();
    });
  }, updateHeroInfo);

module.exports = router;
