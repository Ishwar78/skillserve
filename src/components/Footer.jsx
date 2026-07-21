import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

import {
  ArrowRight,
  ChevronDown,
  GraduationCap,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import "./Footer.css";

const Footer = () => {
  const [openSection, setOpenSection] = useState(null);

  const phoneNumber = "9484794843";
  const emailAddress = "info@skillserveacademy.com";

  const toggleSection = (sectionName) => {
    setOpenSection((previous) =>
      previous === sectionName ? null : sectionName
    );
  };

  const closeAccordion = () => {
    setOpenSection(null);
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      {/* Top CTA */}
      <section className="footer-cta">
        <div className="footer-cta-decoration footer-cta-decoration-one" />
        <div className="footer-cta-decoration footer-cta-decoration-two" />

        {/* <div className="container footer-cta-container">
          <div className="footer-cta-content">
            <span className="footer-cta-label">
              <Sparkles size={16} />
              Start Your Career Journey
            </span>

            <h2>
              Ready To Build Skills For A
              <strong> Better Future?</strong>
            </h2>

            <p>
              Speak with our admission experts and choose the right
              industry-focused training programme for your career.
            </p>
          </div>

          <div className="footer-cta-actions">
            <Link to="/contact" className="footer-cta-primary">
              Apply For Training
              <ArrowRight size={18} />
            </Link>

            <a
              href={`tel:+91${phoneNumber}`}
              className="footer-cta-secondary"
            >
              <FaPhoneAlt size={14} />
              Call An Expert
            </a>
          </div>
        </div> */}
      </section>

      {/* Main Footer */}
      <section className="footer-main">
        <div className="footer-main-decoration" />

        <div className="container footer-grid">
          {/* Brand */}
          <div className="footer-brand-column">
            <Link
              to="/"
              className="footer-logo-link"
              onClick={closeAccordion}
            >
              <img
                src="/logo.png"
                alt="SkillServe Academy"
                className="footer-logo"
              />
            </Link>

            <p className="footer-brand-description">
              India&apos;s leading technical skill academy focused on
              practical, job-ready training for Industry 4.0,
              manufacturing, automation and modern technology careers.
            </p>

            <div className="footer-trust-box">
              <div className="footer-trust-icon">
                <ShieldCheck size={22} />
              </div>

              <div>
                <span>Industry-Integrated Learning</span>
                <strong>Practical Skills. Better Careers.</strong>
              </div>
            </div>

            <div className="footer-social-icons">
              <a
                href="https://www.facebook.com/p/SkillServe-61575759530831/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="SkillServe Facebook"
              >
                <FaFacebookF />
              </a>

              <a
                href="https://www.instagram.com/skill.serve"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="SkillServe Instagram"
              >
                <FaInstagram />
              </a>

              <a
                href="https://www.youtube.com/@skillserve23"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="SkillServe YouTube"
              >
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Useful Links */}
          <div
            className={`footer-navigation-column ${
              openSection === "useful" ? "open" : ""
            }`}
          >
            <button
              type="button"
              className="footer-column-heading"
              onClick={() => toggleSection("useful")}
              aria-expanded={openSection === "useful"}
            >
              <span>Useful Links</span>

              <ChevronDown
                size={18}
                className="footer-heading-arrow"
              />
            </button>

            <div className="footer-heading-line" />

            <div className="footer-collapsible-content">
              <ul className="footer-links">
                <li>
                  <Link to="/about" onClick={closeAccordion}>
                    About Us
                  </Link>
                </li>

                <li>
                  <Link to="/terms" onClick={closeAccordion}>
                    Terms &amp; Conditions
                  </Link>
                </li>

                <li>
                  <Link to="/contact" onClick={closeAccordion}>
                    Contact Us
                  </Link>
                </li>

                <li>
                  <Link to="/privacy" onClick={closeAccordion}>
                    Privacy Policy
                  </Link>
                </li>

                <li>
                  <Link to="/blog" onClick={closeAccordion}>
                    Blogs
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Courses */}
          <div
            className={`footer-navigation-column footer-courses-column ${
              openSection === "courses" ? "open" : ""
            }`}
          >
            <button
              type="button"
              className="footer-column-heading"
              onClick={() => toggleSection("courses")}
              aria-expanded={openSection === "courses"}
            >
              <span>Course Categories</span>

              <ChevronDown
                size={18}
                className="footer-heading-arrow"
              />
            </button>

            <div className="footer-heading-line" />

            <div className="footer-collapsible-content">
              <ul className="footer-links">
                <li>
                  <Link
                    to="/courses/cnc-programming-course"
                    onClick={closeAccordion}
                  >
                    CNC - VMC &amp; Manufacturing
                  </Link>
                </li>

                <li>
                  <Link
                    to="/courses/cad-cam-course"
                    onClick={closeAccordion}
                  >
                    CAD - CAM &amp; 3D Printing
                  </Link>
                </li>

                <li>
                  <Link
                    to="/courses/electric-vehicle-course"
                    onClick={closeAccordion}
                  >
                    Electric Vehicle
                  </Link>
                </li>

                <li>
                  <Link
                    to="/courses/electronics-robotics-course"
                    onClick={closeAccordion}
                  >
                    Electronics &amp; Robotics
                  </Link>
                </li>

                <li>
                  <Link
                    to="/courses/digital-marketing-course"
                    onClick={closeAccordion}
                  >
                    Digital Marketing With AI
                  </Link>
                </li>

                <li>
                  <Link
                    to="/courses/plc-scada-course"
                    onClick={closeAccordion}
                  >
                    PLC, Automation &amp; IIOT
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Social Contact */}
          <div
            className={`footer-navigation-column ${
              openSection === "social" ? "open" : ""
            }`}
          >
            <button
              type="button"
              className="footer-column-heading"
              onClick={() => toggleSection("social")}
              aria-expanded={openSection === "social"}
            >
              <span>Social Contact</span>

              <ChevronDown
                size={18}
                className="footer-heading-arrow"
              />
            </button>

            <div className="footer-heading-line" />

            <div className="footer-collapsible-content">
              <ul className="footer-links footer-social-links">
                <li>
                  <a
                    href="https://www.facebook.com/p/SkillServe-61575759530831/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaFacebookF />
                    Facebook
                  </a>
                </li>

                <li>
                  <a
                    href="https://www.instagram.com/skill.serve"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram />
                    Instagram
                  </a>
                </li>

                <li>
                  <a
                    href="https://www.youtube.com/@skillserve23"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaYoutube />
                    YouTube
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Support */}
          <div
            className={`footer-navigation-column footer-support-column ${
              openSection === "support" ? "open" : ""
            }`}
          >
            <button
              type="button"
              className="footer-column-heading"
              onClick={() => toggleSection("support")}
              aria-expanded={openSection === "support"}
            >
              <span>Our Support</span>

              <ChevronDown
                size={18}
                className="footer-heading-arrow"
              />
            </button>

            <div className="footer-heading-line" />

            <div className="footer-collapsible-content">
              <ul className="footer-support-list">
                <li>
                  <Link
                    to="/contact"
                    className="footer-support-link"
                    onClick={closeAccordion}
                  >
                    <GraduationCap size={17} />
                    Contact Admission Support
                  </Link>
                </li>

                <li>
                  <a
                    href={`tel:+91${phoneNumber}`}
                    className="footer-contact-item"
                  >
                    <span className="footer-contact-icon">
                      <FaPhoneAlt size={13} />
                    </span>

                    <span>
                      <small>Call Us</small>
                      <strong>+91 {phoneNumber}</strong>
                    </span>
                  </a>
                </li>

                <li>
                  <a
                    href={`mailto:${emailAddress}`}
                    className="footer-contact-item"
                  >
                    <span className="footer-contact-icon">
                      <Mail size={15} />
                    </span>

                    <span>
                      <small>Email Us</small>
                      <strong>{emailAddress}</strong>
                    </span>
                  </a>
                </li>

                <li>
                  <div className="footer-contact-item footer-address">
                    <span className="footer-contact-icon">
                      <FaMapMarkerAlt size={14} />
                    </span>

                    <span>
                      <small>Visit Our Center</small>
                      <strong>
                        Plot No. 98-C, Udhyog Vihar Phase VII,
                        Sector 35, Gurugram, Haryana 122004
                      </strong>
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Footer */}
      <section className="footer-bottom">
        <div className="container footer-bottom-container">
          <p>
            © {currentYear} SkillServe Academy. All Rights Reserved.
          </p>

          <div className="footer-bottom-links">
            <Link to="/privacy">Privacy</Link>
            <span />
            <Link to="/terms">Terms</Link>
          </div>

          <p className="footer-made-text">
            Designed with <span>♥</span> for India&apos;s skilled future.
          </p>
        </div>
      </section>
    </footer>
  );
};

export default Footer;