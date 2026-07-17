import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, Star } from 'lucide-react';
import './FeaturedCourses.css';

const courses = [
  {
    id: 1,
    img: '/course_cnc.png',
    badge: 'CNC, VMC & Manufacturing Skills',
    badgeColor: 'badge-orange',
    rating: 4.5,
    reviews: 172,
    title: 'CNC/VMC Operations & Programming Course',
    duration: '15-60 Days',
    location: 'Gurugram',
    link: '/courses/cnc-programming-course'
  },
  {
    id: 2,
    img: '/course_plc.png',
    badge: 'PLC Automation',
    badgeColor: 'badge-green',
    rating: 4.5,
    reviews: 137,
    title: 'Industry 4.0 : Basic to Advance',
    duration: '60-90 Days',
    location: 'Gurugram',
    link: '/courses/plc-scada-course'
  },
  {
    id: 3,
    img: '/course_cad.png',
    badge: 'CAD-CAM Designing',
    badgeColor: 'badge-yellow',
    rating: 4.5,
    reviews: 128,
    title: 'Design & Development Engineer',
    duration: '10-60 Days',
    location: 'Gurugram',
    link: '/courses/cad-cam-course'
  },
  {
    id: 4,
    img: '/course_ev.png',
    badge: 'Electric Vehicle',
    badgeColor: 'badge-teal',
    rating: 4.0,
    reviews: 139,
    title: '2/3 Wheeler Repair & Maintenance',
    duration: '20-60 Days',
    location: 'Gurugram',
    link: '/courses/electric-vehicle-course'
  },
  {
    id: 5,
    img: '/course_digital.png',
    badge: 'Digital Marketing with AI',
    badgeColor: 'badge-blue',
    rating: 5.0,
    reviews: 275,
    title: 'Artificial Intelligence & Machine Learning AI-ML',
    duration: '30-60 Days',
    location: 'Gurugram',
    link: '/courses/digital-marketing-course'
  },
  {
    id: 6,
    img: '/course_electronics.png',
    badge: 'Electronics & Robotics',
    badgeColor: 'badge-orange',
    rating: 4.5,
    reviews: 143,
    title: 'Electronics Systems Design and Robotics',
    duration: '30 Days',
    location: 'Gurugram',
    link: '/courses/electronics-robotics-course'
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

const FeaturedCourses = () => {
  return (
    <section className="featured-courses">
      <div className="container">
        <div className="fc-header">
          <span className="subtitle">FEATURED COURSES</span>
          <h2 className="fc-title">Pick A Course To Get Started</h2>
        </div>
        <div className="fc-grid">
          {courses.map((course) => (
            <Link to={course.link} key={course.id} className="fc-card" style={{ textDecoration: 'none' }}>
              <div className="fc-img-wrapper">
                <img src={course.img} alt={course.title} className="fc-img" />
                <span className={`fc-badge ${course.badgeColor}`}>
                  <span className="fc-badge-dot">+</span> {course.badge}
                </span>
              </div>
              <div className="fc-body">
                <div className="fc-rating-row">
                  <div className="fc-stars">{renderStars(course.rating)}</div>
                  <span className="fc-reviews">{course.reviews} reviews</span>
                </div>
                <h3 className="fc-course-title" style={{ color: '#1a1b4b' }}>{course.title}</h3>
                <div className="fc-meta">
                  <span className="fc-meta-item">
                    <Clock size={13} /> {course.duration}
                  </span>
                  <span className="fc-meta-item">
                    <MapPin size={13} /> {course.location}
                  </span>
                </div>
                <span className="fc-explore">Explore More →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
