const Blog = require('../models/Blog');
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

// Default initial blogs for seeder
const initialBlogs = [
  {
    title: "Complete Beginner's Guide to CNC Operations & Programming Courses in Gurugram",
    author: "SkillServe Academy",
    comments: 24,
    readTime: "7 min read",
    category: "CNC Manufacturing",
    image: "/course_cnc.png",
    metaKeywords: "cnc operations, cnc programming, cnc course, vmc course gurugram, cnc machine class",
    metaDescription: "Read the complete beginner guide to CNC / VMC Operations and Programming training courses in Gurugram. Start your career in precision manufacturing.",
    content: `
      <p>India's manufacturing sector is growing rapidly. Gurugram, Delhi NCR, Pune, and Chennai are becoming major hubs for precision engineering. But here's the truth – companies are struggling to find trained CNC professionals. According to the Government of India's Make in India initiative, skill-based technical roles are critical for industrial growth. Yet less than 30% of ITI and diploma graduates get formal CNC training before joining the industry. That gap = your career opportunity.</p>

      <h3>If you are:</h3>
      <ul>
        <li>An ITI student (Machinist / Turner / Fitter / Electrician)</li>
        <li>A diploma holder (Mechanical / Production Engineering)</li>
        <li>A B.Tech student looking for practical skills</li>
        <li>A job seeker wanting to enter manufacturing</li>
      </ul>
      <p>Then the CNC Operations & Programming Course at SkillServe Academy, Gurugram is your direct entry into India's manufacturing revolution.</p>

      <ul class="blog-checklist">
        <li>✅ No prior CNC experience required</li>
        <li>✅ Hands-on training on real CNC machines (Lathe, VMC)</li>
        <li>✅ Placement assistance in Gurugram, Manesar, Delhi NCR</li>
      </ul>

      <h2>What is CNC Operations & Programming — and Why It Matters for Your Career</h2>
      <p>CNC stands for Computer Numerical Control. In other words, it means machines are controlled by computers to cut, shape, and create parts with high accuracy. A CNC machine course teaches how the machines operate. Instead of manual work, everything is done using programmed instructions. These instructions are written using codes like G-code and M-code. A CNC programming course teaches you how to write these instructions so that machines can perform tasks automatically. This is very important in industries like automobile manufacturing, aerospace parts production, and medical equipment manufacturing.</p>
      
      <p>Without CNC programming, it is very difficult to maintain speed and accuracy in production. That is why skilled professionals with knowledge of CNC are always in demand. Today, companies are not just looking for machine operators. They want people who understand both operation and programming. This makes CNC skills a strong career choice.</p>

      <!-- MID IMAGE -->
      <img src="/course_plc.png" alt="CNC Machine Programming" class="blog-mid-img" />

      <h2>CNC Programming Course Syllabus — Module by Module</h2>
      <p>When you join classes for CNC programming, the course is usually divided into different modules. Each module helps you build your skills step by step.</p>

      <h4>1. Basics of CNC Machines</h4>
      <ul>
        <li>Introduction to CNC technology</li>
        <li>Types of CNC machines (Lathe, Milling, VMC)</li>
        <li>Machine parts and functions</li>
      </ul>

      <h4>2. G-Code & M-Code Programming</h4>
      <ul>
        <li>Understanding basic codes</li>
        <li>Writing simple programs</li>
        <li>Running programs on machines</li>
      </ul>

      <h4>3. Machine Setup & Operation</h4>
      <ul>
        <li>Tool setting & Workpiece alignment</li>
        <li>Safety practices</li>
      </ul>

      <h4>4. CAD/CAM Integration</h4>
      <ul>
        <li>Basic design concepts</li>
        <li>Converting designs into machine programs</li>
      </ul>

      <h4>5. Quality Inspection</h4>
      <ul>
        <li>Measuring tools & Checking finished products</li>
        <li>Maintaining accuracy</li>
      </ul>
      <p>A well-structured CNC programming course ensures that you not only learn theory but also get practical training. This is very important because CNC is a skill-based field.</p>

      <h2>CNC Operator vs CNC Machinist — Which Course Is Right for You?</h2>
      <p>Many people get confused between a CNC operator course and CNC machinist training. Let's understand the difference in a simple way.</p>

      <p><strong>CNC Operator:</strong> Entry-level role, focus on running machines, basic understanding of programs, short-term course. Best for beginners who want to start working quickly.</p>

      <p><strong>CNC Machinist:</strong> Advanced role, involves programming + operation, requires deeper technical knowledge, better salary opportunities. Suitable if you want long-term growth and higher positions in the industry.</p>

      <p>If you are just starting, you can begin with the operation and then move to programming later. This step-by-step approach makes learning easier and more practical.</p>

      <h2>How to Choose the Best CNC Training Centre in Gurugram</h2>
      <p>Choosing the right CNC training institute or CNC training centre is very important for your career. Not all institutes provide the same quality of training. Here are some simple points to check:</p>
      <ul>
        <li><strong>Practical Training</strong> – Make sure the institute has real CNC machines for practice.</li>
        <li><strong>Batch Size</strong> – Smaller batches mean more personal attention.</li>
        <li><strong>Trainers' Experience</strong> – Experienced trainers guide you better.</li>
        <li><strong>Placement Support</strong> – A good institute helps with job opportunities.</li>
        <li><strong>Certification</strong> – Check if the certification is valid and recognized.</li>
      </ul>

      <h2>Why Choose SkillServe for Your CNC Training</h2>
      <p>At SkillServe, the learning process is straightforward and aims at helping students develop essential basics. This learning program enables you to begin your training from basic operations and proceed to more complex programming. Below are some factors that differentiate SkillServe:</p>
      <ul>
        <li>Emphasis on practical training rather than theoretical knowledge.</li>
        <li>The learning process starts with operations and progresses towards programming.</li>
        <li>Course curriculum design reflects industry needs.</li>
        <li>Coaching that makes you industry-ready.</li>
      </ul>

      <blockquote class="blog-testimonial">
        <p>"I completed ITI (Machinist) but had no job. After 2 months of CNC programming course at SkillServe Academy, I got placed as a CNC Programmer at JBM Group. Now I earn ₹28,000 per month."</p>
        <cite>— Vikram Singh, Batch Dec 2025</cite>
      </blockquote>

      <h2>Your CNC Career Starts Today</h2>
      <p>Don't wait to turn your interest into a high-demand profession. Join SkillServe Academy and learn CNC the right way — with hands-on training, expert mentors, and real industry exposure.</p>

      <div class="blog-cta">
        <a href="/courses/cnc-programming-course" class="btn-blog-cta">Start Your CNC Journey →</a>
      </div>

      <hr />
      <h2>Frequently Asked Questions (FAQs)</h2>
      <p><strong>1. What are the fees for CNC programming courses in Delhi NCR?</strong><br/>
      The fee generally varies from basic to moderate levels depending on the institute, course duration, and depth of training.</p>
      <p><strong>2. What is the time period of CNC machinist training courses?</strong><br/>
      It usually depends on the type of training and generally takes around 2 to 3 months to complete.</p>
      <p><strong>3. Can I attend CNC courses after ITI?</strong><br/>
      Yes, after completing ITI, you can enroll in a CNC training course without any hassle.</p>
      <p><strong>4. Is there any difference between VMC programming and CNC programming?</strong><br/>
      VMC programming is a part of CNC programming. It focuses on specific machine types but follows similar coding principles.</p>
    `
  },
  {
    title: "AutoCAD vs SolidWorks vs NX: Which CAD Software Should You Learn First?",
    author: "SkillServe Academy",
    comments: 18,
    readTime: "9 min read",
    category: "CAD CAM Design",
    image: "/course_cad.png",
    metaKeywords: "autocad vs solidworks, autocad vs nx, learn cad cam, cad software training, design mechanical engineer",
    metaDescription: "AutoCAD vs SolidWorks vs Siemens NX. Check out the comparison and learn which mechanical CAD design software you should learn first at SkillServe Gurugram.",
    content: `
      <p>Almost all mechanical engineering student faces the same question: Which CAD software should I learn first? Some job postings ask for AutoCAD. Others want SolidWorks. Many advanced manufacturing roles require NX (Siemens). According to Economic Times data, Indian engineering exports reached a record US$122.43 billion in FY 2025-26. Manufacturing and design sectors are growing fast. But here's the problem – most engineering graduates know only theory, not practical design software. That gap = your career opportunity.</p>

      <h3>If you are:</h3>
      <ul>
        <li>A mechanical engineering student (B. Tech / Diploma)</li>
        <li>An ITI graduate (Machinist, Turner, Fitter, Draftsman)</li>
        <li>A fresh engineer looking for design or manufacturing jobs</li>
        <li>A working professional wanting to upgrade skills</li>
      </ul>
      <p>Then learning CAD-CAM at SkillServe Academy, Gurugram is your direct entry into India's design and manufacturing industry.</p>

      <ul class="blog-checklist">
        <li>✅ No prior software knowledge required</li>
        <li>✅ Hands-on training on AutoCAD, SolidWorks & NX</li>
        <li>✅ Placement assistance in Gurugram, Manesar, Delhi NCR</li>
      </ul>

      <h2>AutoCAD — The Universal Drafting Standard</h2>
      <p>For many students entering the design field, AutoCAD is often the first software they hear about, and there is a good reason for that. AutoCAD has been widely used for technical drawing, engineering layouts, and manufacturing drawings for many years. It helps learners understand the basics of drafting, dimensions, technical drawings, and design standards. AutoCAD proves relatively easy for beginners since it establishes strong basics before diving into complex modeling techniques.</p>
      <p>AutoCAD is widely applied in jobs such as Designing/Drafting, Production Drafting, Machine Part Drafting, and Basic Design Support. Students who search for AutoCAD online training can consider this the primary step for entry into the design industry.</p>

      <!-- MID IMAGE -->
      <img src="/content.jpg" alt="CAD Design Interface" class="blog-mid-img" />

      <h2>SolidWorks — The 3D Design and Simulation Powerhouse</h2>
      <p>Once the fundamentals of designing become clear, most students tend to head towards SolidWorks. SolidWorks is commonly used for 3D modeling, product designing, assembly designing, and design development. It enables the student to go beyond drawings and understand how products are designed and assembled.</p>
      <p>For those mechanical engineering graduates who are inclined towards designing or developing products, SolidWorks becomes a crucial requirement. It can be helpful in professions such as Product designing, Assembly designing, Design development, and Prototype designing.</p>

      <h2>NX — The Advanced Manufacturing and CAD-CAM Powerhouse</h2>
      <p>For students who wish to move beyond design and step into advanced manufacturing, NX becomes an important software to learn. NX combines designing and manufacturing in one platform. It is widely used in industries such as automotive, aerospace, precision engineering, and advanced manufacturing. The software is known for Complex surface modeling, Toolpath generation, Manufacturing design, CNC machining applications, and Product engineering.</p>

      <h2>CAD-CAM Integration — Why Mechanical Engineers Need Both</h2>
      <p>Learning design software is important, but understanding how design connects with manufacturing makes the learning much more valuable. This is where a CAD/CAM course becomes important.</p>
      <ul>
        <li><strong>CAD (Computer-Aided Design)</strong> helps in creating designs, drawings, and models.</li>
        <li><strong>CAM (Computer-Aided Manufacturing)</strong> helps convert those designs into manufacturing instructions that machines can understand.</li>
      </ul>
      <p>When both skills come together, learners understand how a design moves from a computer screen to an actual manufactured product.</p>

      <h2>Quick Comparison: AutoCAD vs SolidWorks vs NX</h2>
      <table class="blog-table">
        <thead>
          <tr>
            <th>Software</th>
            <th>Best For</th>
            <th>Level</th>
            <th>Industry Use</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>AutoCAD</td>
            <td>Drafting & Drawings</td>
            <td>Beginner</td>
            <td>Production & Design</td>
          </tr>
          <tr>
            <td>SolidWorks</td>
            <td>Product Design</td>
            <td>Intermediate</td>
            <td>Product Development</td>
          </tr>
          <tr>
            <td>NX</td>
            <td>Manufacturing Design</td>
            <td>Advanced</td>
            <td>CAD-CAM & CNC</td>
          </tr>
        </tbody>
      </table>

      <h2>Why Learn CAD-CAM at SkillServe Academy</h2>
      <ul>
        <li><strong>Practical learning</strong> – Industry-focused projects, not just theory</li>
        <li><strong>Train on all three</strong> – AutoCAD, SolidWorks, and NX under one roof</li>
        <li><strong>Flexible durations</strong> – 10 days to 2 months</li>
        <li><strong>Placement support</strong> – MoUs with top manufacturing companies in Gurugram</li>
      </ul>

      <blockquote class="blog-testimonial">
        <p>"In my 7 years in the industry, I've interviewed hundreds of mechanical graduates. Most know theory but can't even open a 3D model or generate a toolpath. Master AutoCAD, SolidWorks, or NX the right way, and you will never have to ask for a job – companies will chase you. Your CAD-CAM skills are the engine."</p>
        <cite>— Ravi Shankar, Senior CAD-CAM Trainer</cite>
      </blockquote>

      <div class="blog-cta">
        <a href="/courses/cad-cam-course" class="btn-blog-cta">Explore CAD-CAM Courses →</a>
      </div>

      <hr />
      <h2>Frequently Asked Questions (FAQs)</h2>
      <p><strong>1. Which is better — AutoCAD, SolidWorks, or NX for a mechanical engineering fresher?</strong><br/>
      For beginners, AutoCAD is often the first choice since it builds a strong foundation. Later, you can move towards SolidWorks or NX.</p>
      <p><strong>2. What is the fee for an AutoCAD course at SkillServe Academy?</strong><br/>
      CAD-related courses range from ₹13,000 to ₹38,000, depending on the program.</p>
    `
  },
  {
    title: "Electric Vehicle Maintenance Technician Course: Curriculum, Skills & Career Scope",
    author: "SkillServe Academy",
    comments: 32,
    readTime: "8 min read",
    category: "Electric Vehicle",
    image: "/main.jpg",
    metaKeywords: "ev course, electric vehicle tech, ev repair classes, lithium battery certification, ev syllabus",
    metaDescription: "Enroll in the Electric Vehicle Maintenance Technician Course in Gurugram. Learn EV battery repair, motor diagnostic, controller assembly, and placement scope.",
    content: `
      <h2>🚀 India needs 1 million EV technicians by 2027 – will you be ready?</h2>
      <p>According to VAHAN Portal Data, India witnessed a registration of more than 23 lakh electric vehicles in 2025. That's massive growth. But here's the problem – less than 5% of India's mechanics today can safely repair an EV battery or motor. That gap = your career opportunity.</p>

      <h3>If you are:</h3>
      <ul>
        <li>An ITI student (Electrician / Motor Mechanic)</li>
        <li>A diploma holder (Mechanical / Electrical)</li>
        <li>A working mechanic wanting to upgrade</li>
        <li>A 12th pass looking for a technical career</li>
      </ul>
      <p>Then the Electric Vehicle Maintenance Technician Course at SkillServe Academy is your direct entry into India's EV revolution.</p>

      <ul class="blog-checklist">
        <li>✅ No engineering degree required</li>
        <li>✅ Hands-on practical training on real EVs</li>
        <li>✅ Placement assistance in Gurugram, Delhi & Noida</li>
      </ul>

      <h2>Why the EV Industry in India Is Creating Jobs Right Now</h2>
      <p>Electric mobility is opening up new possibilities in the realms of automobiles and technology. With an increase in electrically powered two-wheelers, three-wheelers, and four-wheelers being used as vehicles, there is now a greater need for skilled technical personnel. Electric vehicles work differently from conventional vehicles. They involve battery systems, motors, controllers, wiring systems, charging components, and electronic diagnostics. Because of this, companies need people who understand both electrical systems and vehicle maintenance.</p>

      <!-- MID IMAGE -->
      <img src="/course_electronics.png" alt="EV Battery Maintenance" class="blog-mid-img" />

      <h2>What Does an Electric Vehicle Maintenance Technician Course Actually Cover?</h2>
      <p>A well-designed electric vehicle maintenance technician course focuses on practical learning, technical understanding, and step-by-step skill development. At SkillServe Academy, we follow a 70% practical – 30% theory model. You don't just learn – you actually fix vehicles.</p>

      <h4>🔋 EV Fundamentals (Classroom + Workshop)</h4>
      <ul>
        <li>Types of electric vehicles (2W, 3W, 4W)</li>
        <li>EV vs ICE – key differences</li>
        <li>High-voltage safety & ISO standards</li>
      </ul>

      <h4>⚡ Battery Technology (The Heart of EV)</h4>
      <ul>
        <li>Lithium-ion battery architecture</li>
        <li>Battery Management System (BMS) – how it works</li>
        <li>Cell balancing, thermal management & safety</li>
      </ul>

      <h4>🔧 Motors & Controllers</h4>
      <ul>
        <li>BLDC & PMSM motor working principles</li>
        <li>Motor controller programming basics</li>
        <li>Regenerative braking systems</li>
      </ul>

      <h4>🛠️ Diagnostics & Repair (Most Valued Skill)</h4>
      <ul>
        <li>OBD scanners & EV-specific diagnostic tools</li>
        <li>Reading & clearing fault codes</li>
        <li>Motor winding, controller repair & contactor testing</li>
      </ul>

      <h2>Jobs and Career Scope after Completing an EV Training Course</h2>
      <p>After completing an EV training course, learners can explore different technical roles in the electric vehicle sector:</p>
      <ul>
        <li><strong>EV Service Technician:</strong> ₹18,000 – ₹25,000</li>
        <li><strong>Battery Pack Technician:</strong> ₹22,000 – ₹30,000</li>
        <li><strong>EV Diagnostic Expert:</strong> ₹25,000 – ₹40,000</li>
        <li><strong>Charging Station Technician:</strong> ₹20,000 – ₹28,000</li>
      </ul>
      <p>Top recruiters in Delhi NCR include Ola Electric, Ather Energy, Tata Motors, Mahindra Electric, BatterySmart, and Sun Mobility.</p>

      <h2>Why Choose SkillServe for Your EV Training</h2>
      <p>Choosing the right training institute can make a real difference in technical learning. At SkillServe, the learning process is designed in a structured way so that students can understand concepts clearly and build strong technical fundamentals. Our focus remains on:</p>
      <ul>
        <li>Practical learning & Step-by-step skill development</li>
        <li>Technical understanding & government-recognized certification</li>
        <li>Industry-relevant training & placement MoUs</li>
      </ul>

      <blockquote class="blog-testimonial">
        <p>"I was an ITI Electrician with no job. After 2 months at SkillServe Academy, I got placed as a Battery Technician at Ather Energy. Now I earn ₹32,000 per month."</p>
        <cite>— Priyanka Verma, Batch Jan 2026</cite>
      </blockquote>

      <div class="blog-cta">
        <a href="/courses/electric-vehicle-course" class="btn-blog-cta">Enroll in the EV Course Today →</a>
      </div>

      <hr />
      <h2>Frequently Asked Questions (FAQs)</h2>
      <p><strong>1. What is the fee for an electric vehicle course in Delhi?</strong><br/>
      The fee for EV courses at SkillServe ranges from ₹20,000 to ₹40,000.</p>
      <p><strong>2. Is an EV course good for ITI and diploma holders?</strong><br/>
      Yes, EV courses can be a great learning option for ITI and diploma holders wanting to build technical skills in electric mobility.</p>
      <p><strong>3. How long does an EV technology course take?</strong><br/>
      It usually takes around 20 days to 2 months.</p>
    `
  }
];

// @desc    Get all blogs
// @route   GET /blogs
// @access  Public
const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single blog by ID or Slug
// @route   GET /blogs/:id
// @access  Public
const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    let blog = null;

    if (mongoose.Types.ObjectId.isValid(id)) {
      blog = await Blog.findById(id);
    }

    if (!blog) {
      blog = await Blog.findOne({ slug: id });
    }

    if (blog) {
      res.json(blog);
    } else {
      res.status(404).json({ message: 'Blog not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a blog
// @route   POST /blogs
// @access  Admin
const createBlog = async (req, res) => {
  try {
    const { title, category, content, metaKeywords, metaDescription, readTime, author, faqs } = req.body;
    let image = '/course_cnc.png'; // Default if none uploaded

    if (req.file) {
      image = `https://skillserve-nm1n.onrender.com/uploads/${req.file.filename}`;
    }

    let parsedFaqs = [];
    if (faqs) {
      try {
        parsedFaqs = typeof faqs === 'string' ? JSON.parse(faqs) : faqs;
      } catch (e) {
        parsedFaqs = [];
      }
    }

    const blog = new Blog({
      title,
      slug: slugify(title),
      category,
      content,
      metaKeywords,
      metaDescription,
      readTime: readTime || '5 min read',
      author: author || 'SkillServe Academy',
      image,
      faqs: parsedFaqs,
    });

    const createdBlog = await blog.save();
    res.status(201).json(createdBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a blog
// @route   PUT /blogs/:id
// @access  Admin
const updateBlog = async (req, res) => {
  try {
    const { title, category, content, metaKeywords, metaDescription, readTime, author, faqs } = req.body;
    const blog = await Blog.findById(req.params.id);

    if (blog) {
      if (title) {
        blog.title = title;
        blog.slug = slugify(title);
      }
      blog.category = category || blog.category;
      blog.content = content || blog.content;
      blog.metaKeywords = metaKeywords !== undefined ? metaKeywords : blog.metaKeywords;
      blog.metaDescription = metaDescription !== undefined ? metaDescription : blog.metaDescription;
      blog.readTime = readTime || blog.readTime;
      blog.author = author || blog.author;

      if (faqs !== undefined) {
        try {
          blog.faqs = typeof faqs === 'string' ? JSON.parse(faqs) : faqs;
        } catch (e) {
          blog.faqs = blog.faqs || [];
        }
      }

      if (req.file) {
        blog.image = `https://skillserve-nm1n.onrender.com/uploads/${req.file.filename}`;
      }

      const updatedBlog = await blog.save();
      res.json(updatedBlog);
    } else {
      res.status(404).json({ message: 'Blog not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a blog
// @route   DELETE /blogs/:id
// @access  Admin
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog) {
      await blog.deleteOne();
      res.json({ message: 'Blog removed' });
    } else {
      res.status(404).json({ message: 'Blog not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Seeder function
const seedBlogs = async () => {
  try {
    const count = await Blog.countDocuments();
    if (count === 0) {
      const seededBlogs = initialBlogs.map(b => ({
        ...b,
        slug: slugify(b.title)
      }));
      await Blog.insertMany(seededBlogs);
      console.log('Blogs seeded successfully.');
    } else {
      const allBlogsList = await Blog.find({});
      let updatedCount = 0;
      for (const b of allBlogsList) {
        const expectedSlug = slugify(b.title);
        if (b.slug !== expectedSlug) {
          b.slug = expectedSlug;
          await b.save();
          updatedCount++;
        }
      }
      if (updatedCount > 0) {
        console.log(`Updated ${updatedCount} existing blogs with title-based slugs.`);
      }
    }
  } catch (error) {
    console.error('Failed to seed/update blogs:', error);
  }
};

module.exports = {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  seedBlogs,
};
