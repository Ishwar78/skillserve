import React from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Topbar from "./components/Topbar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import InquiryPopup from "./components/InquiryPopup";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import CourseCategory from "./pages/CourseCategory";
import CourseDetail from "./pages/CourseDetail";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import BlogList from "./pages/BlogList";
import BlogDetail from "./pages/BlogDetail";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminReviews from "./pages/admin/AdminReviews";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminContact from "./pages/admin/AdminContact";
import AdminCourses from "./pages/admin/AdminCourses";
import AdminInquiries from "./pages/admin/AdminInquiries";
import AdminChatbot from "./pages/admin/AdminChatbot";
import AdminBlogs from "./pages/admin/AdminBlogs";
import AdminAbout from "./pages/admin/AdminAbout";
import AdminHero from "./pages/admin/AdminHero";

import "./App.css";

const AppContent = () => {
  const location = useLocation();

  const isAdminPath =
    location.pathname.startsWith("/admin");

  return (
    <div className="app-container">
      {/* Public website header */}
      {!isAdminPath && (
        <header>
          <Topbar />
          <Navbar />
        </header>
      )}

      {/* Public website inquiry popup */}
      {!isAdminPath && <InquiryPopup />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/courses/:categoryId"
          element={<CourseCategory />}
        />

        <Route
          path="/course/:courseId"
          element={<CourseDetail />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/terms"
          element={<Terms />}
        />

        <Route
          path="/privacy"
          element={<Privacy />}
        />

        <Route
          path="/blog"
          element={<BlogList />}
        />

        <Route
          path="/blog/:id"
          element={<BlogDetail />}
        />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={<AdminLogin />}
        />

        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin/reviews"
          element={<AdminReviews />}
        />

        <Route
          path="/admin/categories"
          element={<AdminCategories />}
        />

        <Route
          path="/admin/contact"
          element={<AdminContact />}
        />

        <Route
          path="/admin/courses"
          element={<AdminCourses />}
        />

        <Route
          path="/admin/about"
          element={<AdminAbout />}
        />

        <Route
          path="/admin/hero"
          element={<AdminHero />}
        />

        <Route
          path="/admin/inquiries"
          element={<AdminInquiries />}
        />

        <Route
          path="/admin/chatbot"
          element={<AdminChatbot />}
        />

        <Route
          path="/admin/blogs"
          element={<AdminBlogs />}
        />

        <Route
          path="/admin/about"
          element={<AdminAbout />}
        />
      </Routes>

      {/* Public website footer */}
      {!isAdminPath && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      {/* Har route change par page top se open hoga */}
      <ScrollToTop />

      <AppContent />
    </Router>
  );
};

export default App;