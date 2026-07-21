const HeroInfo = require('../models/HeroInfo');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Multer config for hero image upload
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/'));
  },
  filename(req, file, cb) {
    cb(
      null,
      `hero-${Date.now()}${path.extname(file.originalname)}`
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

// @desc    Get Hero Info
// @route   GET /hero-info
// @access  Public
const getHeroInfo = async (req, res) => {
  try {
    const heroInfo = await HeroInfo.findOne();
    if (heroInfo) {
      res.json(heroInfo);
    } else {
      res.status(404).json({ message: 'Hero info not found' });
    }
  } catch (error) {
    console.error("Error fetching hero info:", error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update Hero Info
// @route   PUT /hero-info
// @access  Admin
const updateHeroInfo = async (req, res) => {
  try {
    const { title, subtitle, existingImages } = req.body;
    let heroInfo = await HeroInfo.findOne();

    let updatedImagesList = [];
    if (existingImages) {
      try {
        updatedImagesList = typeof existingImages === 'string' ? JSON.parse(existingImages) : existingImages;
      } catch (e) {
        updatedImagesList = [];
      }
    }

    if (req.files && req.files.length > 0) {
      const newFiles = req.files.map(file => `/uploads/${file.filename}`);
      updatedImagesList = [...updatedImagesList, ...newFiles];
    }

    if (!heroInfo) {
      heroInfo = new HeroInfo({
        title,
        subtitle,
        images: updatedImagesList,
        image: updatedImagesList[0] || ''
      });
    } else {
      heroInfo.title = title || heroInfo.title;
      heroInfo.subtitle = subtitle || heroInfo.subtitle;
      heroInfo.images = updatedImagesList;
      if (updatedImagesList.length > 0) {
        heroInfo.image = updatedImagesList[0];
      }
    }

    const updatedHeroInfo = await heroInfo.save();
    res.json(updatedHeroInfo);
  } catch (error) {
    console.error("Error updating hero info:", error);
    res.status(500).json({ message: error.message });
  }
};

// Seeder logic
const seedHeroInfo = async () => {
  try {
    const defaultImg = "https://images.unsplash.com/photo-1573164574572-cb89e39749b4?q=80&w=2069&auto=format&fit=crop";
    const count = await HeroInfo.countDocuments();
    if (count === 0) {
      await HeroInfo.create({
        title: "Learn the Skills Top Companies Seek",
        subtitle: "Don't stay behind in this fast world — learn the skills that will get you employed in the AI era.",
        image: defaultImg,
        images: [defaultImg]
      });
      console.log('Hero Info seeded successfully');
    } else {
      const existing = await HeroInfo.findOne();
      if (existing && (!existing.images || existing.images.length === 0)) {
        existing.images = [existing.image || defaultImg];
        await existing.save();
      }
    }
  } catch (error) {
    console.error('Error seeding Hero Info:', error);
  }
};

module.exports = {
  getHeroInfo,
  updateHeroInfo,
  seedHeroInfo,
  upload
};
