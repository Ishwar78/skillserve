const AboutInfo = require('../models/AboutInfo');

// Default about us content
const defaultAboutContent = {
  heroTitle: "Building Skills That Create Real Career Opportunities",
  heroDescription: "Practical, industry-integrated technical training designed to prepare learners for modern manufacturing, automation, technology and digital careers.",
  introTitle: "Good Qualifications, Better Skills And Stronger Careers",
  introLeadText: "SkillServe Academy is one of India's leading technical skill academies, focused on practical and job-ready training that extends beyond traditional theoretical education.",
  introContent: `
    <p>Our core objective is to equip learners with real-world skills that match current industry requirements. We combine classroom education, digital learning tools and hands-on training in industry-simulated environments.</p>
    <p>Our training methodology is designed around Industry 4.0, LEAN practices, Quality Management Systems and modern industrial standards, helping students understand how professional workplaces operate.</p>
    <p>Our programmes are aligned with the National Credit Framework, supporting recognised learning, academic progression and long-term career development.</p>
  `,
  missionTitle: "Empowering Youth Through Practical Skills",
  missionDescription: "To empower the youth of India with highly practical, job-oriented technical skills and bridge the gap between theoretical education and real industrial requirements through advanced training and expert mentorship.",
  visionTitle: "Creating An Industry-Ready Learning Ecosystem",
  visionDescription: "To become India's most trusted skill development academy by creating an ecosystem where industry and education work together, enabling every learner to succeed in global manufacturing and technology careers."
};

// @desc    Get About Us content
// @route   GET /about-info
// @access  Public
const getAboutInfo = async (req, res) => {
  try {
    let about = await AboutInfo.findOne({});
    if (!about) {
      // Seed default and return it
      about = await AboutInfo.create(defaultAboutContent);
    }
    res.json(about);
  } catch (error) {
    console.error("Error in getAboutInfo:", error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update About Us content
// @route   PUT /about-info
// @access  Admin
const updateAboutInfo = async (req, res) => {
  try {
    const {
      heroTitle,
      heroDescription,
      introTitle,
      introLeadText,
      introContent,
      missionTitle,
      missionDescription,
      visionTitle,
      visionDescription
    } = req.body;

    let about = await AboutInfo.findOne({});
    if (about) {
      about.heroTitle = heroTitle || about.heroTitle;
      about.heroDescription = heroDescription || about.heroDescription;
      about.introTitle = introTitle || about.introTitle;
      about.introLeadText = introLeadText || about.introLeadText;
      about.introContent = introContent || about.introContent;
      about.missionTitle = missionTitle || about.missionTitle;
      about.missionDescription = missionDescription || about.missionDescription;
      about.visionTitle = visionTitle || about.visionTitle;
      about.visionDescription = visionDescription || about.visionDescription;

      const updatedAbout = await about.save();
      res.json(updatedAbout);
    } else {
      // Create new if somehow not present
      const newAbout = await AboutInfo.create(req.body);
      res.status(201).json(newAbout);
    }
  } catch (error) {
    console.error("Error in updateAboutInfo:", error);
    res.status(500).json({ message: error.message });
  }
};

// Seeder function
const seedAboutInfo = async () => {
  try {
    const count = await AboutInfo.countDocuments();
    if (count === 0) {
      await AboutInfo.create(defaultAboutContent);
      console.log('About Info seeded successfully.');
    }
  } catch (error) {
    console.error('Failed to seed About Info:', error);
  }
};

module.exports = {
  getAboutInfo,
  updateAboutInfo,
  seedAboutInfo
};
