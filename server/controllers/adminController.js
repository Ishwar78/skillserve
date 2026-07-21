const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Auth admin & get token
// @route   POST /api/admin/login
// @access  Public
const authAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (admin && (await admin.matchPassword(password))) {
      res.json({
        _id: admin._id,
        email: admin.email,
        token: generateToken(admin._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Seed initial admin user
// @route   None (Called on startup)
const seedAdmin = async () => {
  try {
    const adminExists = await Admin.findOne({ email: 'info@skillserveacademy.com' });
    if (!adminExists) {
      const admin = await Admin.create({
        email: 'info@skillserveacademy.com',
        password: 'Skill@2026#$',
      });
      console.log('Admin user seeded:', admin.email);
    } else {
      console.log('Admin user already exists.');
    }
  } catch (error) {
    console.error('Error seeding admin:', error);
  }
};

module.exports = { authAdmin, seedAdmin };
