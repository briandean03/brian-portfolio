import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import './Experience.css';

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
};

const experiences = [
  {
    role: "Junior IT & Data Professional",
    company: "2p2c Project Management Consultants Dubai",
    date: "Oct 2025 – Present",
    bullets: [
      "Managed relational databases, data pipelines, and ETL workflows supporting internal business applications and reporting systems",
      "Built and maintained API integrations between internal platforms and third-party services including Supabase, Power BI, and external REST APIs",
      "Supported and enhanced internal web platforms and tools built with React and Supabase, including authentication, data flows, and role-based access",
      "Diagnosed and resolved backend, SaaS, and web application issues across database, API, and hosting layers to maintain system reliability",
      "Automated recurring data processing and reporting tasks using Python and SQL, reducing manual work and improving consistency",
      "Worked closely with consultants and stakeholders on data validation, documentation, and integration troubleshooting for live project systems",
    ],
  },
  {
    role: "Data Science Intern",
    company: "Ras Al Khaimah Municipality – Energy Efficiency and Renewables Sector, Ras Al Khaimah",
    date: "June – September 2025",
    bullets: [
      "Automated data extraction and transformation using Python (Pandas, REST APIs), reducing reporting time by 40%",
      "Built a Utility Tracker with forecasting and tariff-based cost analysis for 200+ accounts, cutting manual data entry by 80%",
      "Developed automated Excel pipelines and Power BI / Python Dash dashboards to visualize energy KPIs and support data-driven decisions",
      "Collaborated with engineers to translate technical models into clear, actionable insights for stakeholders",
    ],
  },
  {
    role: "Information Technology Intern",
    company: "Swedish Technology Dubai",
    date: "June–August 2024",
    bullets: [
      "Designed, developed, and deployed a fully functional client website using WordPress, HTML, CSS, and JavaScript",
      "Performed debugging, testing, and optimization of web applications to improve performance and user experience",
    ],
  },
];

const Experience = () => {
  const sectionRef = useRef(null);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const [particles, setParticles] = useState([]);

  // Smooth spring for line animation - disable on mobile
  const lineHeight = useSpring(scrollYProgress, {
    stiffness: isMobile ? 100 : 200,
    damping: isMobile ? 30 : 20
  });

  // Parallax for timeline - disabled on mobile
  const timelineY = useTransform(scrollYProgress, [0, 1], [isMobile ? 0 : 50, isMobile ? 0 : -50]);

  // Generate particles
  useEffect(() => {
    const particleArray = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 5,
    }));
    setParticles(particleArray);
  }, []);

  // Stagger variants - simplified for mobile
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.1 : 0.2,
        delayChildren: isMobile ? 0.05 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: isMobile || prefersReducedMotion ? -10 : -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: isMobile ? 0.4 : 0.6,
        ease: [0.22, 1, 0.36, 1]
      },
    },
  };

  return (
    <motion.section
      className="experience"
      id="experience"
      ref={sectionRef}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0.1 }}
    >
      {/* Animated gradient background */}
      <motion.div
        className="experience-gradient"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        viewport={{ once: true, amount: 0.2 }}
      />

      {/* Floating particles */}
      <div className="experience-particles">
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

      <motion.div
        className="experience-container"
        initial={{ y: 30 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, amount: 0.15 }}
      >
        <motion.h2
          className="experience-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Experience
        </motion.h2>

        <motion.div
          className="timeline"
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true, amount: 0.1 }}
          style={{ y: isMobile ? 0 : timelineY }}
        >
          {/* Animated vertical line */}
          <motion.div
            className="timeline-line"
            style={{ scaleY: lineHeight }}
          />

          {experiences.map((exp, i) => {
            const isExpanded = expandedIndex === i;
            return (
              <motion.div
                className={`timeline-item ${isExpanded ? 'expanded' : ''}`}
                key={i}
                variants={itemVariants}
              >
                <motion.div
                  className="timeline-marker"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    type: isMobile || prefersReducedMotion ? "tween" : "spring",
                    stiffness: 500,
                    damping: 25,
                    delay: i * (isMobile ? 0.05 : 0.1),
                    duration: isMobile ? 0.3 : undefined
                  }}
                  whileHover={!isMobile ? { scale: 1.3, backgroundColor: '#0066cc' } : {}}
                  animate={isExpanded ? { backgroundColor: '#0066cc', scale: 1.2 } : {}}
                />

                <motion.div
                  className="timeline-content"
                  whileHover={!isMobile ? { x: 8 } : {}}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="timeline-header-clickable"
                    onClick={() => toggleExpand(i)}
                    whileTap={{ scale: 0.98, backgroundColor: 'rgba(0, 102, 204, 0.08)' }}
                  >
                    <div className="timeline-header">
                      <h3 className="timeline-role">{exp.role}</h3>
                      <span className="timeline-date">{exp.date}</span>
                    </div>
                    <div className="timeline-header-row">
                      <span className="timeline-company">{exp.company}</span>
                      <motion.span
                        className="expand-indicator"
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {isExpanded ? '−' : '+'}
                      </motion.span>
                    </div>
                    <span className="timeline-hint">
                      {isExpanded ? 'Tap to collapse' : `${exp.bullets.length} highlights · Tap to expand`}
                    </span>
                  </motion.div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.ul
                        className="timeline-bullets"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      >
                        {exp.bullets.map((bullet, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{
                              delay: 0.05 * idx,
                              duration: 0.3
                            }}
                          >
                            {bullet}
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="scroll-dot"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Experience;
