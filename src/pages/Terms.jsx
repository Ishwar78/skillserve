import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Policy.css';

const Terms = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="policy-page">
      <div className="policy-header">
        <div className="container">
          <h1 className="policy-title">Terms & Conditions</h1>
          <div className="policy-breadcrumb">
            <Link to="/">Home</Link> / <span>Terms & Conditions</span>
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
            Welcome to SkillServe Academy. These Terms & Conditions govern your access to and use of our website, training programs, and related services.
          </p>

          <div className="policy-section">
            <h2>1. Acceptance of Terms</h2>
            <p>By using SkillServe Academy's services, you agree to be bound by these Terms.</p>
          </div>

          <div className="policy-section">
            <h2>2. Course Enrollment & Fees</h2>
            <p>Enrollment is subject to eligibility criteria and fee payment. Fees are non-refundable except as explicitly stated.</p>
          </div>

          <div className="policy-section">
            <h2>3. Placement Assistance</h2>
            <p>We provide placement assistance but do not guarantee job placement. Employment depends on individual performance and market conditions.</p>
          </div>

          <div className="policy-section">
            <h2>4. Code of Conduct</h2>
            <p>Students must maintain professional conduct. Misconduct may result in termination of services without refund.</p>
          </div>

          <div className="policy-section policy-contact">
            <h2>5. Contact Us</h2>
            <p><strong>Email:</strong> info@skillserve.in</p>
            <p><strong>Phone:</strong> +91-9484794843</p>
            <p><strong>Address:</strong> Plot No. 98-C, Udyog Vihar Phase VII, Sector 35, Gurugram</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
