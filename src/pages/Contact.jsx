import React, { useEffect, useState } from "react";

import {
  MapPin,
  Phone,
  Mail,
  Clock3,
  User,
  Users,
  Smartphone,
  AtSign,
  MapPinned,
  GraduationCap,
  MessageSquareText,
  Send,
  ChevronDown,
  CheckCircle2,
} from "lucide-react";

import {
  stateDistrictMap,
  domainCourseMap,
  domainsList,
} from "../data/locations";

import api from "../utils/api";
import "./Contact.css";

const Contact = () => {
  const [contactInfo, setContactInfo] = useState({
    address:
      "Plot No, 98-C, Udhyog Vihar Phase VII, Sector 35, Gurugram, Haryana 122004",
    phone: "9484794843",
    email: "info@skillserve.in",
    hours: "Monday - Saturday: 9:00 AM - 6:00 PM",
  });

  const [selectedState, setSelectedState] = useState("");
  const [districts, setDistricts] = useState([]);

  const [selectedDomain, setSelectedDomain] = useState("");
  const [availableCourses, setAvailableCourses] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    mobile: "",
    email: "",
    district: "",
    course: "",
    message: "",
  });

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const { data } = await api.get("/contact-info");

        if (data) {
          setContactInfo((previous) => ({
            ...previous,
            ...data,
          }));
        }
      } catch (error) {
        console.error(
          "Failed to fetch contact details",
          error
        );
      }
    };

    fetchContactInfo();
  }, []);

  const handleStateChange = (event) => {
    const stateName = event.target.value;

    setSelectedState(stateName);

    // State change hone par old district reset hoga
    setFormData((previous) => ({
      ...previous,
      district: "",
    }));

    if (
      stateName &&
      Array.isArray(stateDistrictMap[stateName])
    ) {
      setDistricts(stateDistrictMap[stateName]);
    } else {
      setDistricts([]);
    }
  };

  const handleDomainChange = (event) => {
    const domain = event.target.value;

    setSelectedDomain(domain);

    // Domain change hone par old course reset hoga
    setFormData((previous) => ({
      ...previous,
      course: "",
    }));

    if (
      domain &&
      Array.isArray(domainCourseMap[domain])
    ) {
      setAvailableCourses(domainCourseMap[domain]);
    } else {
      setAvailableCourses([]);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, fatherName, mobile, email, district, course, message } = formData;
    
    // Save to database first
    try {
      await api.post('/inquiries', {
        name,
        fatherName,
        mobile,
        email,
        state: selectedState,
        district,
        domain: selectedDomain,
        course,
        message,
        source: 'Contact Page'
      });
    } catch (err) {
      console.error('Failed to save inquiry to database', err);
    }

    const text = `*New Inquiry from Website*
Name: ${name}
Father's Name: ${fatherName}
Mobile: ${mobile}
Email: ${email}
State: ${selectedState}
District: ${district}
Domain: ${selectedDomain}
Course: ${course}
Message: ${message}`;

    const encodedText = encodeURIComponent(text);
    const rawPhone = contactInfo.phone.replace(/\D/g, '');
    const waNumber = rawPhone.length === 10 ? `91${rawPhone}` : rawPhone;
    window.open(`https://wa.me/${waNumber}?text=${encodedText}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <main className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-hero-shape contact-hero-shape-one" />
        <div className="contact-hero-shape contact-hero-shape-two" />

        <div className="container contact-hero-container">
          <span className="contact-hero-badge">
            <GraduationCap size={17} />
            Admissions &amp; Course Guidance
          </span>

          <h1 className="contact-hero-title">
            Contact SkillServe
            <span> Academy</span>
          </h1>

          <p className="contact-hero-sub">
            Book your free course counselling session and
            start building industry-ready skills.
          </p>

          <div className="contact-hero-points">
            <span>
              <CheckCircle2 size={16} />
              Free counselling
            </span>

            <span>
              <CheckCircle2 size={16} />
              Expert guidance
            </span>

            <span>
              <CheckCircle2 size={16} />
              Quick WhatsApp response
            </span>
          </div>
        </div>
      </section>

      <section className="contact-content-section">
        <div className="container contact-main-container">
          <div className="contact-grid">
            {/* Left Side Form */}
            <div className="contact-form-col">
              <div className="contact-form-heading">
                <span className="contact-subtitle">
                  APPLY FOR TRAINING
                </span>

                <h2 className="contact-form-title">
                  Take The First Step Towards Your Career
                </h2>

                <p className="contact-form-description">
                  Fill in your details below. Our admission
                  expert will connect with you and provide
                  complete course guidance.
                </p>
              </div>

              <form
                className="contact-form"
                onSubmit={handleSubmit}
              >
                {/* Name Row */}
                <div className="contact-form-row">
                  <div className="contact-form-group">
                    <label htmlFor="contact-name">
                      Your Full Name
                      <span>*</span>
                    </label>

                    <div className="contact-input-wrapper">
                      <User size={18} />

                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        autoComplete="name"
                        required
                      />
                    </div>
                  </div>

                  <div className="contact-form-group">
                    <label htmlFor="contact-father-name">
                      Father&apos;s Name
                      <span>*</span>
                    </label>

                    <div className="contact-input-wrapper">
                      <Users size={18} />

                      <input
                        id="contact-father-name"
                        type="text"
                        name="fatherName"
                        value={formData.fatherName}
                        onChange={handleChange}
                        placeholder="Enter father's name"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Row */}
                <div className="contact-form-row">
                  <div className="contact-form-group">
                    <label htmlFor="contact-mobile">
                      Mobile Number
                      <span>*</span>
                    </label>

                    <div className="contact-input-wrapper">
                      <Smartphone size={18} />

                      <input
                        id="contact-mobile"
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        placeholder="Enter 10-digit number"
                        pattern="[0-9]{10}"
                        inputMode="numeric"
                        maxLength={10}
                        autoComplete="tel"
                        required
                      />
                    </div>
                  </div>

                  <div className="contact-form-group">
                    <label htmlFor="contact-email">
                      Email Address
                      <span>*</span>
                    </label>

                    <div className="contact-input-wrapper">
                      <AtSign size={18} />

                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        autoComplete="email"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Location Row */}
                <div className="contact-form-row">
                  <div className="contact-form-group">
                    <label htmlFor="contact-state">
                      Select State
                      <span>*</span>
                    </label>

                    <div className="contact-input-wrapper contact-select-wrapper">
                      <MapPinned size={18} />

                      <select
                        id="contact-state"
                        value={selectedState}
                        onChange={handleStateChange}
                        required
                      >
                        <option value="">
                          Choose your state
                        </option>

                        {Object.keys(stateDistrictMap)
                          .sort()
                          .map((state) => (
                            <option
                              key={state}
                              value={state}
                            >
                              {state}
                            </option>
                          ))}
                      </select>

                      <ChevronDown
                        size={17}
                        className="contact-select-arrow"
                      />
                    </div>
                  </div>

                  <div className="contact-form-group">
                    <label htmlFor="contact-district">
                      Select District
                      <span>*</span>
                    </label>

                    <div className="contact-input-wrapper contact-select-wrapper">
                      <MapPin size={18} />

                      <select
                        id="contact-district"
                        name="district"
                        value={formData.district}
                        onChange={handleChange}
                        required
                        disabled={!selectedState}
                      >
                        <option value="">
                          {selectedState
                            ? "Choose your district"
                            : "Select state first"}
                        </option>

                        {districts.map((district) => (
                          <option
                            key={district}
                            value={district}
                          >
                            {district}
                          </option>
                        ))}
                      </select>

                      <ChevronDown
                        size={17}
                        className="contact-select-arrow"
                      />
                    </div>
                  </div>
                </div>

                {/* Course Row */}
                <div className="contact-form-row">
                  <div className="contact-form-group">
                    <label htmlFor="contact-domain">
                      Select Domain
                      <span>*</span>
                    </label>

                    <div className="contact-input-wrapper contact-select-wrapper">
                      <GraduationCap size={18} />

                      <select
                        id="contact-domain"
                        value={selectedDomain}
                        onChange={handleDomainChange}
                        required
                      >
                        <option value="">
                          Choose training domain
                        </option>

                        {domainsList.map((domain) => (
                          <option
                            key={domain}
                            value={domain}
                          >
                            {domain}
                          </option>
                        ))}
                      </select>

                      <ChevronDown
                        size={17}
                        className="contact-select-arrow"
                      />
                    </div>
                  </div>

                  <div className="contact-form-group">
                    <label htmlFor="contact-course">
                      Select Course
                      <span>*</span>
                    </label>

                    <div className="contact-input-wrapper contact-select-wrapper">
                      <GraduationCap size={18} />

                      <select
                        id="contact-course"
                        name="course"
                        value={formData.course}
                        onChange={handleChange}
                        required
                        disabled={!selectedDomain}
                      >
                        <option value="">
                          {selectedDomain
                            ? "Choose your course"
                            : "Select domain first"}
                        </option>

                        {availableCourses.map((course) => (
                          <option
                            key={course}
                            value={course}
                          >
                            {course}
                          </option>
                        ))}
                      </select>

                      <ChevronDown
                        size={17}
                        className="contact-select-arrow"
                      />
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="contact-form-group contact-full-width">
                  <label htmlFor="contact-message">
                    Your Message
                    <span>*</span>
                  </label>

                  <div className="contact-input-wrapper contact-textarea-wrapper">
                    <MessageSquareText size={18} />

                    <textarea
                      id="contact-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write your question or course requirement..."
                      rows={5}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="contact-submit-btn"
                >
                  <Send size={19} />
                  Submit Application
                </button>

                <p className="contact-form-note">
                  By submitting this form, you agree to be
                  contacted regarding course admissions and
                  counselling.
                </p>
              </form>
            </div>

            {/* Right Side Contact Information */}
            <aside className="contact-info-col">
              <div className="contact-info-heading">
                <span>GET IN TOUCH</span>

                <h3>We&apos;re Here To Help You</h3>

                <p>
                  Contact our admission team for course,
                  training and career-related assistance.
                </p>
              </div>

              <div className="contact-info-list">
                <article className="contact-info-card">
                  <div className="contact-info-icon">
                    <MapPin size={24} />
                  </div>

                  <div className="contact-info-text">
                    <span>Visit Our Center</span>
                    <h4>Gurugram Center</h4>
                    <p>{contactInfo.address}</p>
                  </div>
                </article>

                <a
                  href={`tel:${contactInfo.phone}`}
                  className="contact-info-card"
                >
                  <div className="contact-info-icon">
                    <Phone size={24} />
                  </div>

                  <div className="contact-info-text">
                    <span>Call For Assistance</span>
                    <h4>Phone Number</h4>
                    <p>{contactInfo.phone}</p>
                  </div>
                </a>

                <a
                  href={`mailto:${contactInfo.email}`}
                  className="contact-info-card"
                >
                  <div className="contact-info-icon">
                    <Mail size={24} />
                  </div>

                  <div className="contact-info-text">
                    <span>Email Support</span>
                    <h4>Send An Email</h4>
                    <p>{contactInfo.email}</p>
                  </div>
                </a>

                <article className="contact-info-card">
                  <div className="contact-info-icon">
                    <Clock3 size={24} />
                  </div>

                  <div className="contact-info-text">
                    <span>Working Schedule</span>
                    <h4>Training Hours</h4>
                    <p>{contactInfo.hours}</p>
                  </div>
                </article>
              </div>

              <div className="contact-help-box">
                <div className="contact-help-icon">
                  <Phone size={22} />
                </div>

                <div>
                  <span>Need immediate guidance?</span>
                  <strong>
                    Speak directly with our admission expert.
                  </strong>
                </div>

                <a href={`tel:${contactInfo.phone}`}>
                  Call Now
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;