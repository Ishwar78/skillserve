import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  PhoneCall,
  Sparkles,
} from "lucide-react";

import "./GuidanceSection.css";

const GuidanceSection = () => {
  const cards = [
    {
      id: 1,
      title: "Get Your Career Match",
      desc: "Take our free career guidance support and discover the best course options for your future.",
      image: "/images/carrier.png",
    },
    {
      id: 2,
      title: "Apply With One Form",
      desc: "Use one platform to apply to multiple domains and skill programs with ease.",
      image: "/images/application.png",
    },
    {
      id: 3,
      title: "Track Applications",
      desc: "Manage your academy applications and updates from one single dashboard.",
      image: "/images/track.png",
    },
    {
      id: 4,
      title: "Talk to Admission Experts",
      desc: "Get personalised support and expert guidance for courses, modules, and admissions.",
      image: "/images/expert.png",
    },
    {
      id: 5,
      title: "Easy Apply in Minutes",
      desc: "Complete your application quickly with a smooth and student-friendly process.",
      image: "/images/apply.png",
    },
    {
      id: 6,
      title: "Get Exciting Benefits",
      desc: "Enjoy helpful support, guidance, and value-added benefits while applying.",
      image: "/images/getbenifit.png",
    },
  ];

  return (
    <section className="guidance-section">
      {/* Decorative elements */}
      <div className="guidance-decoration guidance-decoration-one" />
      <div className="guidance-decoration guidance-decoration-two" />

      <div className="guidance-container">
        {/* Header */}
        <div className="guidance-header">
          <span className="guidance-header-badge">
            <Sparkles size={16} />
            Career Guidance &amp; Support
          </span>

          <h2>
            Choosing The Right Course
            <strong> Should Be Easy</strong>
          </h2>

          {/* <p>
            We guide you at every step of your learning journey with smarter
            course selection, simple applications and personalised expert
            support.
          </p> */}
        </div>

        {/* Cards */}
        <div className="guidance-grid">
          {cards.map((card, index) => (
            <article className="guidance-card" key={card.id}>
              <div className="guidance-card-number">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="guidance-card-content">
                <div className="guidance-card-check">
                  <CheckCircle2 size={17} />
                  Student Support
                </div>

                <h3>{card.title}</h3>

                <p>{card.desc}</p>
              </div>

              <div className="guidance-card-image-box">
                <div className="guidance-image-glow" />

                <img
                  src={card.image}
                  alt={card.title}
                  className="guidance-card-image"
                  loading="lazy"
                />
              </div>

              <div className="guidance-card-bottom-line" />
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="guidance-cta">
          <div className="guidance-cta-content">
            <span>Need help choosing your course?</span>

            <h3>
              Start Your Application With Expert Guidance
            </h3>

            <p>
              Connect with our team and get complete support for course
              selection, admission and career planning.
            </p>
          </div>

          <div className="guidance-actions">
            <Link
              to="/contact"
              className="guidance-button guidance-button-primary"
            >
              <span>Start Your Application</span>
              <ArrowRight size={18} />
            </Link>

            <a
              href="tel:+919484794843"
              className="guidance-button guidance-button-secondary"
            >
              <PhoneCall size={17} />
              <span>Talk To An Expert</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuidanceSection;