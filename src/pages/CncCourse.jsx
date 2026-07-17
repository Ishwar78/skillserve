import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, Star, ExternalLink } from 'lucide-react';
import './CncCourse.css';

const cncCourses = [
  {
    id: 1,
    img: '/cnc_op.png',
    badge: 'CNC, VMC & Manufacturing Skills',
    badgeColor: 'badge-orange',
    rating: 4.5,
    reviews: 172,
    title: 'CNC/ VMC Skilled Operator Course',
    duration: '45 Days',
    location: 'Gurugram',
    price: '₹24,999',
    titleColor: 'text-blue',
  },
  {
    id: 2,
    img: '/cnc_prog.png',
    badge: 'CNC, VMC & Manufacturing Skills',
    badgeColor: 'badge-green',
    rating: 4.5,
    reviews: 137,
    title: 'CNC/VMC Operations & Programming Professional...',
    duration: '2 months',
    location: 'Gurugram',
    price: '₹39,999',
    titleColor: 'text-orange',
  },
  {
    id: 3,
    img: '/cnc_adv.png',
    badge: 'CNC, VMC & Manufacturing Skills',
    badgeColor: 'badge-yellow',
    rating: 4.5,
    reviews: 128,
    title: 'Advanced CNC Programming; Siemens & Fanuc Specialization',
    duration: '15 Days',
    location: 'Gurugram',
    price: '₹15,399',
    titleColor: 'text-blue',
  },
  {
    id: 4,
    img: '/qc_insp.png',
    badge: 'CNC, VMC & Manufacturing Skills',
    badgeColor: 'badge-pink',
    rating: 4.5,
    reviews: 138,
    title: 'Quality Control Inspector',
    duration: '45 Days',
    location: 'Gurugram',
    price: '₹23,499',
    titleColor: 'text-blue',
  },
  {
    id: 5,
    img: '/qe_eng.png',
    badge: 'CNC, VMC & Manufacturing Skills',
    badgeColor: 'badge-teal',
    rating: 4.5,
    reviews: 235,
    title: 'Quality Engineer',
    duration: '2 months',
    location: 'Gurugram',
    price: '₹36,499',
    titleColor: 'text-orange',
  },
  {
    id: 6,
    img: '/prod_eng.png',
    badge: 'CNC, VMC & Manufacturing Skills',
    badgeColor: 'badge-orange',
    rating: 4.5,
    reviews: 143,
    title: 'Production Engineer',
    duration: '2 months',
    location: 'Gurugram',
    price: '₹36,499',
    titleColor: 'text-blue',
  },
];

const renderStars = (rating) => {
  return Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      size={13}
      className={i < Math.floor(rating) ? 'star filled' : 'star'}
      fill={i < Math.floor(rating) ? '#f59e0b' : 'none'}
      stroke={i < Math.floor(rating) ? '#f59e0b' : '#d1d5db'}
    />
  ));
};

const CncCourse = () => {
  return (
    <div className="cnc-page">
      <div className="container">
        <div className="cnc-header">
          <span className="subtitle">FEATURED COURSES</span>
          <h2 className="cnc-title">Pick A Course To Get Started</h2>
        </div>
        
        <div className="cnc-grid">
          {cncCourses.map((course) => (
            <Link to="/contact" key={course.id} className="cnc-card">
              <div className="cnc-img-wrapper">
                <img src={course.img} alt={course.title} className="cnc-img" />
              </div>
              <div className="cnc-body">
                <span className={`cnc-badge ${course.badgeColor}`}>
                  <span className="cnc-badge-dot">+</span> {course.badge}
                </span>
                
                <div className="cnc-rating-row">
                  <div className="cnc-stars">{renderStars(course.rating)}</div>
                  <span className="cnc-reviews">{course.reviews} reviews</span>
                </div>
                
                <h3 className={`cnc-course-title ${course.titleColor}`}>{course.title}</h3>
                
                <div className="cnc-meta">
                  <span className="cnc-meta-item">
                    <Clock size={13} /> {course.duration}
                  </span>
                  <span className="cnc-meta-item">
                    <MapPin size={13} /> {course.location}
                  </span>
                </div>
                
                <div className="cnc-footer">
                  <span className="cnc-enroll">Enroll Now <ExternalLink size={14} /></span>
                  <span className="cnc-price">{course.price}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CncCourse;
