const Course = require('../models/Course');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');

const slugify = (text) => {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// Multer config for course image upload
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/'));
  },
  filename(req, file, cb) {
    cb(
      null,
      `course-${Date.now()}${path.extname(file.originalname)}`
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

// @desc    Get all courses
// @route   GET /courses
// @access  Public
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find({}).sort({ createdAt: -1 });
    res.json(courses);
  } catch (error) {
    console.error("Error in getCourses:", error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get courses by category
// @route   GET /courses/category/:categoryId
// @access  Public
const getCoursesByCategory = async (req, res) => {
  try {
    const courses = await Course.find({ category: req.params.categoryId });
    res.json(courses);
  } catch (error) {
    console.error("Error in getCoursesByCategory:", error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single course by ID or Slug
// @route   GET /courses/:id
// @access  Public
const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    let course = null;

    if (mongoose.Types.ObjectId.isValid(id)) {
      course = await Course.findById(id);
    }

    if (!course) {
      course = await Course.findOne({ slug: id });
    }

    if (course) {
      res.json(course);
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    console.error("Error in getCourseById:", error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a course
// @route   POST /courses
// @access  Admin
const createCourse = async (req, res) => {
  try {
    const {
      title,
      category,
      badge,
      badgeColor,
      rating,
      reviews,
      duration,
      location,
      price,
      titleColor,
      overview,
      features, // Expecting JSON string or array
      curriculum, // Expecting JSON string of array of objects
      isFeatured,
    } = req.body;

    let img = '';
    if (req.file) {
      img = `http://localhost:5000/uploads/${req.file.filename}`;
    } else {
      return res.status(400).json({ message: 'Course cover image is required' });
    }

    const parsedFeatures = typeof features === 'string' ? JSON.parse(features) : (features || []);
    const parsedCurriculum = typeof curriculum === 'string' ? JSON.parse(curriculum) : (curriculum || []);

    const course = new Course({
      title,
      slug: slugify(title),
      category,
      img,
      badge,
      badgeColor: badgeColor || 'badge-orange',
      rating: Number(rating) || 4.5,
      reviews: Number(reviews) || 100,
      duration,
      location: location || 'Gurugram',
      price,
      titleColor: titleColor || 'text-blue',
      overview,
      features: parsedFeatures,
      curriculum: parsedCurriculum,
      isFeatured: isFeatured === 'true' || isFeatured === true,
    });

    const createdCourse = await course.save();
    res.status(201).json(createdCourse);
  } catch (error) {
    console.error("Error in createCourse:", error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a course
// @route   PUT /courses/:id
// @access  Admin
const updateCourse = async (req, res) => {
  try {
    const {
      title,
      category,
      badge,
      badgeColor,
      rating,
      reviews,
      duration,
      location,
      price,
      titleColor,
      overview,
      features,
      curriculum,
      isFeatured,
    } = req.body;

    const course = await Course.findById(req.params.id);

    if (course) {
      if (title) {
        course.title = title;
        course.slug = slugify(title);
      }
      course.category = category || course.category;
      course.badge = badge !== undefined ? badge : course.badge;
      course.badgeColor = badgeColor || course.badgeColor;
      course.rating = rating !== undefined ? Number(rating) : course.rating;
      course.reviews = reviews !== undefined ? Number(reviews) : course.reviews;
      course.duration = duration || course.duration;
      course.location = location || course.location;
      course.price = price || course.price;
      course.titleColor = titleColor || course.titleColor;
      course.overview = overview || course.overview;
      course.isFeatured = isFeatured !== undefined ? (isFeatured === 'true' || isFeatured === true) : course.isFeatured;

      if (features) {
        course.features = typeof features === 'string' ? JSON.parse(features) : features;
      }
      if (curriculum) {
        course.curriculum = typeof curriculum === 'string' ? JSON.parse(curriculum) : curriculum;
      }

      if (req.file) {
        course.img = `http://localhost:5000/uploads/${req.file.filename}`;
      }

      const updatedCourse = await course.save();
      res.json(updatedCourse);
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    console.error("Error in updateCourse:", error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a course
// @route   DELETE /courses/:id
// @access  Admin
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (course) {
      await course.deleteOne();
      res.json({ message: 'Course removed' });
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    console.error("Error in deleteCourse:", error);
    res.status(500).json({ message: error.message });
  }
};

// Seeder function
const seedCourses = async () => {
  try {
    const count = await Course.countDocuments();
    if (count === 0) {
      const coursesData = {
        "cnc-programming-course": [
          {
            img: '/cnc_op.png', badge: 'CNC, VMC & Manufacturing Skills', badgeColor: 'badge-orange',
            rating: 4.5, reviews: 172, title: 'CNC/ VMC Skilled Operator Course',
            duration: '45 Days', location: 'Gurugram', price: '₹24,999', titleColor: 'text-blue', isFeatured: true
          },
          {
            img: '/cnc_prog.png', badge: 'CNC, VMC & Manufacturing Skills', badgeColor: 'badge-green',
            rating: 4.5, reviews: 137, title: 'CNC/VMC Operations & Programming Professional...',
            duration: '2 months', location: 'Gurugram', price: '₹39,999', titleColor: 'text-orange', isFeatured: false
          },
          {
            img: '/cnc_adv.png', badge: 'CNC, VMC & Manufacturing Skills', badgeColor: 'badge-yellow',
            rating: 4.5, reviews: 128, title: 'Advanced CNC Programming; Siemens & Fanuc Specialization',
            duration: '15 Days', location: 'Gurugram', price: '₹15,399', titleColor: 'text-blue', isFeatured: false
          },
          {
            img: '/qc_insp.png', badge: 'CNC, VMC & Manufacturing Skills', badgeColor: 'badge-pink',
            rating: 4.5, reviews: 138, title: 'Quality Control Inspector',
            duration: '45 Days', location: 'Gurugram', price: '₹23,499', titleColor: 'text-blue', isFeatured: false
          },
          {
            img: '/qe_eng.png', badge: 'CNC, VMC & Manufacturing Skills', badgeColor: 'badge-teal',
            rating: 4.5, reviews: 235, title: 'Quality Engineer',
            duration: '2 months', location: 'Gurugram', price: '₹36,499', titleColor: 'text-orange', isFeatured: false
          },
          {
            img: '/prod_eng.png', badge: 'CNC, VMC & Manufacturing Skills', badgeColor: 'badge-orange',
            rating: 4.5, reviews: 143, title: 'Production Engineer',
            duration: '2 months', location: 'Gurugram', price: '₹36,499', titleColor: 'text-blue', isFeatured: false
          }
        ],
        "cad-cam-course": [
          {
            img: '/cad_autocad.png', badge: 'CAD-CAM Designing', badgeColor: 'badge-orange',
            rating: 4.5, reviews: 172, title: 'AutoCAD : 2D & 3D - Professional Design Course',
            duration: '10 Days', location: 'Gurugram', price: '₹13,499', titleColor: 'text-blue', isFeatured: false
          },
          {
            img: '/design.png', badge: 'CAD-CAM Designing', badgeColor: 'badge-green',
            rating: 4.5, reviews: 137, title: 'Design & Development Engineer',
            duration: '2 months', location: 'Gurugram', price: '₹36,499', titleColor: 'text-orange', isFeatured: true
          },
          {
            img: '/course_cad.png', badge: 'CAD-CAM Designing', badgeColor: 'badge-yellow',
            rating: 4.5, reviews: 128, title: '3D Printing with Solid works',
            duration: '15 Days', location: 'Gurugram', price: '₹16,499', titleColor: 'text-blue', isFeatured: false
          },
          {
            img: '/cnc_prog.png', badge: 'CAD-CAM Designing', badgeColor: 'badge-pink',
            rating: 4.5, reviews: 138, title: 'NX CAD/CAM - Advanced Manufacturing Design Program',
            duration: '10 Days', location: 'Gurugram', price: '₹15,499', titleColor: 'text-blue', isFeatured: false
          },
          {
            img: '/course_cnc.png', badge: 'CAD-CAM Designing', badgeColor: 'badge-teal',
            rating: 4.5, reviews: 235, title: 'DELL CAM (Powermill/ Feature CAM)',
            duration: '10 Days', location: 'Gurugram', price: '₹15,499', titleColor: 'text-orange', isFeatured: false
          }
        ],
        "electric-vehicle-course": [
          {
            img: '/course_ev.png', badge: 'Electric Vehicle', badgeColor: 'badge-orange',
            rating: 4.5, reviews: 172, title: 'Electric Vehicle Engineering & e-Mobility Technology',
            duration: '2 months', location: 'Gurugram', price: '₹39,499', titleColor: 'text-blue', isFeatured: false
          },
          {
            img: '/3wheeler.png', badge: 'Electric Vehicle', badgeColor: 'badge-green',
            rating: 4.5, reviews: 137, title: '2/3 Wheeler Repair & Maintenance',
            duration: '20 Days', location: 'Gurugram', price: '₹19,999', titleColor: 'text-blue', isFeatured: true
          },
          {
            img: '/4wheeler.png', badge: 'Electric Vehicle', badgeColor: 'badge-yellow',
            rating: 4.5, reviews: 128, title: '4 Wheeler Repair, Maintenance & Diagnostic',
            duration: '20 Days', location: 'Gurugram', price: '₹23,999', titleColor: 'text-blue', isFeatured: false
          }
        ],
        "electronics-robotics-course": [
          {
            img: '/course_electronics.png', badge: 'Electronics Systems Design and Robotronics', badgeColor: 'badge-orange',
            rating: 4.5, reviews: 143, title: 'Fundamentals of Robotronics',
            duration: '1 month', location: 'Gurugram', price: '₹24,999', titleColor: 'text-blue', isFeatured: true
          }
        ],
        "plc-scada-course": [
          {
            img: '/course_plc.png', badge: 'PLC Automation', badgeColor: 'badge-orange',
            rating: 4.5, reviews: 137, title: 'Industry 4.0 : Basic to Advance',
            duration: '2 months', location: 'Gurugram', price: '₹36,499', titleColor: 'text-blue', isFeatured: true
          },
          {
            img: '/cnc_op.png', badge: 'PLC Automation', badgeColor: 'badge-green',
            rating: 4.5, reviews: 128, title: 'Maintenance Engineer (Robotics & Industrial Automation)',
            duration: '3 months', location: 'Gurugram', price: '₹41,999', titleColor: 'text-orange', isFeatured: false
          }
        ],
        "digital-marketing-course": [
          {
            img: '/course_digital.png', badge: 'Digital Marketing with AI', badgeColor: 'badge-orange',
            rating: 4.5, reviews: 138, title: 'Digital Marketing with AI Tools',
            duration: '1 months', location: 'Gurugram', price: '₹33,499', titleColor: 'text-blue', isFeatured: false
          },
          {
            img: '/AIandML.png', badge: 'Digital Marketing with AI', badgeColor: 'badge-green',
            rating: 4.5, reviews: 235, title: 'Artificial Intelligence & Machine Learning AI-ML',
            duration: '2 months', location: 'Gurugram', price: '₹36,499', titleColor: 'text-orange', isFeatured: true
          }
        ]
      };

      const seedData = [];

      Object.keys(coursesData).forEach(catKey => {
        coursesData[catKey].forEach(item => {
          const courseSlug = slugify(item.title);
          seedData.push({
            ...item,
            slug: courseSlug,
            category: catKey,
            overview: "SkillServe Academy's comprehensive training program designed to deliver industry-relevant skills with hands-on practice, expert mentorship, and 100% placement support.",
            features: [
              "100% Placement Assistance",
              "Industry Expert Trainers",
              "Hands-on Practical Lab Sessions",
              "NSQF & NCrF Aligned Certification",
              "Live Projects & Case Studies",
              "Doubt Clearing Sessions"
            ],
            curriculum: [
              { title: "Module 1: Introduction & Fundamentals", desc: "Understand the core concepts, industry safety protocols, and basic theoretical operations." },
              { title: "Module 2: Core Technical Training", desc: "Dive deep into technical programming, software tools, machinery setup, and daily operations." },
              { title: "Module 3: Quality & Troubleshooting", desc: "Learn how to identify errors, maintain quality standards, and ensure operational efficiency." },
              { title: "Module 4: Live Industry Project", desc: "Apply your newly acquired skills on a real-world project mimicking current industry demands." }
            ]
          });
        });
      });

      await Course.insertMany(seedData);
      console.log('Courses seeded successfully.');
    } else {
      const allCoursesList = await Course.find({});
      let updatedCount = 0;
      for (const c of allCoursesList) {
        const expectedSlug = slugify(c.title);
        if (c.slug !== expectedSlug) {
          c.slug = expectedSlug;
          await c.save();
          updatedCount++;
        }
      }
      if (updatedCount > 0) {
        console.log(`Updated ${updatedCount} existing courses with title-based slugs.`);
      }
    }
  } catch (error) {
    console.error('Error seeding courses:', error);
  }
};

module.exports = {
  getCourses,
  getCoursesByCategory,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  seedCourses,
  upload,
};
