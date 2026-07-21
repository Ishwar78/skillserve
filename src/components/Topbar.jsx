import React from "react";
import {
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

import "./Topbar.css";

const Topbar = () => {
  const phoneNumber = "9484794843";
  const emailAddress = "info@skillserve.in";

  return (
    <div className="topbar">
      <div className="container topbar-content">
        {/* Left side information */}
        <div className="topbar-left">
          <a
            href={`tel:+91${phoneNumber}`}
            className="topbar-item topbar-clickable-item"
            aria-label={`Call ${phoneNumber}`}
          >
            <Phone
              size={15}
              className="topbar-icon"
            />

            <span>{phoneNumber}</span>
          </a>

          <a
            href={`mailto:${emailAddress}`}
            className="topbar-item topbar-clickable-item"
            aria-label={`Email ${emailAddress}`}
          >
            <Mail
              size={15}
              className="topbar-icon"
            />

            <span>{emailAddress}</span>
          </a>

          <div className="topbar-item">
            <MapPin
              size={15}
              className="topbar-icon"
            />

            <span>Gurugram, Haryana, India</span>
          </div>
        </div>

        {/* Right side social links */}
        <div className="topbar-right">
          <span className="find-us">
            Find us on:
          </span>

          <div className="social-links">
            <a
              href="https://www.facebook.com/p/SkillServe-61575759530831/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="Visit SkillServe on Facebook"
              title="Facebook"
            >
              <FaFacebookF size={14} />
            </a>

            <a
              href="https://www.instagram.com/skill.serve"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="Visit SkillServe on Instagram"
              title="Instagram"
            >
              <FaInstagram size={15} />
            </a>

            <a
              href="https://www.youtube.com/@skillserve23"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="Visit SkillServe on YouTube"
              title="YouTube"
            >
              <FaYoutube size={15} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;