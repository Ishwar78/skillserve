import React from "react";
import {
  Building2,
  Handshake,
  Sparkles,
} from "lucide-react";

import "./Partners.css";

const Partners = () => {
  const partners = [
    {
      id: 1,
      name: "Yulu",
      logo: "/yulu_logo.png",
    },
    {
      id: 2,
      name: "Maxop",
      logo: "/maxop.png",
    },
    {
      id: 3,
      name: "NTK India",
      logo: "/ntk_india.png",
    },
    {
      id: 4,
      name: "SPUN",
      logo: "/spun_logo1.png",
    },
    {
      id: 5,
      name: "Dabad",
      logo: "/dabad logo.png",
    },
    {
      id: 6,
      name: "Bajaj",
      logo: "/bajaj-logo.png",
    },
    {
      id: 8,
      name: "Mahindra",
      logo: "/images.jpeg",
    },
    {
      id: 9,
      name: "Honda",
      logo: "/honda-logo2.png",
    },
    {
      id: 10,
      name: "TVS",
      logo: "/tvs-logo.webp",
    },
  ];

  const renderPartnerCards = (isDuplicate = false) =>
    partners.map((partner) => (
      <article
        className="placement-partner-card"
        key={
          isDuplicate
            ? `${partner.id}-duplicate`
            : partner.id
        }
        aria-hidden={isDuplicate ? "true" : undefined}
      >
        <div className="placement-partner-logo-box">
          <img
            src={partner.logo}
            alt={
              isDuplicate
                ? ""
                : `${partner.name} placement partner`
            }
            className="placement-partner-logo"
            loading="lazy"
            draggable="false"
            onError={(event) => {
              event.currentTarget.src =
                "/placeholder-image.png";
            }}
          />
        </div>

        <div className="placement-partner-card-footer">
          <span>{partner.name}</span>

          <div className="placement-partner-status">
            <span />
            Partner
          </div>
        </div>
      </article>
    ));

  return (
    <section className="placement-partners">
      {/* Decorative background */}
      <div className="placement-partners-shape placement-shape-one" />
      <div className="placement-partners-shape placement-shape-two" />

      {/* Full-width container */}
      <div className="placement-partners-container">
        {/* Heading */}
        <div className="placement-partners-header">
          <div className="placement-partners-heading-content">
            <span className="placement-partners-badge">
              <Handshake size={16} />
              Trusted Industry Network
            </span>

            <h2>
              Our Placement
              <strong> Partners</strong>
            </h2>

            <p>
              Building strong connections with leading
              organisations to create better career and
              placement opportunities for our learners.
            </p>
          </div>

          <div className="placement-partners-count">
            <div className="placement-count-icon">
              <Building2 size={25} />
            </div>

            <div>
              <strong>{partners.length}+</strong>
              <span>Industry Partners</span>
            </div>
          </div>
        </div>

        {/* Infinite slider */}
        <div className="placement-partners-slider">
          <div className="placement-slider-edge placement-edge-left" />
          <div className="placement-slider-edge placement-edge-right" />

          <div className="placement-partners-track">
            {/* First group */}
            <div className="placement-partners-group">
              {renderPartnerCards(false)}
            </div>

            {/* Duplicate group for seamless scroll */}
            <div
              className="placement-partners-group"
              aria-hidden="true"
            >
              {renderPartnerCards(true)}
            </div>
          </div>
        </div>

        {/* Bottom line */}
        <div className="placement-partners-bottom">
          <span>
            <Sparkles size={15} />
            Industry-integrated training for better career
            outcomes
          </span>
        </div>
      </div>
    </section>
  );
};

export default Partners;