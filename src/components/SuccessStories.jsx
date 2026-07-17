import React, { useState } from "react";
import {
  Quote,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";

import "./SuccessStories.css";

const stories = [
  {
    id: 1,
    img: "/011.jpg",
    name: "Awadh Kishore",
    company: "Kadimi Tools",
    rating: 5,
    quote:
      "Learning at SkillServe gave me clear direction and real workplace skills, which helped me receive my offer from Kadimi Tools with confidence.",
  },
  {
    id: 2,
    img: "/02.jpg",
    name: "Pawan Kumar",
    company: "Pioneer Rail Equipment Pvt. Ltd.",
    rating: 5,
    quote:
      "Completing my training at SkillServe changed my life and helped me secure placement at Pioneer Rail Equipment Pvt. Ltd. successfully.",
  },
  {
    id: 3,
    img: "/033.png",
    name: "Rohit Yadav",
    company: "Spun Micro Processing Pvt. Ltd.",
    rating: 5,
    quote:
      "The curriculum at SkillServe is very practical and industry-focused. It helped me learn real skills that I now use at Spun Micro Processing Pvt. Ltd.",
  },
  {
    id: 4,
    img: "/4.png",
    name: "Deepak Kumar",
    company: "MKEN India Pvt. Ltd.",
    rating: 5,
    quote:
      "The hands-on learning at SkillServe played a key role in helping me receive my offer letter from MKEN India Pvt. Ltd.",
  },
];

const SuccessStories = () => {
  const [active, setActive] = useState(0);

  const handlePrevious = () => {
    setActive((previous) =>
      previous === 0 ? stories.length - 1 : previous - 1
    );
  };

  const handleNext = () => {
    setActive((previous) =>
      previous === stories.length - 1 ? 0 : previous + 1
    );
  };

  const activeStory = stories[active];

  return (
    <section className="success-stories">
      {/* Background circles */}
      <div className="ss-bg-circle ss-bg-circle--1" />
      <div className="ss-bg-circle ss-bg-circle--2" />

      <div className="container">
        {/* Heading */}
        <div className="ss-header">
          <span className="subtitle">
            STUDENT SUCCESS STORIES
          </span>

          <h2 className="ss-title">
            Real Stories, Real Impact
          </h2>

          <p className="ss-sub">
            Hear from our students who transformed their careers
            with SkillServe Academy
          </p>
        </div>

        <div className="ss-wrapper">
          {/* Left side student thumbnails */}
          <div className="ss-thumbs">
            {stories.map((story, index) => (
              <button
                type="button"
                key={story.id}
                className={`ss-thumb ${
                  index === active ? "active" : ""
                }`}
                onClick={() => setActive(index)}
                aria-label={`View ${story.name}'s success story`}
              >
                <img
                  src={story.img}
                  alt={story.name}
                />
              </button>
            ))}
          </div>

          {/* Main review card */}
          <div className="ss-card">
            {/* <div className="ss-quote-icon">
              <Quote size={36} strokeWidth={2} />
            </div> */}

            {/* Proper opening and closing quotes */}
            <p className="ss-quote">
              <span className="ss-quote-mark">“</span>
              {activeStory.quote}
              <span className="ss-quote-mark">”</span>
            </p>

            {/* Rating */}
            <div
              className="ss-stars"
              aria-label={`${activeStory.rating} out of 5 stars`}
            >
              {Array.from(
                { length: activeStory.rating },
                (_, index) => (
                  <Star
                    key={index}
                    size={18}
                    fill="#f59e0b"
                    stroke="#f59e0b"
                  />
                )
              )}
            </div>

            {/* Author details: divider ke upar */}
            <div className="ss-author">
              {/* <img
                src={activeStory.img}
                alt={activeStory.name}
                className="ss-author-img"
              /> */}

              <div className="ss-author-info">
                <h4 className="ss-name">
                  {activeStory.name}
                </h4>

                <p className="ss-role">
                  <span className="ss-company">
                    {activeStory.company}
                  </span>
                </p>
              </div>
            </div>

            {/* Divider author details ke niche */}
            <div className="ss-divider" />
          </div>

          {/* Navigation */}
          <div className="ss-nav">
            <button
              type="button"
              className="ss-nav-btn"
              onClick={handlePrevious}
              aria-label="Previous success story"
            >
              <ChevronLeft size={22} />
            </button>

            <div className="ss-dots">
              {stories.map((story, index) => (
                <button
                  type="button"
                  key={story.id}
                  className={`ss-dot ${
                    index === active ? "active" : ""
                  }`}
                  onClick={() => setActive(index)}
                  aria-label={`Show story ${index + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              className="ss-nav-btn"
              onClick={handleNext}
              aria-label="Next success story"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;