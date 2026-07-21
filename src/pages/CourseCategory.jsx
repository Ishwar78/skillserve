import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Clock, MapPin, Star, ExternalLink } from 'lucide-react';
import { coursesData } from '../data/coursesData';
import api from '../utils/api';
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
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryCourses = async () => {
      try {
        const { data } = await api.get(`/courses/category/${categoryId}`);
        if (data && data.length > 0) {
          setCourses(data);
        } else {
          setCourses(coursesData[categoryId] || []);
        }
      } catch (error) {
        console.error('Error fetching category courses:', error);
        setCourses(coursesData[categoryId] || []);
      } finally {
        setLoading(false);
      }
    };
    fetchCategoryCourses();
  }, [categoryId]);

  if (loading) {
    return (
      <div className="course-cat-page container" style={{ padding: '100px 0', textAlign: 'center' }}>
        <h2>Loading Courses...</h2>
      </div>
    );
  }

  if (!courses || courses.length === 0) {
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
          {courses.map((course) => {
            const courseLink = `/course/${course.slug || course._id || course.id}`;
            return (
              <Link to={courseLink} key={course._id || course.id} className="course-cat-card">
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
          );
        })}
        </div>
      </div>
    </div>
  );
};

export default CourseCategory;
