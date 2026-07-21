import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  Target,
  Eye,
  Factory,
  Settings,
  DraftingCompass,
  CarFront,
  Megaphone,
  Bot,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Award,
  UsersRound,
  BriefcaseBusiness,
  GraduationCap,
  Sparkles,
  ShieldCheck,
  BookOpenCheck,
} from "lucide-react";

import api from "../utils/api";
import "./About.css";

const defaultAbout = {
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

const About = () => {
  const [about, setAbout] = useState(defaultAbout);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const { data } = await api.get('/about-info');
        if (data) {
          setAbout(data);
        }
      } catch (error) {
        console.error('Error fetching about us details, using fallback:', error);
      }
    };
    fetchAbout();
  }, []);
  const programmes = [
    {
      id: 1,
      title: "CNC-VMC & Manufacturing",
      description:
        "Build practical machining, programming and manufacturing skills.",
      icon: Factory,
      colorClass: "about-programme-green",
      link: "/courses/cnc-programming-course",
    },
    {
      id: 2,
      title: "PLC Automation",
      description:
        "Learn industrial automation, control systems, PLC and SCADA.",
      icon: Settings,
      colorClass: "about-programme-blue",
      link: "/courses/plc-scada-course",
    },
    {
      id: 3,
      title: "CAD-CAM Designing",
      description:
        "Master professional product designing and manufacturing software.",
      icon: DraftingCompass,
      colorClass: "about-programme-yellow",
      link: "/courses/cad-cam-course",
    },
    {
      id: 4,
      title: "Electric Vehicle",
      description:
        "Explore EV technology, diagnostics, batteries and vehicle systems.",
      icon: CarFront,
      colorClass: "about-programme-pink",
      link: "/courses/electric-vehicle-course",
    },
    {
      id: 5,
      title: "Digital Marketing & AI",
      description:
        "Develop digital growth, content, advertising and modern AI skills.",
      icon: Megaphone,
      colorClass: "about-programme-orange",
      link: "/courses/digital-marketing-course",
    },
    {
      id: 6,
      title: "Electronics & Robotics",
      description:
        "Create smart electronic, embedded and robotics-based projects.",
      icon: Bot,
      colorClass: "about-programme-purple",
      link: "/courses/electronics-robotics-course",
    },
  ];

  const highlights = [
    {
      id: 1,
      icon: GraduationCap,
      title: "Industry-Focused",
      description: "Training aligned with modern workplace requirements.",
    },
    {
      id: 2,
      icon: BriefcaseBusiness,
      title: "Job-Ready Skills",
      description: "Practical knowledge designed to support career growth.",
    },
    {
      id: 3,
      icon: UsersRound,
      title: "Expert Mentorship",
      description: "Learn with guidance from experienced industry trainers.",
    },
    {
      id: 4,
      icon: Award,
      title: "Recognised Learning",
      description: "Programmes aligned with structured skill frameworks.",
    },
  ];

  const learningPoints = [
    "Practical and hands-on technical training",
    "Industry 4.0 and modern industrial practices",
    "Classroom, digital and simulated learning",
    "Career-oriented guidance and mentorship",
  ];

  return (
    <main className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-shape about-hero-shape-one" />
        <div className="about-hero-shape about-hero-shape-two" />
        <div className="about-hero-grid-pattern" />

        <div className="container about-hero-container">
          <div className="about-hero-content">
            <span className="about-hero-badge">
              <Sparkles size={16} />
              About SkillServe Academy
            </span>

            <h1 className="about-hero-title">
              {about.heroTitle}
            </h1>

            <p className="about-hero-description">
              {about.heroDescription}
            </p>

            <div className="about-hero-actions">
              <Link to="/contact" className="about-primary-button">
                Apply For Training
                <ArrowRight size={18} />
              </Link>

              <Link to="/courses/cnc-programming-course" className="about-secondary-button">
                Explore Courses
                <ArrowUpRight size={17} />
              </Link>
            </div>

            <div className="about-breadcrumb">
              <Link to="/">Home</Link>
              <span>/</span>
              <strong>About Us</strong>
            </div>
          </div>

          <div className="about-hero-visual">
            <div className="about-hero-image-card">
              <img
                src="/course_cnc.png"
                alt="SkillServe Academy technical training"
              />

              <div className="about-hero-image-overlay" />

              <div className="about-image-floating-card">
                <div className="about-floating-icon">
                  <ShieldCheck size={22} />
                </div>

                <div>
                  <span>Practical Training</span>
                  <strong>Industry-Ready Learning</strong>
                </div>
              </div>
            </div>

            <div className="about-hero-small-image">
              <img
                src="/course_electronics.png"
                alt="SkillServe practical electronics training"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="about-highlights-section">
        <div className="container">
          <div className="about-highlights-grid">
            {highlights.map((item) => {
              const IconComponent = item.icon;

              return (
                <article key={item.id} className="about-highlight-card">
                  <div className="about-highlight-icon">
                    <IconComponent size={23} />
                  </div>

                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main About Content */}
      <section className="about-introduction-section">
        <div className="container">
          <div className="about-introduction-grid">
            {/* Images */}
            <div className="about-images-column">
              <div className="about-main-image-wrapper">
                <img
                  src="/course_cnc.png"
                  alt="Students learning technical CNC skills"
                  className="about-main-image"
                />

                <div className="about-main-image-shade" />

                <div className="about-experience-badge">
                  <BookOpenCheck size={26} />

                  <div>
                    <strong>Practical</strong>
                    <span>Learning Approach</span>
                  </div>
                </div>
              </div>

              <div className="about-overlap-image-wrapper">
                <img
                  src="/course_electronics.png"
                  alt="Students working in practical laboratory"
                  className="about-overlap-image"
                />
              </div>

              <div className="about-image-decoration" />
            </div>

            {/* Text */}
            <div className="about-text-column">
              <div className="about-section-label">
                <span />
                Welcome To SkillServe
              </div>

              <h2 className="about-introduction-title">
                {about.introTitle}
              </h2>

              <p className="about-lead-text">
                {about.introLeadText}
              </p>

              <div className="about-description" dangerouslySetInnerHTML={{ __html: about.introContent }} />

              <div className="about-learning-points">
                {learningPoints.map((point) => (
                  <div key={point} className="about-learning-point">
                    <CheckCircle2 size={19} />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              <Link to="/contact" className="about-content-button">
                Start Your Application
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Programmes */}
      <section className="about-programmes-section">
        <div className="about-programmes-decoration" />

        <div className="container">
          <div className="about-section-heading">
            <span className="about-heading-badge">
              <GraduationCap size={16} />
              Industry-Oriented Courses
            </span>

            <h2>
              Explore Our Offered
              <span> Programmes</span>
            </h2>

            <p>
              Choose from practical training programmes designed around
              manufacturing, automation, technology and modern digital skills.
            </p>
          </div>

          <div className="about-programmes-grid">
            {programmes.map((programme, index) => {
              const IconComponent = programme.icon;

              return (
                <Link
                  to={programme.link}
                  key={programme.id}
                  className={`about-programme-card ${programme.colorClass}`}
                >
                  <div className="about-programme-card-top">
                    <span className="about-programme-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <ArrowUpRight
                      size={19}
                      className="about-programme-arrow"
                    />
                  </div>

                  <div className="about-programme-icon">
                    <IconComponent size={31} strokeWidth={1.9} />
                  </div>

                  <h3>{programme.title}</h3>

                  <p>{programme.description}</p>

                  <span className="about-programme-link">
                    Explore Course
                    <ArrowRight size={16} />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="about-mission-section">
        <div className="container">
          <div className="about-section-heading">
            <span className="about-heading-badge">
              <Target size={16} />
              Our Purpose
            </span>

            <h2>
              Driven By A Clear
              <span> Mission &amp; Vision</span>
            </h2>

            <p>
              We are building a stronger connection between education,
              practical skills and meaningful employment opportunities.
            </p>
          </div>

          <div className="about-mission-grid">
            <article className="about-mission-card">
              <div className="about-mv-card-number">01</div>

              <div className="about-mv-icon">
                <Target size={31} />
              </div>

              <span className="about-mv-label">Our Mission</span>

              <h3>{about.missionTitle}</h3>

              <p>
                {about.missionDescription}
              </p>

              <div className="about-mv-bottom-line" />
            </article>

            <article className="about-vision-card">
              <div className="about-mv-card-number">02</div>

              <div className="about-mv-icon">
                <Eye size={31} />
              </div>

              <span className="about-mv-label">Our Vision</span>

              <h3>{about.visionTitle}</h3>

              <p>
                {about.visionDescription}
              </p>

              <div className="about-mv-bottom-line" />
            </article>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta-section">
        <div className="container">
          <div className="about-cta-card">
            <div className="about-cta-decoration about-cta-decoration-one" />
            <div className="about-cta-decoration about-cta-decoration-two" />

            <div className="about-cta-content">
              <span>
                <Sparkles size={16} />
                Start Your Learning Journey
              </span>

              <h2>
                Ready To Build Skills For A
                <strong> Better Career?</strong>
              </h2>

              <p>
                Connect with our admission experts and choose the training
                programme that matches your career goals.
              </p>
            </div>

            <div className="about-cta-actions">
              <Link to="/contact" className="about-cta-primary">
                Apply Now
                <ArrowRight size={18} />
              </Link>

              <a href="tel:+919484794843" className="about-cta-secondary">
                Talk To An Expert
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;