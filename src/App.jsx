import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Topbar from './components/Topbar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import CourseCategory from './pages/CourseCategory';
import CourseDetail from './pages/CourseDetail';
import Contact from './pages/Contact';
import About from './pages/About';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import BlogList from './pages/BlogList';
import BlogDetail from './pages/BlogDetail';
import InquiryPopup from './components/InquiryPopup';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <header>
          <Topbar />
          <Navbar />
        </header>
        <InquiryPopup />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses/:categoryId" element={<CourseCategory />} />
          <Route path="/course/:courseId" element={<CourseDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
