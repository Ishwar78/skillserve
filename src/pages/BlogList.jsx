import React, { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  ArrowRight,
  ArrowUpRight,
  BookOpenText,
  CalendarDays,
  Clock3,
  Layers3,
  SearchX,
  Sparkles,
  Tag,
} from "lucide-react";

import { blogs } from "../data/blogData";
import api from "../utils/api";
import "./BlogList.css";

const BlogList = () => {
  const [selectedCategory, setSelectedCategory] =
    useState("All");
  const [blogsList, setBlogsList] = useState(blogs);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await api.get('/blogs');
        if (data && data.length > 0) {
          setBlogsList(data);
        }
      } catch (error) {
        console.error('Failed to fetch blogs dynamically, using static fallback:', error);
      }
    };
    fetchBlogs();
  }, []);

  /*
   * Category names and total blog counts
   */
  const categoryCounts = useMemo(() => {
    return blogsList.reduce((accumulator, blog) => {
      const category =
        blog.category || "Other";

      accumulator[category] =
        (accumulator[category] || 0) + 1;

      return accumulator;
    }, {});
  }, [blogsList]);

  const categories = useMemo(() => {
    return Object.keys(categoryCounts).sort();
  }, [categoryCounts]);

  /*
   * Selected category ke according blogs filter honge
   */
  const filteredBlogs = useMemo(() => {
    if (selectedCategory === "All") {
      return blogsList;
    }

    return blogsList.filter(
      (blog) =>
        blog.category === selectedCategory
    );
  }, [selectedCategory, blogsList]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);

    window.requestAnimationFrame(() => {
      const blogSection =
        document.querySelector(
          ".blog-content-section"
        );

      if (blogSection) {
        const sectionTop =
          blogSection.getBoundingClientRect().top +
          window.scrollY -
          90;

        window.scrollTo({
          top: sectionTop,
          behavior: "smooth",
        });
      }
    });
  };

  return (
    <main className="blog-list-page">
      {/* Hero Section */}
      <section className="blog-header-banner">
        <div className="blog-hero-shape blog-hero-shape-one" />
        <div className="blog-hero-shape blog-hero-shape-two" />
        <div className="blog-hero-pattern" />

        <div className="container blog-hero-container">
          <span className="blog-hero-badge">
            <Sparkles size={16} />
            SkillServe Knowledge Hub
          </span>

          <h1>
            Explore Our Latest
            <span> Insights</span>
          </h1>

          <p>
            Stay informed with practical insights,
            industry trends and career-focused knowledge
            across CNC, CAD-CAM, automation, electric
            vehicles and modern technologies.
          </p>

          <div className="blog-hero-stats">
            <div className="blog-hero-stat">
              <BookOpenText size={21} />

              <div>
                <strong>{blogs.length}</strong>
                <span>Published Articles</span>
              </div>
            </div>

            <div className="blog-hero-stat">
              <Layers3 size={21} />

              <div>
                <strong>{categories.length}</strong>
                <span>Knowledge Categories</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Main Content */}
      <section className="blog-content-section">
        <div className="container blog-list-container">
          {/* Left Side Blogs */}
          <div className="blog-main-content">
            <div className="blog-list-header">
              <div>
                <span className="blog-section-label">
                  <BookOpenText size={15} />
                  Latest Articles
                </span>

                <h2>
                  {selectedCategory === "All"
                    ? "Explore All Blogs"
                    : selectedCategory}
                </h2>

                <p>
                  Showing{" "}
                  <strong>
                    {filteredBlogs.length}
                  </strong>{" "}
                  {filteredBlogs.length === 1
                    ? "article"
                    : "articles"}
                </p>
              </div>

              {selectedCategory !== "All" && (
                <button
                  type="button"
                  className="blog-clear-filter"
                  onClick={() =>
                    handleCategoryChange("All")
                  }
                >
                  Clear Filter
                </button>
              )}
            </div>

            {filteredBlogs.length > 0 ? (
              <div className="blog-list-wrapper">
                {filteredBlogs.map(
                  (blog, index) => (
                    <article
                      key={blog._id || blog.id}
                      className={`blog-list-card ${
                        index === 0
                          ? "blog-first-card"
                          : ""
                      }`}
                    >
                      <Link
                        to={`/blog/${blog.slug || blog._id || blog.id}`}
                        className="blog-card-link"
                        aria-label={`Read ${blog.title}`}
                      >
                        {/* Blog Image */}
                        <div className="blog-card-img-wrapper">
                          <img
                            src={blog.image}
                            alt={blog.title}
                            className="blog-card-img"
                            loading="lazy"
                            onError={(event) => {
                              event.currentTarget.src =
                                "/placeholder-image.png";
                            }}
                          />

                          <div className="blog-image-overlay" />

                          <div className="blog-card-category">
                            <Tag size={13} />
                            {blog.category}
                          </div>

                          {index === 0 && (
                            <div className="blog-featured-badge">
                              <Sparkles size={13} />
                              Featured
                            </div>
                          )}
                        </div>

                        {/* Blog Information */}
                        <div className="blog-card-info">
                          <div className="blog-card-meta">
                            <span>
                              <CalendarDays
                                size={14}
                              />
                              {blog.date}
                            </span>

                            <span>
                              <Clock3 size={14} />
                              {blog.readTime}
                            </span>
                          </div>

                          <h3>{blog.title}</h3>

                          <p className="blog-card-description">
                            Discover useful insights,
                            practical knowledge and
                            industry updates from SkillServe
                            Academy.
                          </p>

                          <div className="blog-card-footer">
                            <span className="blog-read-more">
                              Read Full Article
                              <ArrowRight size={16} />
                            </span>

                            <span className="blog-open-icon">
                              <ArrowUpRight size={18} />
                            </span>
                          </div>
                        </div>
                      </Link>
                    </article>
                  )
                )}
              </div>
            ) : (
              <div className="no-blogs-found">
                <div className="no-blogs-icon">
                  <SearchX size={34} />
                </div>

                <h3>No Blogs Found</h3>

                <p>
                  No articles are currently available in
                  this category.
                </p>

                <button
                  type="button"
                  onClick={() =>
                    handleCategoryChange("All")
                  }
                >
                  View All Blogs
                  <ArrowRight size={16} />
                </button>
              </div>
            )}
          </div>

          {/* Right Side Sidebar */}
          <aside className="blog-sidebar">
            <div className="sidebar-widget">
              <div className="sidebar-widget-header">
                <div className="sidebar-widget-icon">
                  <Layers3 size={21} />
                </div>

                <div>
                  <span>Browse Topics</span>
                  <h3>Blog Categories</h3>
                </div>
              </div>

              <ul className="sidebar-categories">
                <li>
                  <button
                    type="button"
                    className={
                      selectedCategory === "All"
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      handleCategoryChange("All")
                    }
                  >
                    <span className="sidebar-category-name">
                      <span className="sidebar-category-dot" />
                      All Categories
                    </span>

                    <span className="count">
                      {blogs.length}
                    </span>
                  </button>
                </li>

                {categories.map((category) => (
                  <li key={category}>
                    <button
                      type="button"
                      className={
                        selectedCategory ===
                        category
                          ? "active"
                          : ""
                      }
                      onClick={() =>
                        handleCategoryChange(
                          category
                        )
                      }
                    >
                      <span className="sidebar-category-name">
                        <span className="sidebar-category-dot" />
                        {category}
                      </span>

                      <span className="count">
                        {categoryCounts[category]}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sidebar CTA */}
            <div className="blog-list-sidebar-cta">
  <div className="blog-list-sidebar-cta-icon">
                <BookOpenText size={25} />
              </div>

              <span>Build Your Future</span>

              <h3>
                Learn Practical Industry Skills
              </h3>

              <p>
                Explore SkillServe&apos;s career-focused
                training programmes and choose the right
                course for your goals.
              </p>

              <a href="tel:+919484794843">
  <span>
    Talk To An Expert
  
  </span>

  <ArrowRight size={16} />
</a>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
};

export default BlogList;