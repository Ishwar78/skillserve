import React, { useState, useEffect } from "react";
import {
  useParams,
  Link,
  useNavigate,
} from "react-router-dom";

import {
  CalendarDays,
  Clock3,
  ArrowLeft,
  ArrowRight,
  Tag,
  UserRound,
  MessageCircle,
  BookOpenText,
  Sparkles,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  HelpCircle,
} from "lucide-react";

import { blogs } from "../data/blogData";
import api from "../utils/api";
import "./BlogDetail.css";

const getBlogKey = (item) => item?.slug || item?._id || item?.id;

const matchesBlog = (item, targetId) => {
  if (!item || !targetId) return false;
  const target = String(targetId).toLowerCase();
  return (
    (item.slug && item.slug.toLowerCase() === target) ||
    (item._id && String(item._id).toLowerCase() === target) ||
    (item.id && String(item.id).toLowerCase() === target)
  );
};

const formatBlogDate = (blogItem) => {
  if (blogItem?.date) return blogItem.date;
  if (blogItem?.createdAt) {
    return new Date(blogItem.createdAt).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  }
  return 'Recent';
};

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blogsList, setBlogsList] = useState(blogs);
  const [blog, setBlog] = useState(null);
  const [previousBlog, setPreviousBlog] = useState(null);
  const [nextBlog, setNextBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaqIndex((prev) => (prev === index ? -1 : index));
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await api.get('/blogs');
        if (data && data.length > 0) {
          setBlogsList(data);
        }
      } catch (error) {
        console.error('Failed to fetch blogs dynamically, using static fallback:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    const currentBlogIndex = blogsList.findIndex((item) => matchesBlog(item, id));

    const currentBlog = currentBlogIndex !== -1 ? blogsList[currentBlogIndex] : null;
    setBlog(currentBlog);
    setPreviousBlog(currentBlogIndex > 0 ? blogsList[currentBlogIndex - 1] : null);
    setNextBlog(currentBlogIndex >= 0 && currentBlogIndex < blogsList.length - 1 ? blogsList[currentBlogIndex + 1] : null);

    // Dynamic head injection for SEO Keywords and Description
    if (currentBlog) {
      document.title = `${currentBlog.title} | SkillServe Academy`;

      // Meta Description
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = "description";
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', currentBlog.metaDescription || "Read article from SkillServe Academy");

      // Meta Keywords
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.name = "keywords";
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', currentBlog.metaKeywords || "skills, learning, engineering");
    }
  }, [id, blogsList]);

  const otherBlogs = blogsList
    .filter((item) => !matchesBlog(item, id))
    .slice(0, 3);

  if (loading) {
    return (
      <main className="blog-detail-page" style={{ padding: '100px 0', textAlign: 'center' }}>
        <h2>Loading Blog Details...</h2>
      </main>
    );
  }

  if (!blog) {
    return (
      <main className="blog-detail-page">
        <section className="blog-detail-not-found">
          <div className="blog-not-found-icon">
            <BookOpenText size={42} />
          </div>

          <span>Article Not Found</span>

          <h1>Blog Not Found</h1>

          <p>
            The blog you are looking for may have been
            removed or the URL may be incorrect.
          </p>

          <button
            type="button"
            onClick={() => navigate("/blog")}
          >
            <ArrowLeft size={18} />
            Back To Blogs
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="blog-detail-page">
      {/* Hero Section */}
      <section className="blog-detail-hero">
        <div className="blog-detail-hero-shape blog-detail-shape-one" />
        <div className="blog-detail-hero-shape blog-detail-shape-two" />
        <div className="blog-detail-pattern" />

        <div className="container blog-detail-hero-container">
          <Link
            to="/blog"
            className="blog-detail-back-button"
          >
            <ArrowLeft size={16} />
            Back to all blogs
          </Link>

          <div className="blog-detail-category">
            <Tag size={14} />
            {blog.category}
          </div>

          <h1 className="blog-detail-title">
            {blog.title}
          </h1>

          <p className="blog-detail-introduction">
            Practical industry knowledge, career guidance
            and expert insights from SkillServe Academy.
          </p>

          <div className="blog-detail-meta">
            <div className="blog-detail-author">
              <div className="blog-author-avatar">
                {blog.author
                  ? blog.author.charAt(0).toUpperCase()
                  : "S"}
              </div>

              <div>
                <span className="blog-author-label">
                  Written By
                </span>

                <strong className="blog-author-name">
                  {blog.author}
                </strong>
              </div>
            </div>

            <div className="blog-meta-divider" />

            <div className="blog-meta-item">
              <CalendarDays size={16} />

              <div>
                <span>Published</span>
                <strong>{formatBlogDate(blog)}</strong>
              </div>
            </div>

            <div className="blog-meta-item">
              <Clock3 size={16} />

              <div>
                <span>Reading Time</span>
                <strong>{blog.readTime}</strong>
              </div>
            </div>

            <div className="blog-meta-item">
              <MessageCircle size={16} />

              <div>
                <span>Comments</span>
                <strong>
                  {blog.comments || 0}
                </strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Featured Image */}
      <section className="blog-detail-featured-section">
        <div className="container">
          <div className="blog-detail-hero-img">
            <img
              src={blog.image}
              alt={blog.title}
              onError={(event) => {
                event.currentTarget.src =
                  "/placeholder-image.png";
              }}
            />

            <div className="blog-image-overlay" />

            <div className="blog-image-content">
              <div className="blog-image-content-icon">
                <BookOpenText size={24} />
              </div>

              <div>
                <span>SkillServe Knowledge Hub</span>

                <strong>
                  Industry Insights &amp; Practical Learning
                </strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="blog-detail-content-section">
        <div className="container blog-detail-layout">
          {/* Left Article Content */}
          <article className="blog-detail-main">
            <div className="blog-detail-content-card">
              <div className="blog-content-topbar">
                <div>
                  <span>
                    <Sparkles size={15} />
                    Featured Article
                  </span>

                  <p>
                    Published by {blog.author}
                  </p>
                </div>

                <div className="blog-content-reading">
                  <Clock3 size={16} />
                  {blog.readTime}
                </div>
              </div>

              <div
                className="blog-html-content"
                dangerouslySetInnerHTML={{
                  __html: blog.content,
                }}
              />

              {/* Blog FAQs Accordion Section */}
              {Array.isArray(blog.faqs) && blog.faqs.length > 0 && (
                <div className="blog-detail-faqs-section">
                  <div className="blog-faqs-header">
                    <HelpCircle size={22} className="blog-faqs-icon" />
                    <h3>Frequently Asked Questions</h3>
                  </div>

                  <div className="blog-faqs-accordion">
                    {blog.faqs.map((faq, idx) => {
                      const isOpen = openFaqIndex === idx;
                      return (
                        <div
                          key={idx}
                          className={`blog-faq-item ${isOpen ? "faq-open" : ""}`}
                        >
                          <button
                            type="button"
                            className="blog-faq-question"
                            onClick={() => toggleFaq(idx)}
                          >
                            <span>{faq.question}</span>
                            <ChevronDown
                              size={18}
                              className={`faq-chevron ${isOpen ? "chevron-rotated" : ""}`}
                            />
                          </button>
                          {isOpen && (
                            <div className="blog-faq-answer">
                              <p>{faq.answer}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Previous and Next Navigation */}
            <nav className="blog-detail-navigation">
              {previousBlog ? (
                <Link
                  to={`/blog/${getBlogKey(previousBlog)}`}
                  className="blog-navigation-card blog-navigation-previous"
                >
                  <div className="blog-navigation-icon">
                    <ChevronLeft size={21} />
                  </div>

                  <div>
                    <span>Previous Article</span>

                    <h3>
                      {previousBlog.title.length > 65
                        ? `${previousBlog.title.substring(
                            0,
                            65
                          )}...`
                        : previousBlog.title}
                    </h3>
                  </div>
                </Link>
              ) : (
                <div className="blog-navigation-placeholder" />
              )}

              {nextBlog ? (
                <Link
                  to={`/blog/${getBlogKey(nextBlog)}`}
                  className="blog-navigation-card blog-navigation-next"
                >
                  <div>
                    <span>Next Article</span>

                    <h3>
                      {nextBlog.title.length > 65
                        ? `${nextBlog.title.substring(
                            0,
                            65
                          )}...`
                        : nextBlog.title}
                    </h3>
                  </div>

                  <div className="blog-navigation-icon">
                    <ChevronRight size={21} />
                  </div>
                </Link>
              ) : (
                <div className="blog-navigation-placeholder" />
              )}
            </nav>
          </article>

          {/* Right Sidebar */}
          <aside className="blog-detail-sidebar">
            {/* Article Details */}
            <div className="blog-sidebar-card">
              <div className="blog-sidebar-heading">
                <div className="blog-sidebar-heading-icon">
                  <BookOpenText size={21} />
                </div>

                <div>
                  <span>Article Overview</span>
                  <h3>Blog Information</h3>
                </div>
              </div>

              <div className="blog-sidebar-info-list">
                <div className="blog-sidebar-info-item">
                  <UserRound size={17} />

                  <div>
                    <span>Author</span>
                    <strong>{blog.author}</strong>
                  </div>
                </div>

                <div className="blog-sidebar-info-item">
                  <CalendarDays size={17} />

                  <div>
                    <span>Published Date</span>
                    <strong>{blog.date}</strong>
                  </div>
                </div>

                <div className="blog-sidebar-info-item">
                  <Clock3 size={17} />

                  <div>
                    <span>Reading Time</span>
                    <strong>{blog.readTime}</strong>
                  </div>
                </div>

                <div className="blog-sidebar-info-item">
                  <Tag size={17} />

                  <div>
                    <span>Category</span>
                    <strong>{blog.category}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Author Card */}
            <div className="blog-sidebar-card blog-sidebar-author-card">
              <div className="blog-sidebar-author-profile">
                <div className="blog-sidebar-author-avatar">
                  SA
                </div>

                <div>
                  <span>Published By</span>
                  <h3>{blog.author}</h3>
                </div>
              </div>

              <p>
                SkillServe Academy shares practical
                industry insights, technical knowledge and
                career guidance to help students build
                job-ready skills.
              </p>
            </div>

            {/* Sidebar CTA */}
            <div className="blog-sidebar-cta">
              <div className="blog-sidebar-cta-decoration" />

              <div className="blog-sidebar-cta-icon">
                <GraduationCap size={27} />
              </div>

              <span>Build Your Career</span>

              <h3>
                Learn Practical Skills From Industry Experts
              </h3>

              <p>
                Get expert course guidance and choose the
                right technical training programme for your
                career.
              </p>

             <a href="tel:+919484794843">
  Talk To An Expert: 
  <ArrowRight size={16} />
</a>
            </div>
          </aside>
        </div>
      </section>

      {/* Related Blogs */}
      {otherBlogs.length > 0 && (
        <section className="blog-recommendations-section">
          <div className="container">
            <div className="blog-recommendations-heading">
              <div>
                <span>
                  <BookOpenText size={15} />
                  Keep Learning
                </span>

                <h2>
                  Read More
                  <strong> Next</strong>
                </h2>

                <p>
                  Explore more practical industry insights
                  and career-focused articles.
                </p>
              </div>

              <Link to="/blog">
                View All Blogs
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="blog-recommendations">
              {otherBlogs.map((recommendedBlog) => (
                <Link
                  to={`/blog/${getBlogKey(recommendedBlog)}`}
                  key={getBlogKey(recommendedBlog)}
                  className="blog-recommend-card"
                >
                  <div className="blog-recommend-image">
                    <img
                      src={recommendedBlog.image}
                      alt={recommendedBlog.title}
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.src =
                          "/placeholder-image.png";
                      }}
                    />

                    <span>
                      <Tag size={12} />
                      {recommendedBlog.category}
                    </span>
                  </div>

                  <div className="blog-recommend-content">
                    <div className="recommend-meta">
                      <span>
                        <CalendarDays size={13} />
                        {recommendedBlog.date}
                      </span>

                      <span>
                        <Clock3 size={13} />
                        {recommendedBlog.readTime}
                      </span>
                    </div>

                    <h4>
                      {recommendedBlog.title}
                    </h4>

                    <div className="read-next-link">
                      Read Full Article
                      <ArrowRight size={15} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default BlogDetail;