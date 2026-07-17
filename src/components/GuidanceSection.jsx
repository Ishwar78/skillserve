import React from "react";
import "./GuidanceSection.css";
import { Link } from "react-router-dom";

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
      <div className="container">
        <div className="guidance-header">
          <h2>Choosing the right course can be confusing</h2>

          <p>
            We are here to guide you at every step of your learning journey
            with smarter search, easy applications, and expert support.
          </p>
        </div>

        <div className="guidance-grid">
          {cards.map((card) => (
            <div key={card.id} className="guidance-card">
              <div className="guidance-card-content">
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </div>

              {/* Icon remove karke image add ki hai */}
              <div className="guidance-card-image-box">
                <img
                  src={card.image}
                  alt={card.title}
                  className="guidance-card-image"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="guidance-actions">
          <Link to="/contact" className="guidance-action-link">
            <button type="button" className="btn-start">
              Let&apos;s Start Your Application
            </button>
          </Link>

          <a
            href="tel:+919484794843"
            className="guidance-action-link"
          >
            <button type="button" className="btn-expert">
              Talk to an Expert
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default GuidanceSection;