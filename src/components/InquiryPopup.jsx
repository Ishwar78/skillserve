import React, { useEffect, useState } from "react";

import {
  BookOpenCheck,
  CheckCircle2,
  GraduationCap,
  MessageSquareText,
  Send,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";

import {
  stateDistrictMap,
  domainCourseMap,
  domainsList,
} from "../data/locations";

import api from "../utils/api";
import "./InquiryPopup.css";

const initialFormData = {
  name: "",
  fatherName: "",
  mobile: "",
  email: "",
  district: "",
  course: "",
  message: "",
};

const InquiryPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [contactPhone, setContactPhone] = useState("9484794843");

  useEffect(() => {
    const fetchContactPhone = async () => {
      try {
        const { data } = await api.get('/contact-info');
        if (data && data.phone) {
          setContactPhone(data.phone);
        }
      } catch (error) {
        console.error('Failed to fetch contact phone:', error);
      }
    };
    fetchContactPhone();
  }, []);

  const [selectedState, setSelectedState] =
    useState("");

  const [districts, setDistricts] = useState([]);

  const [selectedDomain, setSelectedDomain] =
    useState("");

  const [availableCourses, setAvailableCourses] =
    useState([]);

  const [formData, setFormData] =
    useState(initialFormData);

  /*
   * Website load hone ke 1.5 second baad
   * popup automatically open hoga.
   */
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsOpen(true);
    }, 1500);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  /*
   * Popup open hone par background scrolling
   * band rahegi aur Escape key se popup close hoga.
   */
  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOverlayClick = (event) => {
    if (
      event.target === event.currentTarget
    ) {
      handleClose();
    }
  };

  const handleStateChange = (event) => {
    const stateName = event.target.value;

    setSelectedState(stateName);

    setFormData((previous) => ({
      ...previous,
      district: "",
    }));

    if (
      stateName &&
      stateDistrictMap[stateName]
    ) {
      setDistricts(
        stateDistrictMap[stateName]
      );
    } else {
      setDistricts([]);
    }
  };

  const handleDomainChange = (event) => {
    const domainName = event.target.value;

    setSelectedDomain(domainName);

    setFormData((previous) => ({
      ...previous,
      course: "",
    }));

    if (
      domainName &&
      domainCourseMap[domainName]
    ) {
      setAvailableCourses(
        domainCourseMap[domainName]
      );
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const {
      name,
      fatherName,
      mobile,
      email,
      district,
      course,
      message,
    } = formData;

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
        source: 'Popup'
      });
    } catch (err) {
      console.error('Failed to save popup inquiry to database:', err);
    }

    const whatsappMessage = `*New Popup Inquiry from SkillServe Website*

*Student Details*
Name: ${name}
Father's Name: ${fatherName}
Mobile: ${mobile}
Email: ${email}

*Location Details*
State: ${selectedState}
District: ${district}

*Course Details*
Domain: ${selectedDomain}
Course: ${course}

*Message*
${message}`;

    const encodedMessage =
      encodeURIComponent(whatsappMessage);

    const rawPhone = String(contactPhone || '9484794843').replace(/\D/g, '');
    const whatsappNumber = rawPhone.length === 10 ? `91${rawPhone}` : rawPhone;

    const whatsappUrl =
      `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    const whatsappWindow = window.open(
      whatsappUrl,
      "_blank",
      "noopener,noreferrer"
    );

    if (whatsappWindow) {
      whatsappWindow.opener = null;
    }

    setIsOpen(false);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="inquiry-popup-overlay"
      onMouseDown={handleOverlayClick}
      role="presentation"
    >
      <div
        className="inquiry-popup"
        role="dialog"
        aria-modal="true"
        aria-labelledby="inquiry-popup-title"
      >
        {/* Close Button */}
        <button
          type="button"
          className="inquiry-popup-close"
          onClick={handleClose}
          aria-label="Close inquiry form"
        >
          <X size={23} />
        </button>

        {/* Left Information Panel */}
        <aside className="inquiry-popup-visual">
          <div className="inquiry-visual-shape inquiry-visual-shape-one" />
          <div className="inquiry-visual-shape inquiry-visual-shape-two" />
          <div className="inquiry-visual-pattern" />

          <div className="inquiry-visual-content">
            <span className="inquiry-visual-badge">
              <Sparkles size={16} />
              SkillServe Admissions
            </span>

            <div className="inquiry-visual-icon">
              <GraduationCap size={34} />
            </div>

            <h2>
              Build Skills For A
              <strong> Better Career</strong>
            </h2>

            <p>
              Share your details and our admission
              experts will help you select the right
              practical training programme.
            </p>

            <div className="inquiry-benefits">
              <div className="inquiry-benefit-item">
                <CheckCircle2 size={18} />

                <span>
                  Free course guidance from experts
                </span>
              </div>

              <div className="inquiry-benefit-item">
                <CheckCircle2 size={18} />

                <span>
                  Industry-focused practical training
                </span>
              </div>

              <div className="inquiry-benefit-item">
                <CheckCircle2 size={18} />

                <span>
                  Career and placement assistance
                </span>
              </div>
            </div>

            <div className="inquiry-trust-card">
              <div className="inquiry-trust-icon">
                <ShieldCheck size={22} />
              </div>

              <div>
                <span>Your information is secure</span>
                <strong>
                  Quick response on WhatsApp
                </strong>
              </div>
            </div>
          </div>
        </aside>

        {/* Right Form Panel */}
        <section className="inquiry-popup-panel">
          <div className="inquiry-popup-header">
            <span className="inquiry-popup-eyebrow">
              <BookOpenCheck size={16} />
              Course Inquiry Form
            </span>

            <h2 id="inquiry-popup-title">
              Enquire Now
            </h2>

            <p>
              Complete the form below and connect
              directly with our admission team.
            </p>
          </div>

          <form
            className="inquiry-popup-form"
            onSubmit={handleSubmit}
          >
            {/* Name Fields */}
            <div className="inquiry-form-row">
              <div className="inquiry-form-group">
                <label htmlFor="inquiry-name">
                  Student Name
                  <span>*</span>
                </label>

                <input
                  id="inquiry-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  required
                />
              </div>

              <div className="inquiry-form-group">
                <label htmlFor="inquiry-father-name">
                  Father&apos;s Name
                  <span>*</span>
                </label>

                <input
                  id="inquiry-father-name"
                  type="text"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleChange}
                  placeholder="Enter father's name"
                  required
                />
              </div>
            </div>

            {/* Contact Fields */}
            <div className="inquiry-form-row">
              <div className="inquiry-form-group">
                <label htmlFor="inquiry-mobile">
                  Mobile Number
                  <span>*</span>
                </label>

                <input
                  id="inquiry-mobile"
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

              <div className="inquiry-form-group">
                <label htmlFor="inquiry-email">
                  Email Address
                  <span>*</span>
                </label>

                <input
                  id="inquiry-email"
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

            {/* Location Fields */}
            <div className="inquiry-form-row">
              <div className="inquiry-form-group">
                <label htmlFor="inquiry-state">
                  State
                  <span>*</span>
                </label>

                <select
                  id="inquiry-state"
                  value={selectedState}
                  onChange={handleStateChange}
                  required
                >
                  <option value="">
                    Select your state
                  </option>

                  {Object.keys(stateDistrictMap)
                    .sort()
                    .map((stateName) => (
                      <option
                        key={stateName}
                        value={stateName}
                      >
                        {stateName}
                      </option>
                    ))}
                </select>
              </div>

              <div className="inquiry-form-group">
                <label htmlFor="inquiry-district">
                  District
                  <span>*</span>
                </label>

                <select
                  id="inquiry-district"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  disabled={!selectedState}
                  required
                >
                  <option value="">
                    {selectedState
                      ? "Select your district"
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
              </div>
            </div>

            {/* Course Fields */}
            <div className="inquiry-form-row">
              <div className="inquiry-form-group">
                <label htmlFor="inquiry-domain">
                  Course Domain
                  <span>*</span>
                </label>

                <select
                  id="inquiry-domain"
                  value={selectedDomain}
                  onChange={handleDomainChange}
                  required
                >
                  <option value="">
                    Select course domain
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
              </div>

              <div className="inquiry-form-group">
                <label htmlFor="inquiry-course">
                  Interested Course
                  <span>*</span>
                </label>

                <select
                  id="inquiry-course"
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  disabled={!selectedDomain}
                  required
                >
                  <option value="">
                    {selectedDomain
                      ? "Select a course"
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
              </div>
            </div>

            {/* Message */}
            <div className="inquiry-form-group inquiry-form-full">
              <label htmlFor="inquiry-message">
                Your Message
                <span>*</span>
              </label>

              <div className="inquiry-textarea-wrapper">
                <MessageSquareText size={19} />

                <textarea
                  id="inquiry-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your course or career requirements"
                  rows={3}
                  required
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="inquiry-popup-submit"
            >
              <span>
                Submit Inquiry On WhatsApp
              </span>

              <Send size={19} />
            </button>

            <p className="inquiry-popup-privacy">
              By submitting this form, you agree to
              receive course-related communication from
              SkillServe Academy.
            </p>
          </form>
        </section>
      </div>
    </div>
  );
};

export default InquiryPopup;