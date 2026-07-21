import React, { useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { LayoutDashboard, Users, BookOpen, Settings, Tags, Star, LogOut, Phone, MessageSquare, FileText, Info, Monitor } from 'lucide-react';
import '../../pages/admin/admin.css';

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const adminInfo = JSON.parse(localStorage.getItem('adminInfo'));

  useEffect(() => {
    if (!adminInfo) {
      navigate('/admin');
    }
  }, [navigate, adminInfo]);

  const logoutHandler = () => {
    localStorage.removeItem('adminInfo');
    navigate('/admin');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="admin-dashboard-container">
      <header className="admin-header">
        <div className="admin-header-brand">
          <h2>SkillServe<span className="text-primary">Admin</span></h2>
        </div>
        <div className="admin-header-right">
          <div className="admin-profile">
            <div className="admin-avatar">{adminInfo?.email?.charAt(0).toUpperCase()}</div>
            <span>{adminInfo?.email}</span>
          </div>
          <button onClick={logoutHandler} className="logout-btn">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </header>
      
      <main className="admin-main">
        <div className="admin-sidebar">
          <ul>
            <li className={isActive('/admin/dashboard') ? 'active' : ''} onClick={() => navigate('/admin/dashboard')}>
              <LayoutDashboard size={20} /> <span>Dashboard</span>
            </li>
          
            <li className={isActive('/admin/courses') ? 'active' : ''} onClick={() => navigate('/admin/courses')}>
              <BookOpen size={20} /> <span>Courses</span>
            </li>
            <li className={isActive('/admin/categories') ? 'active' : ''} onClick={() => navigate('/admin/categories')}>
              <Tags size={20} /> <span>Categories</span>
            </li>
            <li className={isActive('/admin/reviews') ? 'active' : ''} onClick={() => navigate('/admin/reviews')}>
              <Star size={20} /> <span>Reviews</span>
            </li>
            <li className={isActive('/admin/contact') ? 'active' : ''} onClick={() => navigate('/admin/contact')}>
              <Phone size={20} /> <span>Contact Info</span>
            </li>
            <li className={isActive('/admin/inquiries') ? 'active' : ''} onClick={() => navigate('/admin/inquiries')}>
              <MessageSquare size={20} /> <span>Inquiries</span>
            </li>
            <li className={isActive('/admin/blogs') ? 'active' : ''} onClick={() => navigate('/admin/blogs')}>
              <FileText size={20} /> <span>Blogs</span>
            </li>
            <li className={isActive('/admin/about') ? 'active' : ''} onClick={() => navigate('/admin/about')}>
              <Info size={20} /> <span>About Info</span>
            </li>
            <li className={isActive('/admin/hero') ? 'active' : ''} onClick={() => navigate('/admin/hero')}>
              <Monitor size={20} /> <span>Hero Section</span>
            </li>
            {/* <li className="sidebar-divider"></li>
            <li><Settings size={20} /> <span>Settings</span></li> */}
          </ul>
        </div>
        
        <div className="admin-content">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
