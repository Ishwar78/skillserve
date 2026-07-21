const ContactInfo = require('../models/ContactInfo');

// @desc    Get contact info
// @route   GET /contact-info
// @access  Public
const getContactInfo = async (req, res) => {
  try {
    let contactInfo = await ContactInfo.findOne();
    if (!contactInfo) {
      // If none exists, seed default one
      await seedContactInfo();
      contactInfo = await ContactInfo.findOne();
    }
    res.json(contactInfo);
  } catch (error) {
    console.error("Error in getContactInfo:", error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update contact info
// @route   PUT /contact-info
// @access  Admin
const updateContactInfo = async (req, res) => {
  try {
    const { address, phone, email, hours } = req.body;
    let contactInfo = await ContactInfo.findOne();

    if (contactInfo) {
      contactInfo.address = address || contactInfo.address;
      contactInfo.phone = phone || contactInfo.phone;
      contactInfo.email = email || contactInfo.email;
      contactInfo.hours = hours || contactInfo.hours;

      const updatedContactInfo = await contactInfo.save();
      res.json(updatedContactInfo);
    } else {
      // Create new one if somehow none exists
      contactInfo = new ContactInfo({ address, phone, email, hours });
      const createdContactInfo = await contactInfo.save();
      res.json(createdContactInfo);
    }
  } catch (error) {
    console.error("Error in updateContactInfo:", error);
    res.status(500).json({ message: error.message });
  }
};

// Seeder function
const seedContactInfo = async () => {
  try {
    const count = await ContactInfo.countDocuments();
    if (count === 0) {
      await ContactInfo.create({
        address: "Plot No, 98-C, Udhyog Vihar Phase VII, Sector 35, Gurugram, Haryana 122004",
        phone: "9484794843",
        email: "info@skillserve.in",
        hours: "Monday - Saturday: 9:00 AM - 6:00 PM",
      });
      console.log('Default contact info seeded successfully.');
    } else {
      console.log('Contact info already exists in database.');
    }
  } catch (error) {
    console.error('Error seeding contact info:', error);
  }
};

module.exports = {
  getContactInfo,
  updateContactInfo,
  seedContactInfo,
};
