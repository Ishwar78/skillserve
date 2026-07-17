import React from 'react';
import { CheckCircle } from 'lucide-react';
import './StartToSuccess.css';

const steps = [
  {
    num: '01',
    title: 'Choose Your Course',
    desc: 'Browse our industry-aligned courses and pick the one that matches your career goals.',
    color: 'step-blue',
  },
  {
    num: '02',
    title: 'Enroll & Start Learning',
    desc: 'Join live classes, hands-on workshops and industry-simulated practical sessions.',
    color: 'step-orange',
  },
  {
    num: '03',
    title: 'Get Certified',
    desc: 'Earn an NCrF-aligned certificate recognized by top companies across India.',
    color: 'step-green',
  },
  {
    num: '04',
    title: 'Land Your Dream Job',
    desc: 'Our dedicated placement team connects you with 100+ hiring partners.',
    color: 'step-yellow',
  },
];

// const highlights = [
//   'Industry 4.0 Curriculum',
//   'Hands-on Practical Training',
//   'NCrF Recognized Certificates',
//   '100+ Placement Partners',
//   'Expert Industry Mentors',
//   'Job Assistance for Life',
// ];

const StartToSuccess = () => {
  return (
    <section className="start-to-success">
      <div className="sts-blob sts-blob--1"></div>
      <div className="sts-blob sts-blob--2"></div>
      <div className="container">
        <div className="sts-header">
          <span className="subtitle">YOUR JOURNEY</span>
          <h2 className="sts-title">Start to <span>Success</span></h2>
          <p className="sts-sub">
            From zero to hero — our proven 4-step system has helped thousands land jobs in top companies.
          </p>
        </div>

        <div className="sts-steps">
          {steps.map((step, i) => (
            <React.Fragment key={step.num}>
              <div className={`sts-step ${step.color}`}>
                <div className="sts-step-num">{step.num}</div>
                <h3 className="sts-step-title">{step.title}</h3>
                <p className="sts-step-desc">{step.desc}</p>
              </div>
              {i < steps.length - 1 && <div className="sts-connector"><span></span></div>}
            </React.Fragment>
          ))}
        </div>

        

        <div className="sts-cta">
          <a href="/contact" className="sts-btn-primary">Start Your Journey Today →</a>
   
        </div>
      </div>
    </section>
  );
};

export default StartToSuccess;
