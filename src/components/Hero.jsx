import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { allCourses } from '../data/coursesData';
import api, { baseURL } from '../utils/api';
import './Hero.css';

const DEFAULT_HERO_IMAGE = "https://images.unsplash.com/photo-1573164574572-cb89e39749b4?q=80&w=2069&auto=format&fit=crop";

const Hero = () => {
  const [query, setQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const [heroData, setHeroData] = useState({
    title: "Learn the Skills Top Companies Seek",
    subtitle: "Don't stay behind in this fast world — learn the skills that will get you employed in the AI era.",
    images: [DEFAULT_HERO_IMAGE]
  });

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const resolveImageUrl = (img) => {
    if (!img) return DEFAULT_HERO_IMAGE;
    if (img.startsWith('http')) return img;
    const cleanBase = (baseURL || '').replace(/\/+$/, '');
    const cleanPath = img.replace(/^\/+/, '');
    return cleanBase ? `${cleanBase}/${cleanPath}` : `/${cleanPath}`;
  };

  useEffect(() => {
    const fetchHeroInfo = async () => {
      try {
        const { data } = await api.get('/hero-info');
        if (data) {
          let resolvedImages = [];
          if (Array.isArray(data.images) && data.images.length > 0) {
            resolvedImages = data.images.map(resolveImageUrl);
          } else if (data.image) {
            resolvedImages = [resolveImageUrl(data.image)];
          } else {
            resolvedImages = [DEFAULT_HERO_IMAGE];
          }

          setHeroData({
            title: data.title || heroData.title,
            subtitle: data.subtitle || heroData.subtitle,
            images: resolvedImages
          });
        }
      } catch (error) {
        console.error('Failed to fetch Hero Info', error);
      }
    };
    fetchHeroInfo();
  }, []);

  // Automatic slide transition interval
  useEffect(() => {
    if (heroData.images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % heroData.images.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [heroData.images]);

  const handlePrevSlide = () => {
    setCurrentSlideIndex((prevIndex) =>
      prevIndex === 0 ? heroData.images.length - 1 : prevIndex - 1
    );
  };

  const handleNextSlide = () => {
    setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % heroData.images.length);
  };

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
            {heroData.title}
          </h1>
          
          <p className="hero-light-subtitle">
            {heroData.subtitle}
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
                    onClick={() => handleSelectCourse(course.slug || course.id)}
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

        {/* Right Side: Image Slider / Carousel */}
        <div className="hero-light-image-side">
          <div className="hero-light-image-wrapper hero-slider-container">
            {heroData.images.map((imgUrl, index) => (
              <img 
                key={index}
                src={imgUrl} 
                alt={`Hero Slide ${index + 1}`} 
                className={`hero-light-main-img hero-slide-img ${index === currentSlideIndex ? 'active-slide' : ''}`}
              />
            ))}

            {/* Slider Controls (Only if >1 image) */}
            {heroData.images.length > 1 && (
              <>
                {/* <button
                  className="hero-slider-arrow arrow-left"
                  onClick={handlePrevSlide}
                  aria-label="Previous Slide"
                >
                  <ChevronLeft size={22} />
                </button>
                
                <button
                  className="hero-slider-arrow arrow-right"
                  onClick={handleNextSlide}
                  aria-label="Next Slide"
                >
                  <ChevronRight size={22} />
                </button> */}

                <div className="hero-slider-dots">
                  {heroData.images.map((_, index) => (
                    <span
                      key={index}
                      className={`hero-slider-dot ${index === currentSlideIndex ? 'active-dot' : ''}`}
                      onClick={() => setCurrentSlideIndex(index)}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
