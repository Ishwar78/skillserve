import React, { useState, useEffect } from 'react';
import { stateDistrictMap, domainCourseMap, domainsList } from '../data/locations';
import { X } from 'lucide-react';
import './InquiryPopup.css';

const InquiryPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
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

  useEffect(() => {
    // Show popup shortly after website loads
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => setIsOpen(false);

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
    setFormData({ ...formData, course: '' });
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
    
    const text = `*New Popup Inquiry from Website*
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
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="popup-close" onClick={handleClose}>
          <X size={24} />
        </button>
        <h2 className="popup-title">Enquire Now</h2>
        <p className="popup-subtitle">Fill out the form below and we will get back to you.</p>
        
        <form className="popup-form" onSubmit={handleSubmit}>
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
            <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Your Message *" rows="3" required></textarea>
          </div>

          <button type="submit" className="popup-submit-btn">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default InquiryPopup;
