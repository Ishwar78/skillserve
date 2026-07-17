import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Clock, MapPin, Star, ExternalLink } from 'lucide-react';
import { coursesData } from '../data/coursesData';
import './CourseCategory.css';

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

const CourseCategory = () => {
  const { categoryId } = useParams();
  const courses = coursesData[categoryId];

  if (!courses) {
    return (
      <div className="course-cat-page container" style={{ padding: '100px 0', textAlign: 'center' }}>
        <h2>Category Not Found</h2>
        <Link to="/" style={{ color: '#f26522' }}>Return Home</Link>
      </div>
    );
  }

  return (
    <div className="course-cat-page">
      <div className="container">
        <div className="course-cat-header">
          <span className="subtitle">FEATURED COURSES</span>
          <h2 className="course-cat-title">Pick A Course To Get Started</h2>
        </div>
        
        <div className="course-cat-grid">
          {courses.map((course) => (
            <Link to={`/course/${course.id}`} key={course.id} className="course-cat-card">
              <div className="course-cat-img-wrapper">
                <img src={course.img} alt={course.title} className="course-cat-img" />
              </div>
              <div className="course-cat-body">
                <span className={`course-cat-badge ${course.badgeColor}`}>
                  <span className="course-cat-badge-dot">+</span> {course.badge}
                </span>
                
                <div className="course-cat-rating-row">
                  <div className="course-cat-stars">{renderStars(course.rating)}</div>
                  <span className="course-cat-reviews">{course.reviews} reviews</span>
                </div>
                
                <h3 className={`course-cat-course-title ${course.titleColor}`}>{course.title}</h3>
                
                <div className="course-cat-meta">
                  <span className="course-cat-meta-item">
                    <Clock size={13} /> {course.duration}
                  </span>
                  <span className="course-cat-meta-item">
                    <MapPin size={13} /> {course.location}
                  </span>
                </div>
                
                <div className="course-cat-footer">
                  <span className="course-cat-enroll">Enroll Now <ExternalLink size={14} /></span>
                  <span className="course-cat-price">{course.price}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseCategory;
