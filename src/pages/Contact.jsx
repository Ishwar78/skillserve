import React, { useState } from 'react';
import { MapPin, Phone, Mail, Globe } from 'lucide-react';
import { stateDistrictMap, domainCourseMap, domainsList } from '../data/locations';
import './Contact.css';

const Contact = () => {
  const [selectedState, setSelectedState] = useState('');
  const [districts, setDistricts] = useState([]);

  const [selectedDomain, setSelectedDomain] = useState('');
  const [availableCourses, setAvailableCourses] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    fatherName: '',
    mobile: '',
    email: '',
    district: '',
    course: '',
    message: ''
  });

  const handleStateChange = (e) => {
    const stateName = e.target.value;
    setSelectedState(stateName);
    if (stateName && stateDistrictMap[stateName]) {
      setDistricts(stateDistrictMap[stateName]);
    } else {
      setDistricts([]);
    }
  };

  const handleDomainChange = (e) => {
    const domain = e.target.value;
    setSelectedDomain(domain);
    setFormData({ ...formData, course: '' }); // reset course selection
    if (domain && domainCourseMap[domain]) {
      setAvailableCourses(domainCourseMap[domain]);
    } else {
      setAvailableCourses([]);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, fatherName, mobile, email, district, course, message } = formData;
    
    const text = `*New Inquiry from Website*
Name: ${name}
Father's Name: ${fatherName}
Mobile: ${mobile}
Email: ${email}
State: ${selectedState}
District: ${district}
Domain: ${selectedDomain}
Course: ${course}
Message: ${message}`;

    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/919484794843?text=${encodedText}`, '_blank');
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <div className="contact-hero">
        <div className="container">
          <h1 className="contact-hero-title">Contact SkillServe Academy</h1>
          <p className="contact-hero-sub">— Book a Free Course Demo in Gurugram —</p>
        </div>
      </div>

      <div className="container contact-main-container">
        <div className="contact-grid">
          {/* Left Column: Form */}
          <div className="contact-form-col">
            <span className="contact-subtitle">APPLY FOR TRAINING</span>
            <h2 className="contact-form-title">Fill The Form Below To Apply For Our Courses</h2>
            
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Full Name *" required />
                </div>
                <div className="form-group">
                  <input type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} placeholder="Father's Name *" required />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile Number (10 digits)" pattern="[0-9]{10}" required />
                </div>
                <div className="form-group">
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your Email *" required />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <select value={selectedState} onChange={handleStateChange} required>
                    <option value="">Select State *</option>
                    {Object.keys(stateDistrictMap).sort().map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <select name="district" value={formData.district} onChange={handleChange} required disabled={!selectedState}>
                    <option value="">Select District *</option>
                    {districts.map(district => (
                      <option key={district} value={district}>{district}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <select value={selectedDomain} onChange={handleDomainChange} required>
                    <option value="">Select Domain *</option>
                    {domainsList.map(domain => (
                      <option key={domain} value={domain}>{domain}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <select name="course" value={formData.course} onChange={handleChange} required disabled={!selectedDomain}>
                    <option value="">Select a Course *</option>
                    {availableCourses.map(course => (
                      <option key={course} value={course}>{course}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group full-width">
                <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Your Message *" rows="4" required></textarea>
              </div>

              <button type="submit" className="contact-submit-btn">Submit Application</button>
            </form>
          </div>

          {/* Right Column: Info Cards */}
          <div className="contact-info-col">
            <div className="info-card">
              <div className="info-icon text-green"><MapPin size={28} /></div>
              <div className="info-text">
                <h4>Gurugram Center</h4>
                <p>Plot No, 98-C, Udhyog Vihar Phase VII, Sector 35, Gurugram, Haryana 122004</p>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon text-blue"><Phone size={28} /></div>
              <div className="info-text">
                <h4>Phone number</h4>
                <p>9484794843</p>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon text-orange"><Mail size={28} /></div>
              <div className="info-text">
                <h4>Send email</h4>
                <p>info@skillserve.in</p>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon text-orange"><Globe size={28} /></div>
              <div className="info-text">
                <h4>Training Hours</h4>
                <p>Monday - Saturday: 9:00 AM - 6:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
