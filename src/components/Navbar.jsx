import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Link,
  NavLink,
  useLocation,
} from "react-router-dom";

import {
  ArrowUpRight,
  ChevronDown,
  Menu,
  User,
  Users,
  X,
} from "lucide-react";

import "./Navbar.css";

const courseLinks = [
  {
    id: 1,
    title: "CNC - VMC & Manufacturing",
    description: "Machining and manufacturing skills",
    link: "/courses/cnc-programming-course",
  },
  {
    id: 2,
    title: "CAD - CAM & 3D Printing",
    description: "Design and production software",
    link: "/courses/cad-cam-course",
  },
  {
    id: 3,
    title: "Electric Vehicles",
    description: "EV systems, battery and diagnostics",
    link: "/courses/electric-vehicle-course",
  },
  {
    id: 4,
    title: "Electronics & Robotics",
    description: "Embedded electronics and robotics",
    link: "/courses/electronics-robotics-course",
  },
  {
    id: 5,
    title: "PLC, Automation & IIOT",
    description: "Industrial automation technology",
    link: "/courses/plc-scada-course",
  },
  {
    id: 6,
    title: "Digital Marketing With AI Tools",
    description: "Marketing, content and AI skills",
    link: "/courses/digital-marketing-course",
  },
];

const applyLinks = [
  {
    id: 1,
    title: "CNC - VMC & Manufacturing",
    link: "https://www.cnc.skillserveacademy.in/",
  },
  {
    id: 2,
    title: "CAD - CAM & 3D Printing",
    link: "https://www.cad.skillserveacademy.in/",
  },
  {
    id: 3,
    title: "Electric Vehicles",
    link: "https://www.ev.skillserveacademy.in/",
  },
  {
    id: 4,
    title: "Electronics & Robotics",
    link: "https://www.electronics.skillserveacademy.in/",
  },
  {
    id: 5,
    title: "PLC, Automation & IIOT",
    link: "https://www.iot.skillserveacademy.in/",
  },
  {
    id: 6,
    title: "Digital Marketing With AI Tools",
    link: "https://www.dm.skillserveacademy.in/",
  },
];

const Navbar = () => {
  const [isCoursesOpen, setIsCoursesOpen] =
    useState(false);

  const [isApplyOpen, setIsApplyOpen] =
    useState(false);

  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);

  const navbarRef = useRef(null);
  const location = useLocation();

  const isCoursePage =
    location.pathname.startsWith("/courses/");

  const isDesktopView = () =>
    window.innerWidth > 1080;

  const closeDropdowns = () => {
    setIsCoursesOpen(false);
    setIsApplyOpen(false);
  };

  const closeAllMenus = () => {
    closeDropdowns();
    setIsMobileMenuOpen(false);
  };

  const toggleCourses = () => {
    setIsCoursesOpen((previous) => !previous);
    setIsApplyOpen(false);
  };

  const toggleApply = () => {
    setIsApplyOpen((previous) => !previous);
    setIsCoursesOpen(false);
  };

  useEffect(() => {
    closeAllMenus();
  }, [location.pathname]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target)
      ) {
        closeAllMenus();
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeAllMenus();
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );

      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1080) {
        setIsMobileMenuOpen(false);
      } else {
        closeDropdowns();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, []);

  useEffect(() => {
    if (
      isMobileMenuOpen &&
      window.innerWidth <= 1080
    ) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <nav
      ref={navbarRef}
      className="skill-navbar"
      aria-label="Main navigation"
    >
      <div className="skill-navbar-container">
        {/* Logo */}
        <Link
          to="/"
          className="skill-navbar-logo"
          aria-label="SkillServe Academy Home"
          onClick={closeAllMenus}
        >
          <img
            src="/logo.png"
            alt="SkillServe Academy"
          />
        </Link>

        {/* Mobile Toggle */}
        <button
          type="button"
          className={`skill-mobile-toggle ${
            isMobileMenuOpen ? "active" : ""
          }`}
          onClick={() =>
            setIsMobileMenuOpen(
              (previous) => !previous
            )
          }
          aria-label={
            isMobileMenuOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? (
            <X size={25} />
          ) : (
            <Menu size={25} />
          )}
        </button>

        <div
          className={`skill-navbar-collapse ${
            isMobileMenuOpen ? "show" : ""
          }`}
        >
          <ul className="skill-navbar-links">
            {/* Courses */}
            <li
              className={`skill-nav-item skill-dropdown ${
                isCoursesOpen ? "open" : ""
              }`}
              onMouseEnter={() => {
                if (isDesktopView()) {
                  setIsCoursesOpen(true);
                  setIsApplyOpen(false);
                }
              }}
              onMouseLeave={() => {
                if (isDesktopView()) {
                  setIsCoursesOpen(false);
                }
              }}
            >
              <button
                type="button"
                className={`skill-nav-link skill-dropdown-trigger ${
                  isCoursePage ? "active" : ""
                }`}
                onClick={toggleCourses}
                aria-expanded={isCoursesOpen}
              >
                <span>Courses</span>

                <ChevronDown
                  size={17}
                  className="skill-dropdown-chevron"
                />
              </button>

              <div
                className={`skill-dropdown-menu skill-courses-dropdown ${
                  isCoursesOpen ? "show" : ""
                }`}
              >
                <div className="skill-dropdown-header">
                  <span>
                    Industry-Focused Training
                  </span>

                  <h3>Explore Our Courses</h3>
                </div>

                <div className="skill-course-dropdown-grid">
                  {courseLinks.map(
                    (course, index) => (
                      <Link
                        key={course.id}
                        to={course.link}
                        className="skill-course-dropdown-item"
                        onClick={closeAllMenus}
                      >
                        <span className="skill-course-number">
                          {String(index + 1).padStart(
                            2,
                            "0"
                          )}
                        </span>

                        <span className="skill-course-content">
                          <strong>
                            {course.title}
                          </strong>

                          <small>
                            {course.description}
                          </small>
                        </span>

                        <ArrowUpRight
                          size={17}
                          className="skill-course-arrow"
                        />
                      </Link>
                    )
                  )}
                </div>
              </div>
            </li>

            {/* Blogs */}
            <li className="skill-nav-item">
              <NavLink
                to="/blog"
                className={({ isActive }) =>
                  `skill-nav-link ${
                    isActive ? "active" : ""
                  }`
                }
                onClick={closeAllMenus}
              >
                Blogs
              </NavLink>
            </li>

            {/* About */}
            <li className="skill-nav-item">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `skill-nav-link ${
                    isActive ? "active" : ""
                  }`
                }
                onClick={closeAllMenus}
              >
                About
              </NavLink>
            </li>

            {/* Contact */}
            <li className="skill-nav-item">
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `skill-nav-link ${
                    isActive ? "active" : ""
                  }`
                }
                onClick={closeAllMenus}
              >
                Contact
              </NavLink>
            </li>

            {/* Apply Now */}
            <li
              className={`skill-nav-item skill-dropdown ${
                isApplyOpen ? "open" : ""
              }`}
              onMouseEnter={() => {
                if (isDesktopView()) {
                  setIsApplyOpen(true);
                  setIsCoursesOpen(false);
                }
              }}
              onMouseLeave={() => {
                if (isDesktopView()) {
                  setIsApplyOpen(false);
                }
              }}
            >
              <button
                type="button"
                className="skill-nav-link skill-dropdown-trigger skill-apply-trigger"
                onClick={toggleApply}
                aria-expanded={isApplyOpen}
              >
                <span>Apply Now</span>

                <ChevronDown
                  size={17}
                  className="skill-dropdown-chevron"
                />
              </button>

              <div
                className={`skill-dropdown-menu skill-apply-dropdown ${
                  isApplyOpen ? "show" : ""
                }`}
              >
                <div className="skill-dropdown-header">
                  <span>
                    Start Your Application
                  </span>

                  <h3>Select Your Programme</h3>
                </div>

                <div className="skill-apply-list">
                  {applyLinks.map(
                    (application, index) => (
                      <a
                        key={application.id}
                        href={application.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="skill-apply-item"
                        onClick={closeAllMenus}
                      >
                        <span className="skill-apply-number">
                          {String(index + 1).padStart(
                            2,
                            "0"
                          )}
                        </span>

                        <strong>
                          {application.title}
                        </strong>

                        <ArrowUpRight size={17} />
                      </a>
                    )
                  )}
                </div>
              </div>
            </li>
          </ul>

          {/* Login / Signup */}
          <div className="skill-navbar-auth">
            <button
              type="button"
              className="skill-navbar-button skill-login-button"
            >
              <User size={18} />
              <span>Log In</span>
            </button>

            <button
              type="button"
              className="skill-navbar-button skill-signup-button"
            >
              <Users size={18} />
              <span>Sign Up</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;