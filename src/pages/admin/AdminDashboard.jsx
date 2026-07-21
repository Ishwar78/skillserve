import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import api from "../../utils/api";
import { Link } from "react-router-dom";

import {
  MessageSquare,
  BookOpen,
  Tags,
  Star,
  ShieldCheck,
  Sparkles,
  LayoutDashboard,
  ArrowRight
} from "lucide-react";

import "./admin.css";

const AdminDashboard = () => {
  const [inquiries, setInquiries] = useState([]);
  const [coursesCount, setCoursesCount] = useState(0);
  const [categoriesCount, setCategoriesCount] = useState(0);
  const [reviewsCount, setReviewsCount] = useState(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [inqRes, coursesRes, catRes, revRes] = await Promise.all([
          api.get("/inquiries"),
          api.get("/courses"),
          api.get("/categories"),
          api.get("/reviews"),
        ]);

        if (inqRes.data && Array.isArray(inqRes.data)) {
          // Sort inquiries so newest are first
          const sortedInquiries = inqRes.data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setInquiries(sortedInquiries);
        }

        if (coursesRes.data && Array.isArray(coursesRes.data)) setCoursesCount(coursesRes.data.length);
        if (catRes.data && Array.isArray(catRes.data)) setCategoriesCount(catRes.data.length);
        if (revRes.data && Array.isArray(revRes.data)) setReviewsCount(revRes.data.length);

      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      }
    };
    fetchDashboardData();
  }, []);

  // Calculate "New" inquiries (e.g. from the last 7 days)
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const newInquiriesCount = inquiries.filter(inq => new Date(inq.createdAt) > oneWeekAgo).length;

  const stats = [
    {
      id: 1,
      title: "New Inquiries",
      value: newInquiriesCount > 0 ? newInquiriesCount : inquiries.length,
      description: newInquiriesCount > 0 ? "New inquiries this week" : "Total received inquiries",
      icon: MessageSquare,
      className: "users-stat", // Reusing the style class for color
    },
    {
      id: 2,
      title: "Total Courses",
      value: coursesCount,
      description: "Published academy courses",
      icon: BookOpen,
      className: "courses-stat",
    },
    {
      id: 3,
      title: "Categories",
      value: categoriesCount,
      description: "Active course categories",
      icon: Tags,
      className: "categories-stat",
    },
    {
      id: 4,
      title: "Reviews",
      value: reviewsCount,
      description: "Student success stories",
      icon: Star,
      className: "reviews-stat",
    },
  ];

  return (
    <AdminLayout>
      <div className="admin-dashboard-page">
        {/* Welcome Hero */}
        <section className="admin-welcome-panel">
          <div className="admin-welcome-decoration admin-decoration-one" />
          <div className="admin-welcome-decoration admin-decoration-two" />

          <div className="admin-welcome-content">
            <div className="admin-eyebrow">
              <Sparkles size={16} />
              <span>SkillServe Administration</span>
            </div>

            <h1>
              Welcome to the
              <span> Admin Panel</span>
            </h1>

            <p>
              Manage inquiries, courses, categories and student reviews from one
              powerful dashboard.
            </p>
          </div>

          <div className="admin-welcome-badge">
            <div className="admin-welcome-badge-icon">
              <ShieldCheck size={28} />
            </div>

            <div>
              <span>Admin Access</span>
              <strong>Secure &amp; Active</strong>
            </div>
          </div>
        </section>

        {/* Page Heading */}
        <div className="admin-content-header admin-dashboard-heading">
          <div>
            <span className="admin-section-label">
              <LayoutDashboard size={15} />
              Dashboard Overview
            </span>

            <h2>Platform Statistics</h2>

            <p>
              A quick overview of your academy platform and its available
              content.
            </p>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="stats-grid">
          {stats.map((stat) => {
            const IconComponent = stat.icon;

            return (
              <article
                key={stat.id}
                className={`stat-card ${stat.className}`}
              >
                <div className="stat-card-top">
                  <div className="stat-icon">
                    <IconComponent size={25} strokeWidth={2.1} />
                  </div>

                  <span className="stat-status-dot" />
                </div>

                <div className="stat-details">
                  <h3>{stat.title}</h3>
                  <p className="stat-number">{stat.value}</p>
                  <span className="stat-description">
                    {stat.description}
                  </span>
                </div>

                <div className="stat-bottom-line" />
              </article>
            );
          })}
        </div>

        {/* Recent Inquiries Section */}
        <div className="admin-dashboard-recent-section" style={{ marginTop: '40px' }}>
          <div className="admin-content-header" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <h2>Recent Inquiries</h2>
              {/* <p>Latest requests from students and visitors.</p> */}
            </div>
            <Link to="/admin/inquiries" className="admin-btn" style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              View All <ArrowRight size={16} />
            </Link>
          </div>
{/* 
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Student Details</th>
                  <th>Course / Source</th>
                  <th>Message</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.slice(0, 5).map((inq) => (
                  <tr key={inq._id}>
                    <td>
                      <div className="admin-td-primary">{inq.name}</div>
                      <div className="admin-td-secondary">{inq.mobile}</div>
                      <div className="admin-td-secondary">{inq.email}</div>
                    </td>
                    <td>
                      {inq.source === "Contact Form" ? (
                        <span className="inquiry-source-badge contact-badge">Contact Page</span>
                      ) : (
                        <span className="inquiry-source-badge course-badge">Course Request</span>
                      )}
                      {inq.course && (
                        <div className="admin-td-secondary" style={{ marginTop: '5px' }}>
                          {inq.course}
                        </div>
                      )}
                    </td>
                    <td>
                      <div className="admin-td-text-wrap" style={{ maxWidth: '300px' }}>
                        {inq.message || <span className="admin-td-secondary">No message provided.</span>}
                      </div>
                    </td>
                    <td>
                      <div className="admin-td-primary">
                        {new Date(inq.createdAt).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </div>
                    </td>
                  </tr>
                ))}
                {inquiries.length === 0 && (
                  <tr>
                    <td colSpan="4" className="admin-empty-state">
                      <MessageSquare size={40} className="empty-icon" />
                      <h4>No Inquiries Yet</h4>
                      <p>When students submit forms, they will appear here.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div> */}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;