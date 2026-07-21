import React, { useState } from 'react';
import { X } from 'lucide-react';
import api from '../utils/api';
import './EnquiryModal.css';

const EnquiryModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', course: '' });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleWhatsappSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Save to Database
      await api.post("/inquiries", {
        name: formData.name,
        email: formData.email,
        mobile: formData.phone,
        course: formData.course,
        source: "Contact Form" // from Enquire Now Modal
      });

      // 2. Fetch Contact Settings
      const { data } = await api.get('/contact-info');
      const whatsappNumber = data.whatsappNumber || "919484794843";

      // 3. Open WhatsApp
      const msg = `Hello SkillServe,\nI have an enquiry.\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nCourse Interested In: ${formData.course}`;
      const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
      
      window.open(url, '_blank');
      setFormData({ name: '', email: '', phone: '', course: '' });
      onClose();
    } catch (error) {
      console.error("Failed to submit inquiry", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
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
          <button type="submit" className="form-submit-btn" disabled={loading}>
            {loading ? "Submitting..." : "Submit Enquiry"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EnquiryModal;
