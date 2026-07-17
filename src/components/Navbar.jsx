import React, { useState } from "react";
import { Link } from "react-router-dom";
import { User, Users, Menu, X } from "lucide-react";
import "./Navbar.css";

const Navbar = () => {
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="navbar-logo">
          <img src="/logo.png" alt="SkillServe Academy" />
        </Link>

        {/* Mobile Menu */}
        <button
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <div className={`navbar-collapse ${isMobileMenuOpen ? "show" : ""}`}>
          <ul className="navbar-links">

            {/* Courses */}
            <li
              className="nav-item dropdown"
              onMouseEnter={() => window.innerWidth > 768 && setIsCoursesOpen(true)}
              onMouseLeave={() => window.innerWidth > 768 && setIsCoursesOpen(false)}
            >
              <span className="nav-link" onClick={() => setIsCoursesOpen(!isCoursesOpen)}>
                Courses <span>{isCoursesOpen ? "-" : "+"}</span>
              </span>

              {isCoursesOpen && (
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/courses/cnc-programming-course" onClick={() => setIsMobileMenuOpen(false)}>
                      CNC - VMC & Manufacturing
                    </Link>
                  </li>

                  <li>
                    <Link to="/courses/cad-cam-course">
                      CAD - CAM & 3D Printing
                    </Link>
                  </li>

                  <li>
                    <Link to="/courses/electric-vehicle-course" onClick={() => setIsMobileMenuOpen(false)}>
                      Electric Vehicles
                    </Link>
                  </li>

                  <li>
                    <Link to="/courses/electronics-robotics-course" onClick={() => setIsMobileMenuOpen(false)}>
                      Electronics & Robotics
                    </Link>
                  </li>

                  <li>
                    <Link to="/courses/plc-scada-course" onClick={() => setIsMobileMenuOpen(false)}>
                      PLC, Automation & IIOT
                    </Link>
                  </li>

                  <li>
                    <Link to="/courses/digital-marketing-course" onClick={() => setIsMobileMenuOpen(false)}>
                      Digital Marketing With AI Tools
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li className="nav-item">
              <Link to="/blog" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                Blogs
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/about" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                About <span>+</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/contact" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                Contact
              </Link>
            </li>

            {/* APPLY NOW */}
            <li
              className="nav-item dropdown"
              onMouseEnter={() => window.innerWidth > 768 && setIsApplyOpen(true)}
              onMouseLeave={() => window.innerWidth > 768 && setIsApplyOpen(false)}
            >
              <span className="nav-link" onClick={() => setIsApplyOpen(!isApplyOpen)}>
                Apply Now <span>{isApplyOpen ? "-" : "+"}</span>
              </span>

              {isApplyOpen && (
                <ul className="dropdown-menu">

                  <li>
                    <a
                      href="https://www.cnc.skillserveacademy.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      CNC - VMC & Manufacturing
                    </a>
                  </li>

                  <li>
                    <a
                      href="https://www.cad.skillserveacademy.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      CAD - CAM & 3D Printing
                    </a>
                  </li>

                  <li>
                    <a
                      href="https://www.ev.skillserveacademy.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Electric Vehicles
                    </a>
                  </li>

                  <li>
                    <a
                      href="https://www.electronics.skillserveacademy.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Electronics & Robotics
                    </a>
                  </li>

                  <li>
                    <a
                      href="https://www.iot.skillserveacademy.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      PLC, Automation & IIOT
                    </a>
                  </li>

                  <li>
                    <a
                      href="https://www.dm.skillserveacademy.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Digital Marketing With AI Tools
                    </a>
                  </li>

                </ul>
              )}
            </li>

          </ul>

          <div className="navbar-auth">
            <button className="btn btn-login">
              <User size={16} />
              LOG IN
            </button>

            <button className="btn btn-signup">
              <Users size={16} />
              SIGN UP
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;