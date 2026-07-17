import React, { useState } from 'react';
import { Cpu, BarChart2, Wrench, Box, Car, Zap, MessageSquare } from 'lucide-react';
import EnquiryModal from './EnquiryModal';
import './AboutUs.css';

const programmes = [
  { icon: <Cpu size={20} />, title: 'CNC, VMC & Manufacturing Excellence' },
  { icon: <BarChart2 size={20} />, title: 'Production & Quality Engineering' },
  { icon: <Wrench size={20} />, title: 'Maintenance Engineering' },
  { icon: <Box size={20} />, title: 'New Product Development (CAD, CAM & NX)' },
  { icon: <Car size={20} />, title: 'Electric Vehicles' },
  { icon: <Zap size={20} />, title: 'Industrial Automation (PLC & SCADA)' },
];

const AboutUs = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="about-us">
      <div className="about-bg-shape"></div>
      <div className="container about-inner">
        {/* Left: Image */}
        <div className="about-img-col">
          <div className="about-img-frame">
            <img src="/about_building.png" alt="SkillServe Academy Building" className="about-img" />
            <div className="about-img-badge">
              <span className="about-img-badge-num">10+</span>
              <span className="about-img-badge-text">Years of Excellence</span>
            </div>
          </div>
          <div className="about-enquiry-btn-container" style={{ textAlign: 'center', marginTop: '20px' }}>
            <button 
              onClick={() => setIsModalOpen(true)} 
              className="btn btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '16px 24px', fontSize: '16px', fontWeight: 'bold',borderRadius:"10px" }}
            >
              <MessageSquare size={18} /> Enquire Now
            </button>
          </div>
        </div>

        {/* Right: Content */}
        <div className="about-content-col">
          <span className="subtitle">ABOUT US</span>
          <h2 className="about-title">Who we are?</h2>
          <p className="about-desc">
            SkillServe Academy is India's Leading Technical Skill Academy, focused on practical,
            job-ready training rather than theory. Through a blended learning approach, SkillServe
            combines classroom learning, digital tools, and hands-on training in industry-simulated
            environments, aligned with Industry 4.0, LEAN, QMS, and Best Industrial Practices.
            Programmes are aligned with the National Credit Framework (NCrF), enabling learners to
            earn recognized, transferable credits. SkillServe bridges the gap between learning and
            employment through innovation and industry relevance.
          </p>
          <p className="about-offered-label">Offered Programmes :</p>
          <div className="about-programmes-grid">
            {programmes.map((prog, i) => (
              <div key={i} className="about-programme-item">
                <span className="about-prog-icon">{prog.icon}</span>
                <span className="about-prog-title">{prog.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <EnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default AboutUs;
