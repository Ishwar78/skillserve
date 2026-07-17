import React from "react";
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
      name: "maxop",
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
      name: "dabad",
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

  return (
    <section className="partners">
      <div className="container">

        <p className="partners-section-label">
          Trusted By Industry Leaders
        </p>

        <h2 className="section-title">
          Our Placement Partners
        </h2>

        <div className="partners-slider">

          <div className="partners-track">

            {partners.map((partner) => (
              <div className="partner-card" key={partner.id}>
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="partner-logo"
                />
              </div>
            ))}

            {partners.map((partner) => (
              <div
                className="partner-card"
                key={`${partner.id}-duplicate`}
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="partner-logo"
                />
              </div>
            ))}

          </div>

        </div>

      </div>
    </section>
  );
};

export default Partners;