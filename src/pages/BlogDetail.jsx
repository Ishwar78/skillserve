import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, ArrowRight, Tag } from 'lucide-react';
import { blogs } from '../data/blogData';
import './BlogDetail.css';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const blogId = parseInt(id, 10);
  const blog = blogs.find(b => b.id === blogId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [blogId]);

  if (!blog) {
    return (
      <div className="blog-not-found">
        <h2>Blog Not Found</h2>
        <button onClick={() => navigate('/blog')} className="btn btn-primary">Back to Blogs</button>
      </div>
    );
  }

  // Find other blogs to recommend
  const otherBlogs = blogs.filter(b => b.id !== blogId).slice(0, 2);

  return (
    <div className="blog-detail-page">
      <div className="container blog-detail-container">
        
        <div className="blog-detail-header">
          <Link to="/blog" className="blog-back-btn">
            <ArrowLeft size={16} /> Back to all blogs
          </Link>
          <div className="blog-detail-category">
            <Tag size={14} /> {blog.category}
          </div>
          <h1 className="blog-detail-title">{blog.title}</h1>
          
          <div className="blog-detail-meta">
            <div className="blog-author-info">
              <div className="author-avatar">S</div>
              <div>
                <span className="author-name">{blog.author}</span>
                <span className="author-date">{blog.date}</span>
              </div>
            </div>
            <div className="blog-reading-time">
              <Clock size={15} /> {blog.readTime}
            </div>
          </div>
        </div>

        <div className="blog-detail-hero-img">
          <img src={blog.image} alt={blog.title} />
        </div>

        <div className="blog-detail-content">
          <div 
            className="blog-html-content"
            dangerouslySetInnerHTML={{ __html: blog.content }} 
          />
        </div>

        <div className="blog-detail-footer">
          <hr />
          <h3>Read More Next</h3>
          <div className="blog-recommendations">
            {otherBlogs.map(ob => (
              <Link to={`/blog/${ob.id}`} key={ob.id} className="blog-recommend-card">
                <h4>{ob.title.length > 50 ? ob.title.substring(0, 50) + '...' : ob.title}</h4>
                <div className="recommend-meta">
                  <span>{ob.category}</span> • <span>{ob.readTime}</span>
                </div>
                <div className="read-next-link">Read Article <ArrowRight size={14} /></div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default BlogDetail;
