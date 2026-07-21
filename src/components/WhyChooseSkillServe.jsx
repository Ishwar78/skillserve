import React from "react";
import { Link } from "react-router-dom";

import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  BriefcaseBusiness,
  CheckCircle2,
  GraduationCap,
  Headphones,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  UsersRound,
  Wrench,
} from "lucide-react";

import "./WhyChooseSkillServe.css";

const WhyChooseSkillServe = () => {
  const benefits = [
    {
      id: 1,
      icon: Wrench,
      number: "01",
      title: "Practical Skill Training",
      description:
        "Learn through practical assignments, workshops and industry-oriented projects instead of only theoretical classes.",
    },
    {
      id: 2,
      icon: BriefcaseBusiness,
      number: "02",
      title: "Job-Ready Curriculum",
      description:
        "Our programmes are designed around current industry requirements to help students build employable skills.",
    },
    {
      id: 3,
      icon: GraduationCap,
      number: "03",
      title: "Experienced Trainers",
      description:
        "Learn from experienced trainers who understand industry processes, technologies and career requirements.",
    },
    {
      id: 4,
      icon: UsersRound,
      number: "04",
      title: "Placement Assistance",
      description:
        "Get guidance for resume preparation, interview practice, job applications and placement opportunities.",
    },
    {
      id: 5,
      icon: Headphones,
      number: "05",
      title: "Personalised Support",
      description:
        "Our admission and support teams guide students during course selection, training and career planning.",
    },
    {
      id: 6,
      icon: BadgeCheck,
      number: "06",
      title: "Recognised Certification",
      description:
        "Receive a course completion certificate that highlights your practical learning and professional skills.",
    },
  ];

  const highlights = [
    "Industry-focused course modules",
    "Practical projects and assignments",
    "Flexible learning support",
    "Career and placement guidance",
  ];

  return (
    <section className="why-skillserve">
      <div className="why-skillserve-decoration why-decoration-one" />
      <div className="why-skillserve-decoration why-decoration-two" />

      <div className="why-skillserve-container">
        {/* Heading */}
        <div className="why-skillserve-header">
          <div className="why-skillserve-heading">
            <span className="why-skillserve-badge">
              <Sparkles size={16} />
              Why Choose SkillServe Academy
            </span>

            <h2>
              More Than A Course,
              <strong> A Complete Career Journey</strong>
            </h2>
          </div>

          <div className="why-skillserve-header-description">
            <p>
              SkillServe Academy helps students develop practical,
              job-ready skills through industry-focused training,
              experienced guidance and complete career support.
            </p>

            <div className="why-heading-line">
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="why-skillserve-layout">
          {/* Left feature panel */}
          <div className="why-skillserve-feature-panel">
            <div className="why-panel-pattern" />
            <div className="why-panel-circle why-panel-circle-one" />
            <div className="why-panel-circle why-panel-circle-two" />

            <div className="why-feature-panel-content">
              <span className="why-panel-label">
                <ShieldCheck size={16} />
                Student-First Learning
              </span>

              <div className="why-panel-icon">
                <BookOpenCheck size={36} />
              </div>

              <h3>
                Skills That Prepare You For
                <strong> Real Opportunities</strong>
              </h3>

              <p>
                Our learning approach combines practical training,
                expert mentorship and career guidance to help you move
                confidently towards your professional goals.
              </p>

              <div className="why-panel-highlights">
                {highlights.map((highlight) => (
                  <div
                    className="why-panel-highlight"
                    key={highlight}
                  >
                    <CheckCircle2 size={18} />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>

              <div className="why-panel-actions">
                <Link
                  to="/contact"
                  className="why-panel-primary-btn"
                >
                  Explore Your Career Path
                  <ArrowRight size={18} />
                </Link>

                <a
                  href="tel:+919484794843"
                  className="why-panel-call-btn"
                >
                  <PhoneCall size={17} />
                  Call An Expert
                </a>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="why-skillserve-benefits">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <article
                  className="why-benefit-card"
                  key={benefit.id}
                >
                  <span className="why-benefit-number">
                    {benefit.number}
                  </span>

                  <div className="why-benefit-icon">
                    <Icon size={25} />
                  </div>

                  <div className="why-benefit-content">
                    <h3>{benefit.title}</h3>
                    <p>{benefit.description}</p>
                  </div>

                  <div className="why-benefit-bottom-line" />
                </article>
              );
            })}
          </div>
        </div>

        {/* Bottom trust strip */}
        <div className="why-skillserve-trust-strip">
          <div className="why-trust-intro">
            <div className="why-trust-intro-icon">
              <ShieldCheck size={24} />
            </div>

            <div>
              <span>Why Students Trust Us</span>
              <h3>Learning Designed Around Your Success</h3>
            </div>
          </div>

          <div className="why-trust-items">
            <div className="why-trust-item">
              <strong>100%</strong>
              <span>Practical Approach</span>
            </div>

            <div className="why-trust-divider" />

            <div className="why-trust-item">
              <strong>Expert</strong>
              <span>Career Guidance</span>
            </div>

            <div className="why-trust-divider" />

            <div className="why-trust-item">
              <strong>Industry</strong>
              <span>Focused Training</span>
            </div>

            <div className="why-trust-divider" />

            <div className="why-trust-item">
              <strong>Complete</strong>
              <span>Student Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSkillServe;