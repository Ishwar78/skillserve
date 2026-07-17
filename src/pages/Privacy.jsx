import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Policy.css';

const Privacy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="policy-page">
      <div className="policy-header">
        <div className="container">
          <h1 className="policy-title">Privacy Policy</h1>
          <div className="policy-breadcrumb">
            <Link to="/">Home</Link> / <span>Privacy Policy</span>
          </div>
        </div>
      </div>

      <div className="container policy-content-wrapper">
        <div className="policy-content">
          <div className="policy-meta">
            <p><strong>Effective Date:</strong> 02-12-2025</p>
            <p><strong>Last Updated:</strong> 01-05-2026</p>
          </div>

          <p className="policy-intro">
            SkillServe Academy ("SkillServe", "Company", "we", "our", or "us") is committed to safeguarding the privacy and personal data of individuals who access, use, or interact with our website, Learning Management System (LMS), training programs, and services.
          </p>
          
          <p className="policy-intro">
            By accessing or using our website, enrolling in our programs, or interacting with our services, you agree to the terms of this Privacy Policy.
          </p>

          <div className="policy-section">
            <h2>1. Information We Collect</h2>
            <p>We collect personal information including name, contact details, educational qualifications, and payment information. We also collect technical data such as IP addresses and usage patterns.</p>
          </div>

          <div className="policy-section">
            <h2>2. How We Use Your Information</h2>
            <p>We use your information for course registration, training delivery, certification, placement assistance, and communication regarding our services.</p>
          </div>

          <div className="policy-section">
            <h2>3. Data Security</h2>
            <p>We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, or disclosure.</p>
          </div>

          <div className="policy-section policy-contact">
            <h2>4. Contact Us</h2>
            <p>For any privacy-related questions, contact us at:</p>
            <br />
            <p><strong>Email:</strong> info@skillserve.in</p>
            <p><strong>Phone:</strong> +91-9484794843</p>
            <p><strong>Address:</strong> Plot No. 98-C, Udyog Vihar Phase VII, Sector 35, Gurugram, Haryana 122004</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
