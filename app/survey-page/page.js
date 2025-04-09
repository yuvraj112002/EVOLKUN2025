'use client';
import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import styles from './SurveyPage.module.scss';
import AnimatedButton from '../components/AnimatedButton';
import MagneticButton from '../components/MagneticButton';
import ExplodingButton from '../components/ExplodingButton';
import InputField from '../components/InputField';
import Dropdown from '../components/Dropdown';

export default function SurveyPage() {
  const [selectedServices, setSelectedServices] = useState([]);
  const [showAllServices, setShowAllServices] = useState(false);
  const [name, setName] = useState('');
  const [business, setBusiness] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [websiteGoal, setWebsiteGoal] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [budgetRange, setBudgetRange] = useState('');
  const [timeline, setTimeline] = useState('');

  const hiddenServicesRef = useRef(null);

  const services = [
    'Branding', 'Web Development', 'App Development', 'SEO', 'Marketing',
    'UI/UX', 'Content Writing', 'Social Media', 'Graphic Design', 'Video Editing', 
  ];

  const businessTypes = [
    'E-commerce / Online Store',
    'Restaurant / Cafe / Food Business',
    'Corporate / Professional Services',
    'Health & Wellness / Healthcare Clinic',
    'Retail / Local Shop',
    'Creative / Artist / Portfolio',
    'Educational / Coaching / Online Courses',
    'Non-Profit / NGO / Community Projects',
    'Technology / SaaS / Startup',
    'Other (Please specify)'
  ];

  const websiteGoals = [
    'Generate More Leads & Sales',
    'Enhance Online Visibility & Brand Awareness',
    'Showcase Portfolio & Creative Work',
    'Sell Products Online (E-commerce)',
    'Inform & Educate (Blog/Content)',
    'Build Trust & Credibility for My Brand',
    'Other (Please specify)'
  ];

  const targetAudiences = [
    'Local Consumers / Community',
    'Regional / National Audience',
    'Global Audience / International Customers',
    'Business-to-Business (B2B)',
    'Young Professionals / Millennials',
    'Families / Local Homebuyers',
    'Other (Please specify)'
  ];

  const budgetRanges = [
    '₹10,000 – ₹20,000',
    '₹20,000 – ₹30,000',
    '₹30,000 – ₹50,000',
    '₹50,000+',
    'Not Sure / Need Guidance'
  ];

  const timelines = [
    'Immediate / Urgent Launch Needed',
    'Within 2 Weeks',
    'Within 1 Month',
    'Flexible – Planning Ahead'
  ];

  const visibleServices = services.slice(0, 5);
  const hiddenServices = services.slice(5);

  const toggleService = (service) => {
    setSelectedServices(prev =>
      prev.includes(service)
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  useEffect(() => {
    if (hiddenServicesRef.current) {
      const cards = hiddenServicesRef.current.children;

      if (showAllServices) {
        gsap.fromTo(cards,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.3,
            stagger: 0.1,
            ease: 'power2.out',
            onStart: () => {
              hiddenServicesRef.current.style.visibility = 'visible';
              hiddenServicesRef.current.style.height = 'auto';
            }
          }
        );
      } else {
        gsap.to(cards, {
          opacity: 0,
          y: 20,
          duration: 0.2,
          stagger: 0.05,
          ease: 'power2.in',
          onComplete: () => {
            hiddenServicesRef.current.style.visibility = 'hidden';
            hiddenServicesRef.current.style.height = 0;
          }
        });
      }
    }
  }, [showAllServices]);

  return (
    <div className={styles.surveyContainer}>
      <h1 className={styles.surveyHeading}>Get a free quote</h1>
      <p className={styles.subHeading}>We offer personalized packages for you.</p>

      <div className={styles.formContainer}>
        <button className={styles.closeButton}>×</button>

        <p className={styles.description}>
          Fill in the form below so that we can calculate a price for you
        </p>
        <div className={styles.separator}></div>

        <div className={styles.formGroup}>
          <label>Please Select The Service you want.</label>
          <div className={styles.servicesGrid}>
            {visibleServices.map((service) => (
              <div
                key={service}
                className={`${styles.serviceCard} ${selectedServices.includes(service) ? styles.selected : ''}`}
                onClick={() => toggleService(service)}
              >
                {service}
              </div>
            ))}
          </div>

          {hiddenServices.length > 0 && (
            <>
              <div
                ref={hiddenServicesRef}
                className={styles.servicesGrid}
                style={{
                  visibility: showAllServices ? 'visible' : 'hidden',
                  height: showAllServices ? 'auto' : 0,
                  overflow: 'hidden',
                }}
              >
                {hiddenServices.map((service) => (
                  <div
                    key={service}
                    className={`${styles.serviceCard} ${selectedServices.includes(service) ? styles.selected : ''}`}
                    onClick={() => toggleService(service)}
                  >
                    {service}
                  </div>
                ))}
              </div>

              <button
                type="button"
                className={styles.seeMoreButton}
                onClick={() => setShowAllServices(!showAllServices)}
              >
                {showAllServices ? 'See Less' : `See More (+${hiddenServices.length})`}
              </button>
            </>
          )}
        </div>

        <div className={styles.dropdownGroup}>
          <Dropdown label="What type of business are you building your website for?" options={businessTypes} value={businessType} onChange={(e) => setBusinessType(e.target.value)} required />
          <Dropdown label="What is the main objective of your new website?" options={websiteGoals} value={websiteGoal} onChange={(e) => setWebsiteGoal(e.target.value)} required />
          <Dropdown label="Who is your target audience for this website?" options={targetAudiences} value={targetAudience} onChange={(e) => setTargetAudience(e.target.value)} required />
          <Dropdown label="What is your estimated budget for developing your website?" options={budgetRanges} value={budgetRange} onChange={(e) => setBudgetRange(e.target.value)} required />
          <Dropdown label="When do you need your website to be live?" options={timelines} value={timeline} onChange={(e) => setTimeline(e.target.value)} required />
        </div>

        <button type="submit" className={styles.submitButton}>Get My Quote</button>

        <div>
          <AnimatedButton variant="primary" pulse={true} magnetic={true} onClick={() => console.log('Primary button clicked!')}>
            Get My Quote
          </AnimatedButton>
        </div>

        <div>
          <MagneticButton onClick={() => console.log('Clicked!')} magneticStrength={0.4}>
            Get Started
          </MagneticButton>
          <MagneticButton className={styles.secondary} magneticStrength={0.2}>
            Learn More
          </MagneticButton>
        </div>

        <div>
          <ExplodingButton onClick={() => console.log('Button clicked!')} className={styles.customButton}>
            Click Me!
          </ExplodingButton>
        </div>
      </div>
    </div>
  );
}
