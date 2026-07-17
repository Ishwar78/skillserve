import React, { useState } from 'react';
import { X } from 'lucide-react';
import './EnquiryModal.css';

const EnquiryModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', course: '' });

  if (!isOpen) return null;

  const handleWhatsappSubmit = (e) => {
    e.preventDefault();
    const msg = `Hello SkillServe,\nI have an enquiry.\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nCourse Interested In: ${formData.course}`;
    const url = `https://wa.me/919484794843?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
    onClose();
  };

  return (
    <div className="enquiry-modal-overlay" onClick={onClose}>
      <div className="enquiry-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="enquiry-modal-close" onClick={onClose}>
          <X size={24} />
        </button>
        
        <div className="enquiry-modal-header">
          <h2>Enquire Now</h2>
          <p>Fill out the form below and we will get back to you shortly.</p>
        </div>

        <form onSubmit={handleWhatsappSubmit} className="enquiry-modal-form">
          <div className="form-group">
            <input 
              type="text" 
              placeholder="Enter Full Name" 
              required 
              value={formData.name} 
              onChange={e => setFormData({...formData, name: e.target.value})} 
            />
          </div>
          <div className="form-group">
            <input 
              type="email" 
              placeholder="Enter Email Address" 
              required 
              value={formData.email} 
              onChange={e => setFormData({...formData, email: e.target.value})} 
            />
          </div>
          <div className="form-group">
            <input 
              type="tel" 
              placeholder="Enter Mobile Number" 
              required 
              value={formData.phone} 
              onChange={e => setFormData({...formData, phone: e.target.value})} 
            />
          </div>
          <div className="form-group">
            <input 
              type="text" 
              placeholder="Course Interested In" 
              required 
              value={formData.course} 
              onChange={e => setFormData({...formData, course: e.target.value})} 
            />
          </div>
          <button type="submit" className="form-submit-btn">Submit Enquiry</button>
        </form>
      </div>
    </div>
  );
};

export default EnquiryModal;
