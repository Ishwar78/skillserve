import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaYoutube, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { Mail } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      {/* Top CTA strip */}
      {/* <div className="footer-cta-strip">
        <div className="container footer-cta-inner">
          <div className="footer-cta-text">
            <h3>Ready to transform your career?</h3>
            <p>Join 5000+ students who have already taken the first step.</p>
          </div>
          <div className="footer-cta-btns">
            <a href="#" className="footer-cta-btn-primary">Apply Now</a>
            <a href="#" className="footer-cta-btn-ghost">Download Brochure</a>
          </div>
        </div>
      </div> */}

      {/* Main footer */}
      <div className="footer-main">
        <div className="container footer-grid">

          {/* Brand col */}
          <div className="footer-brand-col">
            <img src="/logo.png" alt="SkillServe Academy" className="footer-logo" />
            <p className="footer-brand-desc">
              India's Leading Technical Skill Academy focused on practical, job-ready training for the Industry 4.0 era.
            </p>
            <div className="footer-socials">
              <a href="https://www.facebook.com/p/SkillServe-61575759530831/" className="footer-social"><FaFacebook /></a>
              <a href="https://www.instagram.com/skill.serve" className="footer-social"><FaInstagram /></a>
              <a href="https://www.youtube.com/@skillserve23" className="footer-social"><FaYoutube /></a>
            </div>
          </div>

          {/* Useful Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Useful Links</h4>
            <div className="footer-underline"></div>
            <ul className="footer-links">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/terms">Terms & Conditions</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/blog">Blogs</Link></li>
            </ul>
          </div>

          {/* Courses */}
          <div className="footer-col">
            <h4 className="footer-col-title">Courses Categories</h4>
            <div className="footer-underline"></div>
            <ul className="footer-links">
              <li><a href="/courses/cnc-programming-course">CNC - VMC & Manufacturing</a></li>
              <li><a href="/courses/cad-cam-course">CAD - CAM & 3D Printing</a></li>
              <li><a href="/courses/electric-vehicle-course">Electric Vehicle</a></li>
              <li><a href="/courses/electronics-robotics-course">Electronics & Robotics</a></li>
              <li><a href="/courses/digital-marketing-course">Digital Marketing with AI</a></li>
              <li><a href="/courses/plc-scada-course">PLC, Automation & IIOT</a></li>
            </ul>
          </div>

          {/* Social */}
          <div className="footer-col">
            <h4 className="footer-col-title">Social Contact</h4>
            <div className="footer-underline"></div>
            <ul className="footer-links">
              <li><a href="https://www.facebook.com/p/SkillServe-61575759530831/" target="_blank" rel="noopener noreferrer"><FaFacebook style={{marginRight:8}}/> Facebook</a></li>
              <li><a href="https://www.instagram.com/skill.serve" target="_blank" rel="noopener noreferrer"><FaInstagram style={{marginRight:8}}/> Instagram</a></li>
              <li><a href="https://www.youtube.com/@skillserve23" target="_blank" rel="noopener noreferrer"><FaYoutube style={{marginRight:8}}/> YouTube</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="footer-col">
            <h4 className="footer-col-title">Our Support</h4>
            <div className="footer-underline"></div>
            <ul className="footer-links footer-support">
              <li><a href="#">Contact Support</a></li>
              <li>
                <span className="footer-contact-item">
                  <FaPhoneAlt size={13} />
                  +91 9484794843
                </span>
              </li>
              <li>
                <span className="footer-contact-item">
                  <Mail size={13} />
                  info@skillserveacademy.com
                </span>
              </li>
              <li>
                <span className="footer-contact-item footer-addr">
                  <FaMapMarkerAlt size={13} style={{flexShrink:0, marginTop:3}} />
                  Plot No, 98-C, Udhyog Vihar Phase VII, Sector 35, Gurugram, Haryana 122004
                </span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>© 2026 SkillServe Academy. All Rights Reserved.</p>
          <p>Designed with ♥ for India's skilled future.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
