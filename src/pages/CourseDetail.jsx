import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Clock, MapPin, Star, CheckCircle, BookOpen, Award, ArrowLeft } from 'lucide-react';
import { allCourses } from '../data/coursesData';
import './CourseDetail.css';

const renderStars = (rating) => {
  return Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      size={16}
      className={i < Math.floor(rating) ? 'star filled' : 'star'}
      fill={i < Math.floor(rating) ? '#f59e0b' : 'none'}
      stroke={i < Math.floor(rating) ? '#f59e0b' : '#d1d5db'}
    />
  ));
};

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  
  // Find course by ID (ensure type matching if necessary)
  const course = allCourses.find(c => c.id.toString() === courseId);

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [courseId]);

  if (!course) {
    return (
      <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
        <h2>Course Not Found</h2>
        <Link to="/" style={{ color: '#f26522' }}>Return Home</Link>
      </div>
    );
  }

  return (
    <div className="course-detail-page">
      {/* Hero Section */}
      <div className="cd-hero">
        <div className="cd-hero-overlay"></div>
        <div className="container cd-hero-content">
          <button onClick={() => navigate(-1)} className="cd-back-btn">
            <ArrowLeft size={16} /> Back to Courses
          </button>
          
          <div className={`cd-badge ${course.badgeColor}`}>
            {course.badge}
          </div>
          
          <h1 className="cd-title">{course.title}</h1>
          
          <div className="cd-hero-meta">
            <div className="cd-rating">
              <div className="cd-stars">{renderStars(course.rating)}</div>
              <span>({course.reviews} reviews)</span>
            </div>
            <div className="cd-meta-item">
              <Clock size={16} /> {course.duration}
            </div>
            <div className="cd-meta-item">
              <MapPin size={16} /> {course.location}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container cd-main-container">
        <div className="cd-grid">
          
          {/* Left Column: Details */}
          <div className="cd-content-col">
            <section className="cd-section">
              <h2 className="cd-section-title">Course Overview</h2>
              <p className="cd-overview-text">{course.overview}</p>
            </section>

            <section className="cd-section">
              <h2 className="cd-section-title">What You'll Learn</h2>
              <div className="cd-curriculum">
                {course.curriculum.map((mod, idx) => (
                  <div key={idx} className="cd-module">
                    <div className="cd-module-icon"><BookOpen size={20} /></div>
                    <div className="cd-module-text">
                      <h4>{mod.title}</h4>
                      <p>{mod.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Sticky Enrollment Card */}
          <div className="cd-sidebar-col">
            <div className="cd-enroll-card">
              <div className="cd-card-img-wrapper">
                <img src={course.img} alt={course.title} className="cd-card-img" />
              </div>
              
              <div className="cd-card-body">
                <div className="cd-price-row">
                  <span className="cd-price-label">Course Fee:</span>
                  <span className="cd-price-value">{course.price}</span>
                </div>
                
                <Link to="/contact" className="cd-apply-btn">Apply Now</Link>
                <p className="cd-guarantee">30-Day Money-Back Guarantee</p>
                
                <div className="cd-features-list">
                  <h4 className="cd-features-title">This course includes:</h4>
                  <ul>
                    {course.features.map((feat, idx) => (
                      <li key={idx}>
                        <CheckCircle size={16} className="text-green" /> {feat}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
