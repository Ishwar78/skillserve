import React from 'react';
import { Phone, MapPin } from 'lucide-react';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import './Topbar.css';

const Topbar = () => {
  return (
    <div className="topbar">
      <div className="container topbar-content">
        <div className="topbar-left">
          <div className="topbar-item">
            <Phone size={14} className="topbar-icon" />
            <span>9484794843</span>
          </div>
          <div className="topbar-item">
            <MapPin size={14} className="topbar-icon" />
            <span>Gurugram, Haryana, India</span>
          </div>
        </div>
        <div className="topbar-right">
          <span className="find-us">Find us on :</span>
          <div className="social-links">
            <a href="https://www.facebook.com/p/SkillServe-61575759530831/" className="social-link"><FaFacebook size={14} /></a>
            <a href="https://www.instagram.com/skill.serve" className="social-link"><FaInstagram size={14} /></a>
            <a href="https://www.youtube.com/@skillserve23" className="social-link"><FaYoutube size={14} /></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
