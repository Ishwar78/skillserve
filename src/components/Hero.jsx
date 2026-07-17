import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { allCourses } from '../data/coursesData';
import './Hero.css';

const Hero = () => {
  const [query, setQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  // Filter courses based on search query
  const searchResults = allCourses.filter(course => 
    course.title.toLowerCase().includes(query.toLowerCase()) || 
    course.badge.toLowerCase().includes(query.toLowerCase())
  );

  const handleSearch = (e) => {
    setQuery(e.target.value);
    if (e.target.value.length > 0) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  const handleSelectCourse = (courseId) => {
    setShowDropdown(false);
    setQuery('');
    navigate(`/course/${courseId}`);
  };

  return (
    <section className="hero-light-redesign">
      <div className="hero-light-bg-glow"></div>
      
      <div className="container hero-light-grid">
        
        {/* Left Side: Content & Search */}
        <div className="hero-light-text-side">
          
          <h1 className="hero-light-title">
            Learn the Skills Top Companies Seek
          </h1>
          
          <p className="hero-light-subtitle">
            Don't stay behind in this fast world — learn the skills that will get you employed in the AI era.
          </p>

          {/* Search Bar Container */}
          <div className="hero-light-search-box">
            <div className="hero-light-search-wrapper">
              <Search className="hero-light-search-icon" size={22} />
              <input 
                type="text" 
                placeholder="Search courses, skills, or domains..." 
                className="hero-light-search-input"
                value={query}
                onChange={handleSearch}
                onFocus={() => query.length > 0 && setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
              />
              <button className="hero-light-search-btn">Search</button>
            </div>
            
            {/* Search Dropdown */}
            {showDropdown && searchResults.length > 0 && (
              <div className="hero-light-search-dropdown">
                {searchResults.map(course => (
                  <div 
                    key={course.id} 
                    className="hero-light-search-item"
                    onClick={() => handleSelectCourse(course.id)}
                  >
                    <img src={course.img} alt={course.title} className="hero-light-search-item-img" />
                    <div className="hero-light-search-item-info">
                      <h4>{course.title}</h4>
                      <span>{course.badge}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {showDropdown && query.length > 0 && searchResults.length === 0 && (
              <div className="hero-light-search-dropdown">
                <div className="hero-light-search-empty">No courses found matching "{query}"</div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Professionals Image */}
        <div className="hero-light-image-side">
          <div className="hero-light-image-wrapper">
            <img 
              src="https://images.unsplash.com/photo-1573164574572-cb89e39749b4?q=80&w=2069&auto=format&fit=crop" 
              alt="Industry Professionals" 
              className="hero-light-main-img"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
