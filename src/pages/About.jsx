import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Eye, Monitor, Save, Tablet, Server, Cpu, Cloud } from 'lucide-react';
import './About.css';

const About = () => {
  const programmes = [
    { id: 1, title: "CNC-VMC & Manufacturing", icon: <Monitor size={32} />, color: "color-green", link: "/courses/cnc-programming-course" },
    { id: 2, title: "PLC Automation", icon: <Save size={32} />, color: "color-blue", link: "/courses/plc-scada-course" },
    { id: 3, title: "CAD-CAM Designing", icon: <Tablet size={32} />, color: "color-yellow", link: "/courses/cad-cam-course" },
    { id: 4, title: "Electric Vehicle", icon: <Server size={32} />, color: "color-pink", link: "/courses/electric-vehicle-course" },
    { id: 5, title: "Digital Marketing & AI", icon: <Cpu size={32} />, color: "color-orange", link: "/courses/digital-marketing-course" },
    { id: 6, title: "Electronics & Robotics", icon: <Cloud size={32} />, color: "color-orange-dark", link: "/courses/electronics-robotics-course" }
  ];

  return (
    <div className="about-page-container">
      {/* Hero Section */}
      <div className="about-hero">
        <div className="container">
          <h1 className="about-hero-title">About SkillServe Academy — NSQF Courses & Placement in Gurugram</h1>
          <div className="about-breadcrumb">
            <Link to="/">Home</Link> / <span>About</span>
          </div>
        </div>
      </div>

      {/* Main About Section */}
      <div className="container about-main-section">
        <div className="about-grid">
          {/* Left: Images */}
          <div className="about-image-col">
            <div className="about-img-main-wrapper">
              {/* Using existing placeholder images to mimic screenshot */}
              <img src="/course_cnc.png" alt="Students learning CNC" className="about-img-main" />
            </div>
            <div className="about-img-overlap-wrapper">
              <img src="/course_electronics.png" alt="Students practical" className="about-img-overlap" />
            </div>
          </div>

          {/* Right: Text */}
          <div className="about-text-col">
            <div className="about-subtitle-wrapper">
              <span className="about-line"></span>
              <span className="about-subtitle">WELCOME TO SKILLSERVE</span>
            </div>
            <h2 className="about-title">Good Qualification Services And Better Skills</h2>
            
            <div className="about-description">
              <p>SkillServe Academy is one of India's leading technical skill academies, dedicated to delivering practical, job-ready training that goes beyond traditional theoretical education. Our core focus is to equip learners with real-world skills that align with current industry demands.</p>
              
              <p>At SkillServe, we follow a blended learning approach that integrates classroom sessions, digital learning tools, and hands-on training in industry-simulated environments. Our training methodology is designed in alignment with Industry 4.0, LEAN practices, Quality Management Systems (QMS), and modern industrial standards.</p>
              
              <p>We believe in bridging the gap between education and employment. By combining innovation with industry relevance, we prepare learners to confidently step into the workforce with the right skills, mindset, and experience.</p>
              
              <p>Our programmes are aligned with the National Credit Framework (NCrF), enabling learners to earn recognized and transferable credits that support long-term career growth and academic progression.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Offered Programmes Section */}
      <div className="about-programmes-section">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Our Offered Programmes</h2>
            <div className="title-underline mx-auto"></div>
          </div>
          
          <div className="programmes-grid">
            {programmes.map(prog => (
              <Link to={prog.link} key={prog.id} className="programme-card">
                <div className={`programme-icon-wrapper ${prog.color}-bg`}>
                  <div className={`programme-icon ${prog.color}`}>
                    {prog.icon}
                  </div>
                </div>
                <h3 className="programme-title">{prog.title}</h3>
                <span className="programme-explore">Explore Course →</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div className="container about-mission-vision">
        <div className="mv-grid">
          {/* Mission */}
          <div className="mv-card mission-card">
            <div className="mv-icon-wrapper">
              <Target size={40} className="text-orange" />
            </div>
            <h3 className="mv-title">Our Mission</h3>
            <p className="mv-desc">To empower the youth of India with highly practical, job-oriented technical skills. We strive to bridge the gap between theoretical knowledge and real-world industrial requirements by providing state-of-the-art training environments and expert mentorship.</p>
          </div>

          {/* Vision */}
          <div className="mv-card vision-card">
            <div className="mv-icon-wrapper">
              <Eye size={40} className="text-blue" />
            </div>
            <h3 className="mv-title">Our Vision</h3>
            <p className="mv-desc">To be India's most trusted and premier skill development academy, creating a robust ecosystem where industry and academia integrate seamlessly. We envision a future where every learner is equipped to excel in the global manufacturing and technology sectors.</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default About;
