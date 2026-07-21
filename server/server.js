const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const { seedAdmin } = require('./controllers/adminController');
const { seedCategories } = require('./controllers/categoryController');
const { seedContactInfo } = require('./controllers/contactController');
const { seedCourses } = require('./controllers/courseController');
const { seedBlogs } = require('./controllers/blogController');
const { seedAboutInfo } = require('./controllers/aboutController');
const { seedHeroInfo } = require('./controllers/heroController');
const adminRoutes = require('./routes/adminRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const contactRoutes = require('./routes/contactRoutes');
const courseRoutes = require('./routes/courseRoutes');
const inquiryRoutes = require('./routes/inquiryRoutes');
const blogRoutes = require('./routes/blogRoutes');
const aboutRoutes = require('./routes/aboutRoutes');
const heroRoutes = require('./routes/heroRoutes');

dotenv.config();

connectDB().then(() => {
  // Seed admin user, categories, contact info, courses, blogs, and about info after DB connects
  seedAdmin();
  seedCategories();
  seedContactInfo();
  seedCourses();
  seedBlogs();
  seedAboutInfo();
  seedHeroInfo();
});

const app = express();

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/admin', adminRoutes);
app.use('/reviews', reviewRoutes);
app.use('/categories', categoryRoutes);
app.use('/contact-info', contactRoutes);
app.use('/courses', courseRoutes);
app.use('/inquiries', inquiryRoutes);
app.use('/blogs', blogRoutes);
app.use('/about-info', aboutRoutes);
app.use('/hero-info', heroRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
