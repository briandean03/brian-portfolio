import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import './Projects.css';

const Projects = () => {
  const sectionRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [particles, setParticles] = useState([]);

  // Parallax scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const cardsY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  // Generate particles
  useEffect(() => {
    const particleArray = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 5,
    }));
    setParticles(particleArray);
  }, []);

  const projects = [
    {
      id: 1,
      title: 'ETL Pipeline Optimization',
      category: 'Data Engineering',
      year: '2024',
      tech: ['Python', 'Airflow', 'PostgreSQL'],
      impact: '40% faster processing',
    },
    {
      id: 2,
      title: 'Cloud Infrastructure Migration',
      category: 'DevOps',
      year: '2024',
      tech: ['AWS', 'Terraform', 'Docker'],
      impact: '60% cost reduction',
    },
    {
      id: 3,
      title: 'Real-time Analytics Dashboard',
      category: 'Data Visualization',
      year: '2023',
      tech: ['React', 'D3.js', 'WebSocket'],
      impact: '5s latency → 200ms',
    },
    {
      id: 4,
      title: 'Automated Reporting System',
      category: 'Automation',
      year: '2023',
      tech: ['Python', 'Pandas', 'Plotly'],
      impact: '20hrs/week saved',
    },
  ];

  // Stagger variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.section
      className="projects"
      id="projects"
      ref={sectionRef}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0.1 }}
    >
      {/* Animated gradient background */}
      <motion.div
        className="projects-gradient"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        viewport={{ once: true, amount: 0.2 }}
      />

      {/* Floating particles */}
      <div className="projects-particles">
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
        className="projects-container"
        initial={{ y: 30 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, amount: 0.15 }}
      >
        <motion.div
          className="projects-meta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <span className="meta-index">02</span>
          <span className="meta-label">SELECTED WORK</span>
          <span className="meta-count">({projects.length})</span>
        </motion.div>

        <motion.div
          className="projects-cards"
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true, amount: 0.2 }}
          style={{ y: cardsY }}
        >
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              className="project-card"
              variants={cardVariants}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              whileHover={{
                y: -8,
                boxShadow: '0 12px 30px rgba(0,102,204,0.12)',
                scale: 1.02
              }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="project-card-header">
                <h3 className="project-title">{project.title}</h3>
                <div className="project-meta-info">
                  <span className="project-category">{project.category}</span>
                  <span className="project-year">{project.year}</span>
                </div>
              </div>

              <motion.div
                className="project-card-details"
                initial={{ opacity: 0, height: 0 }}
                animate={{
                  opacity: hoveredIndex === i ? 1 : 0,
                  height: hoveredIndex === i ? 'auto' : 0,
                }}
                transition={{ duration: 0.35 }}
              >
                <div className="project-tech">
                  {project.tech.map((tech, j) => (
                    <motion.span
                      key={j}
                      className="tech-badge"
                      whileHover={{
                        scale: 1.1,
                        backgroundColor: 'rgba(0, 102, 204, 0.15)'
                      }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
                <div className="project-impact">{project.impact}</div>
              </motion.div>
            </motion.div>
          ))}
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

export default Projects;
