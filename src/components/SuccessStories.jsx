import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";

import "./SuccessStories.css";
import api from "../utils/api";

const initialStories = [
  {
    _id: "1",
    img: "/011.jpg",
    name: "Awadh Kishore",
    company: "Kadimi Tools",
    rating: 5,
    quote:
      "Learning at SkillServe gave me clear direction and real workplace skills, which helped me receive my offer from Kadimi Tools with confidence.",
  },
  {
    _id: "2",
    img: "/02.jpg",
    name: "Pawan Kumar",
    company: "Pioneer Rail Equipment Pvt. Ltd.",
    rating: 5,
    quote:
      "Completing my training at SkillServe changed my life and helped me secure placement at Pioneer Rail Equipment Pvt. Ltd. successfully.",
  },
  {
    _id: "3",
    img: "/033.png",
    name: "Rohit Yadav",
    company: "Spun Micro Processing Pvt. Ltd.",
    rating: 5,
    quote:
      "The curriculum at SkillServe is very practical and industry-focused. It helped me learn real skills that I now use at Spun Micro Processing Pvt. Ltd.",
  },
  {
    _id: "4",
    img: "/4.png",
    name: "Deepak Kumar",
    company: "MKEN India Pvt. Ltd.",
    rating: 5,
    quote:
      "The hands-on learning at SkillServe played a key role in helping me receive my offer letter from MKEN India Pvt. Ltd.",
  },
];

/* Rating ko 1 se 5 ke beech rakhega */
const getValidRating = (rating) => {
  const numericRating = Number(rating);

  if (!Number.isFinite(numericRating)) {
    return 5;
  }

  return Math.min(5, Math.max(1, Math.round(numericRating)));
};

/* API ke alag-alag field names ko support karega */
const normalizeReviews = (reviews) => {
  return reviews
    .map((review, index) => ({
      _id:
        review._id ||
        review.id ||
        `testimonial-${index}`,

      img:
        review.img ||
        review.image ||
        review.studentImage ||
        review.profileImage ||
        "/011.jpg",

      name:
        review.name ||
        review.studentName ||
        "SkillServe Student",

      company:
        review.company ||
        review.companyName ||
        review.placementCompany ||
        "SkillServe Academy",

      rating: getValidRating(review.rating),

      quote:
        review.quote ||
        review.review ||
        review.message ||
        review.description ||
        "",
    }))
    .filter((review) => review.quote.trim() !== "");
};

const SuccessStories = () => {
  const [active, setActive] = useState(0);
  const [stories, setStories] = useState(initialStories);

  const thumbnailsContainerRef = useRef(null);
  const thumbnailRefs = useRef([]);

  /*
   * API se testimonials fetch karna
   */
  useEffect(() => {
    let componentMounted = true;

    const fetchReviews = async () => {
      try {
        const { data } = await api.get("/reviews");

        const reviewsList = Array.isArray(data)
          ? data
          : Array.isArray(data?.reviews)
            ? data.reviews
            : [];

        const formattedReviews =
          normalizeReviews(reviewsList);

        if (
          componentMounted &&
          formattedReviews.length > 0
        ) {
          setStories(formattedReviews);
          setActive(0);
        }
      } catch (error) {
        console.error(
          "Failed to fetch reviews:",
          error
        );

        /*
         * API fail hone par initial reviews
         * automatically show hote rahenge.
         */
      }
    };

    fetchReviews();

    return () => {
      componentMounted = false;
    };
  }, []);

  /*
   * Selected thumbnail ko desktop/mobile viewport
   * ke andar automatically lekar aayega.
   */
  const scrollThumbnailIntoView = useCallback(
    (index) => {
      window.requestAnimationFrame(() => {
        const container =
          thumbnailsContainerRef.current;

        const thumbnail =
          thumbnailRefs.current[index];

        if (!container || !thumbnail) {
          return;
        }

        const mobileView = window.matchMedia(
          "(max-width: 768px)"
        ).matches;

        if (mobileView) {
          const thumbnailLeft =
            thumbnail.offsetLeft;

          const thumbnailRight =
            thumbnailLeft + thumbnail.offsetWidth;

          const visibleLeft =
            container.scrollLeft;

          const visibleRight =
            visibleLeft + container.clientWidth;

          if (thumbnailLeft < visibleLeft) {
            container.scrollTo({
              left: thumbnailLeft - 6,
              behavior: "smooth",
            });
          } else if (
            thumbnailRight > visibleRight
          ) {
            container.scrollTo({
              left:
                thumbnailRight -
                container.clientWidth +
                6,
              behavior: "smooth",
            });
          }
        } else {
          const thumbnailTop =
            thumbnail.offsetTop;

          const thumbnailBottom =
            thumbnailTop + thumbnail.offsetHeight;

          const visibleTop =
            container.scrollTop;

          const visibleBottom =
            visibleTop + container.clientHeight;

          if (thumbnailTop < visibleTop) {
            container.scrollTo({
              top: thumbnailTop - 6,
              behavior: "smooth",
            });
          } else if (
            thumbnailBottom > visibleBottom
          ) {
            container.scrollTo({
              top:
                thumbnailBottom -
                container.clientHeight +
                6,
              behavior: "smooth",
            });
          }
        }
      });
    },
    []
  );

  /*
   * Active testimonial change hone par selected
   * thumbnail automatic scroll hoga.
   */
  useEffect(() => {
    scrollThumbnailIntoView(active);
  }, [
    active,
    stories.length,
    scrollThumbnailIntoView,
  ]);

  const selectStory = (index) => {
    setActive(index);
  };

  const handlePrevious = () => {
    if (stories.length === 0) {
      return;
    }

    setActive((previous) =>
      previous === 0
        ? stories.length - 1
        : previous - 1
    );
  };

  const handleNext = () => {
    if (stories.length === 0) {
      return;
    }

    setActive((previous) =>
      previous === stories.length - 1
        ? 0
        : previous + 1
    );
  };

  if (stories.length === 0) {
    return null;
  }

  const activeStory = stories[active];

  return (
    <section className="success-stories">
      {/* Background decoration */}
      <div className="ss-bg-circle ss-bg-circle--1" />
      <div className="ss-bg-circle ss-bg-circle--2" />

      <div className="container">
        {/* Header */}
        <div className="ss-header">
          <span className="subtitle">
            STUDENT SUCCESS STORIES
          </span>

          <h2 className="ss-title">
            Real Stories, Real Impact
          </h2>

          <p className="ss-sub">
            Hear from our students who transformed
            their careers with SkillServe Academy
          </p>
        </div>

        <div className="ss-wrapper">
          {/* Scrollable thumbnails */}
          <div
            ref={thumbnailsContainerRef}
            className="ss-thumbs"
            aria-label="Student testimonial list"
          >
            {stories.map((story, index) => (
              <button
                ref={(element) => {
                  thumbnailRefs.current[index] =
                    element;
                }}
                type="button"
                key={
                  story._id ||
                  `testimonial-${index}`
                }
                className={`ss-thumb ${
                  index === active ? "active" : ""
                }`}
                onClick={() => selectStory(index)}
                aria-label={`View ${story.name}'s testimonial`}
                aria-pressed={index === active}
              >
                <img
                  src={story.img}
                  alt={story.name}
                  loading="lazy"
                />
              </button>
            ))}
          </div>

          {/* Active review card */}
          <article
            className="ss-card"
            key={
              activeStory._id ||
              `active-${active}`
            }
          >
            <p className="ss-quote">
              <span
                className="ss-quote-mark"
                aria-hidden="true"
              >
                “
              </span>

              {activeStory.quote}

              <span
                className="ss-quote-mark"
                aria-hidden="true"
              >
                ”
              </span>
            </p>

            {/* Rating */}
            <div
              className="ss-stars"
              aria-label={`${activeStory.rating} out of 5 stars`}
            >
              {Array.from(
                {
                  length: getValidRating(
                    activeStory.rating
                  ),
                },
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

            {/* Student information */}
            <div className="ss-author">
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

            <div className="ss-divider" />
          </article>

          {/* Navigation */}
          <div className="ss-nav">
            <button
              type="button"
              className="ss-nav-btn"
              onClick={handlePrevious}
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={22} />
            </button>

            {/* Scrollable dots */}
            <div className="ss-dots">
              {stories.map((story, index) => (
                <button
                  type="button"
                  key={
                    story._id
                      ? `dot-${story._id}`
                      : `dot-${index}`
                  }
                  className={`ss-dot ${
                    index === active
                      ? "active"
                      : ""
                  }`}
                  onClick={() => selectStory(index)}
                  aria-label={`Show testimonial ${
                    index + 1
                  }`}
                  aria-pressed={index === active}
                />
              ))}
            </div>

            <button
              type="button"
              className="ss-nav-btn"
              onClick={handleNext}
              aria-label="Next testimonial"
            >
              <ChevronRight size={22} />
            </button>
          </div>

          <p className="ss-counter">
            {active + 1} / {stories.length}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;