import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import './About.css';

const certifications = [
  {
    name: 'Microsoft Azure AI Fundamentals',
    file: '/certificates/azure-ai-900.png',
    type: 'image',
  },
  {
    name: 'Python for Everybody',
    file: '/certificates/python-for-everybody.pdf',
    type: 'pdf',
  },
  {
    name: 'Award in General Insurance',
    file: '/certificates/insurance.png',
    type: 'image',
  },
];

const skills = [
  { name: 'Python', category: 'Programming & Scripting' },
  { name: 'SQL', category: 'Programming & Scripting' },
  { name: 'Java', category: 'Programming & Scripting' },
  { name: 'JavaScript & TypeScript', category: 'Programming & Scripting' },
  { name: 'n8n', category: 'Programming & Scripting' },
  { name: 'Pandas', category: 'Programming & Scripting' },
  { name: 'NumPy', category: 'Programming & Scripting' },
  { name: 'Dash', category: 'Programming & Scripting' },
  { name: 'React', category: 'Web & Integration' },
  { name: 'REST APIs', category: 'Web & Integration' },
  { name: 'HTML/CSS', category: 'Web & Integration' },
  { name: 'WordPress', category: 'Web & Integration' },
  { name: 'Primavera P6', category: 'Web & Integration' },
  { name: 'Microsoft Azure', category: 'Cloud & Platforms' },
  { name: 'Vercel', category: 'Cloud & Platforms' },
  { name: 'Render', category: 'Cloud & Platforms' },
  { name: 'Supabase', category: 'Cloud & Platforms' },
  { name: 'XGBoost', category: 'Machine Learning' },
  { name: 'Gradient Boosting', category: 'Machine Learning' },
  { name: 'SVR', category: 'Machine Learning' },
  { name: 'Regression Models', category: 'Machine Learning' },
  { name: 'Reinforcement Learning', category: 'Machine Learning' },
];

const About = () => {
  // Add the missing ref
  const sectionRef = useRef(null);
  const [particles, setParticles] = useState([]);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [selectedCert, setSelectedCert] = useState(null);

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
              Junior IT & Data Professional with experience designing data platforms, ETL pipelines, automation workflows, and analytics solutions across consulting and public-sector environments.
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
                <h1>Transforming complex operational data into automated reporting systems and actionable insights through data engineering, analytics, and software solutions.</h1>
              </motion.div>

              <motion.div className="about-bio" variants={itemVariants}>
                <ul className="bio-highlights">
                  <motion.li
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                  >
                    Designing <span className="highlight">enterprise data platforms</span> and <span className="highlight">ETL pipelines</span> for construction project controls
                  </motion.li>
                  <motion.li
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 }}
                  >
                    Building <span className="highlight">Java</span> and <span className="highlight">React/TypeScript</span> integrations connecting Primavera P6 with cloud databases
                  </motion.li>
                  <motion.li
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="highlight">Automation workflows</span> with <span className="highlight">n8n</span>, database triggers, and Microsoft services
                  </motion.li>
                  <motion.li
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.25 }}
                  >
                    <span className="highlight">Machine learning</span> and <span className="highlight">predictive analytics</span> with Python, XGBoost, and Power BI
                  </motion.li>
                  <motion.li
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    Replacing <span className="highlight">manual Excel-based workflows</span> with scalable automated digital platforms
                  </motion.li>
                  <motion.li
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.35 }}
                  >
                    Background across <span className="highlight">consulting</span> and <span className="highlight">public-sector</span> environments in the UAE
                  </motion.li>
                </ul>
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
                  <div className="skills-tags">
                    {skills.map((skill, idx) => (
                      <motion.div
                        key={skill.name}
                        className="skill-tag"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.03 * idx, duration: 0.3 }}
                        whileHover={{
                          scale: 1.08,
                          y: -2,
                          boxShadow: '0 4px 12px rgba(0, 102, 204, 0.25)'
                        }}
                        whileTap={{ scale: 0.95 }}
                        onHoverStart={() => setHoveredSkill(skill)}
                        onHoverEnd={() => setHoveredSkill(null)}
                      >
                        {skill.name}
                        {hoveredSkill?.name === skill.name && (
                          <motion.span
                            className="skill-category"
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                          >
                            {skill.category}
                          </motion.span>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.div className="spec-group" variants={itemVariants}>
                  <div className="spec-label">Certifications</div>
                  <div className="spec-items">
                    {certifications.map((cert) => (
                      <button
                        key={cert.name}
                        className="spec-item cert-item"
                        onClick={() => setSelectedCert(cert)}
                      >
                        {cert.name}
                        <span className="cert-view-hint">View ↗</span>
                      </button>
                    ))}
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
      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            className="cert-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              className="cert-modal"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="cert-modal-header">
                <span className="cert-modal-title">{selectedCert.name}</span>
                <button className="cert-modal-close" onClick={() => setSelectedCert(null)}>✕</button>
              </div>
              <div className="cert-modal-body">
                {selectedCert.type === 'image' ? (
                  <img src={selectedCert.file} alt={selectedCert.name} className="cert-modal-img" />
                ) : (
                  <iframe
                    src={selectedCert.file}
                    title={selectedCert.name}
                    className="cert-modal-pdf"
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default About;
