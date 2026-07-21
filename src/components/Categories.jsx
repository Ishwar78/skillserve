import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";
import "./Categories.css";

const initialCategories = [
  {
    _id: "1",
    title: "CNC-VMC & Manufacturing",
    courses: 6,
    image: "/Category/cnc-vmc.png",
    link: "/courses/cnc-programming-course",
  },
  {
    _id: "2",
    title: "PLC Automation & IIOT",
    courses: 2,
    image: "/Category/PLC.png",
    link: "/courses/plc-scada-course",
  },
  {
    _id: "3",
    title: "CAD-CAM Designing",
    courses: 5,
    image: "/Category/cad-cam.png",
    link: "/courses/cad-cam-course",
  },
  {
    _id: "4",
    title: "Electric Vehicle",
    courses: 3,
    image: "/Category/electric.png",
    link: "/courses/electric-vehicle-course",
  },
  {
    _id: "5",
    title: "Digital Marketing & AI",
    courses: 2,
    image: "/Category/digital.png",
    link: "/courses/digital-marketing-course",
  },
  {
    _id: "6",
    title: "Electronics & Robotics",
    courses: 3,
    image: "/Category/Robotics.png",
    link: "/courses/electronics-robotics-course",
  },
];

const Categories = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
  });
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState(initialCategories);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await api.get('/categories');
        if (data && data.length > 0) {
          setCategories(data);
        }
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };
    fetchCategories();
  }, []);

  const handleWhatsappSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Save to MongoDB (Admin Dashboard)
      await api.post("/inquiries", {
        name: formData.name,
        email: formData.email,
        mobile: formData.phone,
        course: formData.course,
        source: "Course Request" // from Categories form
      });

      // 2. Fetch Contact Settings for dynamic WhatsApp Number
      const { data } = await api.get('/contact-info');
      const whatsappNumber = data.whatsappNumber || "919484794843";

      // 3. Open WhatsApp
      const msg = `Hello SkillServe,
I want to apply for a course.

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Course: ${formData.course}`;

      const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
      window.open(url, "_blank");

      // Reset form
      setFormData({ name: "", email: "", phone: "", course: "" });
    } catch (error) {
      console.error("Failed to submit inquiry", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="categories-redesign">
      <div className="container cat-flex-container">
        {/* Left Side Categories */}
        <div className="cat-left-col">
          <div className="cat-grid-wrapper">
            {categories.map((cat) => (
              <Link
                to={cat.link}
                key={cat._id}
                className="cat-redesign-card"
              >
                {/* Left side content */}
                <div className="cat-card-content">
                  <h3 className="cat-redesign-title">
                    {cat.title}
                  </h3>

                  <div className="cat-redesign-meta">
                    <span>{cat.courses} Courses</span>
                  </div>
                </div>

                {/* Right side image */}
                <div className="cat-card-image-box">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="cat-card-image"
                    loading="lazy"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Right Side Registration Form */}
        <div className="cat-right-col">
          <div className="cat-register-form">
            <div className="form-header">
              <h2>Register Now To Apply</h2>
            </div>

            <form onSubmit={handleWhatsappSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Enter Full Name"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  placeholder="Enter Email Address"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <input
                  type="tel"
                  placeholder="Enter Mobile Number"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      phone: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  placeholder="Course Interested In"
                  required
                  value={formData.course}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      course: e.target.value,
                    })
                  }
                />
              </div>

              <button type="submit" className="form-submit-btn" disabled={loading}>
                {loading ? "Submitting..." : "Submit"}
              </button>
            </form>

            <p className="form-terms">
              By submitting this form, you accept our Terms &amp; Privacy
              policy
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;