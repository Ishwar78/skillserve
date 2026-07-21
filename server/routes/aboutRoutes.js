const express = require('express');
const router = express.Router();
const {
  getAboutInfo,
  updateAboutInfo
} = require('../controllers/aboutController');

router.route('/')
  .get(getAboutInfo)
  .put(updateAboutInfo);

module.exports = router;
