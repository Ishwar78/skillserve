const Category = require('../models/Category');
const multer = require('multer');
const path = require('path');

// Multer config for category image upload
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/'));
  },
  filename(req, file, cb) {
    cb(
      null,
      `category-${Date.now()}${path.extname(file.originalname)}`
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

// @desc    Get all categories
// @route   GET /categories
// @access  Public
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({}).sort({ createdAt: 1 });
    res.json(categories);
  } catch (error) {
    console.error("Error in getCategories:", error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a category
// @route   POST /categories
// @access  Admin
const createCategory = async (req, res) => {
  try {
    const { title, courses, link } = req.body;
    let image = '';
    if (req.file) {
      image = `http://localhost:5000/uploads/${req.file.filename}`;
    } else {
      return res.status(400).json({ message: 'Category image is required' });
    }

    const category = new Category({
      title,
      courses: Number(courses) || 0,
      image,
      link: link || `/courses/${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-course`
    });

    const createdCategory = await category.save();
    res.status(201).json(createdCategory);
  } catch (error) {
    console.error("Error in createCategory:", error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a category
// @route   PUT /categories/:id
// @access  Admin
const updateCategory = async (req, res) => {
  try {
    const { title, courses, link } = req.body;
    const category = await Category.findById(req.params.id);

    if (category) {
      category.title = title || category.title;
      category.courses = courses !== undefined ? Number(courses) : category.courses;
      category.link = link || category.link;

      if (req.file) {
        category.image = `http://localhost:5000/uploads/${req.file.filename}`;
      }

      const updatedCategory = await category.save();
      res.json(updatedCategory);
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    console.error("Error in updateCategory:", error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a category
// @route   DELETE /categories/:id
// @access  Admin
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (category) {
      await category.deleteOne();
      res.json({ message: 'Category removed' });
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    console.error("Error in deleteCategory:", error);
    res.status(500).json({ message: error.message });
  }
};

// Seeder function
const seedCategories = async () => {
  try {
    const count = await Category.countDocuments();
    if (count === 0) {
      const initialCategories = [
        {
          title: "CNC-VMC & Manufacturing",
          courses: 6,
          image: "/Category/cnc-vmc.png",
          link: "/courses/cnc-programming-course",
        },
        {
          title: "PLC Automation & IIOT",
          courses: 2,
          image: "/Category/PLC.png",
          link: "/courses/plc-scada-course",
        },
        {
          title: "CAD-CAM Designing",
          courses: 5,
          image: "/Category/cad-cam.png",
          link: "/courses/cad-cam-course",
        },
        {
          title: "Electric Vehicle",
          courses: 3,
          image: "/Category/electric.png",
          link: "/courses/electric-vehicle-course",
        },
        {
          title: "Digital Marketing & AI",
          courses: 2,
          image: "/Category/digital.png",
          link: "/courses/digital-marketing-course",
        },
        {
          title: "Electronics & Robotics",
          courses: 3,
          image: "/Category/Robotics.png",
          link: "/courses/electronics-robotics-course",
        },
      ];
      await Category.insertMany(initialCategories);
      console.log('Default categories seeded successfully.');
    } else {
      console.log('Categories already exist in database.');
    }
  } catch (error) {
    console.error('Error seeding categories:', error);
  }
};

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  seedCategories,
  upload,
};
