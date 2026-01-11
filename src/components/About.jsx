import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import './About.css';

const About = () => {
  // Add the missing ref
  const sectionRef = useRef(null);
  const [particles, setParticles] = useState([]);

  // Parallax scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const gradientOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Delay variables for animation
  const baselineDelay = 0;
  const structureDelay = 0.4;
  const detailDelay = 0.8;

  // Generate particles for background
  useEffect(() => {
    const particleArray = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 5,
    }));
    setParticles(particleArray);
  }, []);

  // Stagger animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="about" id="about" ref={sectionRef}>
      {/* Animated gradient background with parallax */}
      <motion.div
        className="about-gradient"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        viewport={{ once: true, amount: 0.2 }}
        style={{ opacity: gradientOpacity }}
      />

      {/* Floating particles */}
      <div className="about-particles">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="particle"
            initial={{
              x: `${particle.x}%`,
              y: `${particle.y}%`,
              opacity: 0,
            }}
            animate={{
              y: [`${particle.y}%`, `${particle.y - 20}%`, `${particle.y}%`],
              opacity: [0, 0.4, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: 'easeInOut',
            }}
            style={{
              width: particle.size,
              height: particle.size,
            }}
          />
        ))}
      </div>

      {/* Hero Section - Full Viewport with parallax */}
      <motion.div
        className="about-hero-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        style={{ y: heroY }}
      >
        <div className="about-container">
          {/* Hero / Personal Intro - Staggered */}
          <motion.div
            className="about-hero"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h1 className="hero-title" variants={itemVariants}>
              Hi, I'm{' '}
              <motion.span
                className="hero-name"
                whileHover={{
                  textShadow: '0 0 8px rgba(0, 102, 204, 0.6)',
                  transition: { duration: 0.3 },
                }}
              >
                Brian
              </motion.span>
              .
            </motion.h1>

            <motion.p
              className="hero-subtitle"
              variants={itemVariants}
              whileHover={{
                x: 4,
                transition: { duration: 0.3 },
              }}
            >
              Junior IT & Data Professional with experience in data pipelines, system integrations, and analytics.
            </motion.p>

            <motion.div className="hero-accent-line" variants={itemVariants} />

            {/* Scroll indicator */}
            <motion.div
              className="scroll-indicator"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <motion.div
                className="scroll-dot"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Details Section - Scrollable Content */}
      <motion.div
        className="about-details-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, amount: 0.15 }}
      >
        <div className="about-container">
          {/* Main Content Grid - Staggered */}
          <motion.div
            className="about-content"
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Primary Column */}
            <div className="about-primary">
              <motion.div className="about-role" variants={itemVariants}>
                <h1>Transforming data into actionable insights through automation and integration.</h1>
              </motion.div>

              <motion.div className="about-bio" variants={itemVariants}>
                <p>
                  I'm a Junior IT & Data Professional specializing in data pipelines, ETL workflows, and system integrations.
                  With hands-on experience in Python, SQL, and cloud platforms, I build solutions that streamline data
                  processing and enhance business intelligence.
                </p>
                <p style={{ marginTop: '1.5rem' }}>
                  My work spans database management, API integrations, and dashboard development, with a proven track
                  record of reducing manual work through automation and improving reporting efficiency across consulting
                  and public-sector environments.
                </p>
              </motion.div>

              {/* Vertical divider */}
              <motion.div
                className="about-divider-vertical"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true, amount: 0.2 }}
              />
            </div>

            {/* Secondary Column - Technical Specs - Staggered */}
            <motion.div
              className="about-secondary"
              initial="hidden"
              whileInView="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.15,
                    delayChildren: 0.3,
                  },
                },
              }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="about-specs">
                <motion.div className="spec-group" variants={itemVariants}>
                  <div className="spec-label">Education</div>
                  <div className="spec-items">
                    <div className="spec-item">BSc Computing Science</div>
                    <div className="spec-item">University of Stirling</div>
                    <div className="spec-item">Sept 2022 – May 2025</div>
                  </div>
                </motion.div>

                <motion.div className="spec-group" variants={itemVariants}>
                  <div className="spec-label">Core Skills</div>
                  <div className="spec-items">
                    <div className="spec-item">Python, SQL, Pandas</div>
                    <div className="spec-item">Power BI, Excel, Supabase</div>
                    <div className="spec-item">React, REST APIs, PostgreSQL</div>
                    <div className="spec-item">ETL Workflows, Data Automation</div>
                  </div>
                </motion.div>

                <motion.div className="spec-group" variants={itemVariants}>
                  <div className="spec-label">Certifications</div>
                  <div className="spec-items">
                    <div className="spec-item">Microsoft Azure AI Fundamentals</div>
                    <div className="spec-item">Python for Everybody</div>
                    <div className="spec-item">Award in General Insurance</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Bottom line */}
          <motion.div
            className="about-line-bottom"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: detailDelay + 0.3, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, amount: 0.2 }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default About;
