import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Tag } from 'lucide-react';
import { blogs } from '../data/blogData';
import './BlogList.css';

const BlogList = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Calculate categories and their counts
  const categoryCounts = blogs.reduce((acc, blog) => {
    acc[blog.category] = (acc[blog.category] || 0) + 1;
    return acc;
  }, {});

  const categories = Object.keys(categoryCounts);

  // Filter blogs based on selection
  const filteredBlogs = selectedCategory === 'All' 
    ? blogs 
    : blogs.filter(blog => blog.category === selectedCategory);

  return (
    <div className="blog-list-page">
      <div className="blog-header-banner">
        <div className="container">
          <h1>Our Latest Insights</h1>
          <p>Stay updated with the latest trends in CNC, CAD-CAM, and Electric Vehicles.</p>
        </div>
      </div>

      <div className="container blog-list-container">
        {/* Left Side: Blogs */}
        <div className="blog-main-content">
          <div className="blog-list-header">
            <h2>{selectedCategory === 'All' ? 'All Blogs' : selectedCategory} <span>({filteredBlogs.length})</span></h2>
            <div className="blog-header-line"></div>
          </div>

          <div className="blog-list-wrapper">
            {filteredBlogs.map(blog => (
              <Link to={`/blog/${blog.id}`} key={blog.id} className="blog-list-card">
                <div className="blog-card-img-wrapper">
                  <img src={blog.image} alt={blog.title} className="blog-card-img" />
                </div>
                <div className="blog-card-info">
                  <h3>{blog.title.length > 55 ? blog.title.substring(0, 55) + '...' : blog.title}</h3>
                  <div className="blog-card-meta">
                    <span><Calendar size={13} /> {blog.date}</span>
                    <span><Clock size={13} /> {blog.readTime}</span>
                  </div>
                  <div className="blog-card-category">
                    <Tag size={13} /> {blog.category}
                  </div>
                  <div className="blog-card-badge">Currently Reading</div>
                </div>
              </Link>
            ))}
            
            {filteredBlogs.length === 0 && (
              <div className="no-blogs-found">
                No blogs found for this category.
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Sidebar */}
        <div className="blog-sidebar">
          <div className="sidebar-widget">
            <h3>Categories</h3>
            <ul className="sidebar-categories">
              <li 
                className={selectedCategory === 'All' ? 'active' : ''}
                onClick={() => setSelectedCategory('All')}
              >
                <span>All Categories</span>
                <span className="count">({blogs.length})</span>
              </li>
              {categories.map(cat => (
                <li 
                  key={cat}
                  className={selectedCategory === cat ? 'active' : ''}
                  onClick={() => setSelectedCategory(cat)}
                >
                  <span>{cat}</span>
                  <span className="count">({categoryCounts[cat]})</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogList;
