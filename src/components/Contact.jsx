import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import './Contact.css';

const Contact = () => {
  const sectionRef = useRef(null);
  const [particles, setParticles] = useState([]);

  // Parallax scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  const contacts = [
    { label: 'EMAIL', value: 'your.email@domain.com', link: 'mailto:your.email@domain.com', protocol: 'SMTP' },
    { label: 'GITHUB', value: 'github.com/username', link: 'https://github.com/username', protocol: 'HTTPS' },
    { label: 'LINKEDIN', value: 'linkedin.com/in/username', link: 'https://linkedin.com/in/username', protocol: 'HTTPS' },
  ];

  const baselineDelay = 0;
  const structureDelay = 0.3;
  const detailDelay = 0.6;

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

  // Stagger variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: detailDelay,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="contact" id="contact" ref={sectionRef}>
      {/* Animated gradient background */}
      <motion.div
        className="contact-gradient"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />

      {/* Floating particles */}
      <div className="contact-particles">
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

      <div className="contact-container">

        {/* Section metadata */}
        <motion.div
          className="contact-meta"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: baselineDelay }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <span className="meta-index">03</span>
          <span className="meta-label">CONNECT</span>
        </motion.div>

        {/* Top border */}
        <motion.div
          className="contact-line-top"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: structureDelay, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.2 }}
        />

        {/* Contact grid - Staggered with parallax */}
        <motion.div
          className="contact-grid"
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true, amount: 0.2 }}
          style={{ y: contentY }}
        >
          {contacts.map((contact) => (
            <motion.a
              key={contact.label}
              href={contact.link}
              className="contact-item"
              variants={itemVariants}
              whileHover={{
                scale: 1.02,
                boxShadow: '0 8px 20px rgba(0, 102, 204, 0.1)',
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="contact-item-border"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 0.2,
                  ease: [0.22, 1, 0.36, 1]
                }}
                viewport={{ once: true, amount: 0.2 }}
              />

              <div className="contact-item-content">
                <div className="contact-item-header">
                  <motion.span
                    className="contact-protocol"
                    whileHover={{ color: '#0066cc' }}
                  >
                    {contact.protocol}
                  </motion.span>
                  <span className="contact-label">{contact.label}</span>
                </div>
                <div className="contact-value">{contact.value}</div>
                <motion.div
                  className="contact-arrow"
                  whileHover={{ x: 6, scale: 1.2 }}
                  transition={{ duration: 0.2 }}
                >
                  →
                </motion.div>
              </div>
            </motion.a>
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

        {/* Footer */}
        <motion.div
          className="contact-footer"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: detailDelay + 1.4 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div
            className="contact-footer-border"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: detailDelay + 1.5, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, amount: 0.2 }}
          />
          <div className="contact-footer-content">
            <div className="footer-status">
              <motion.span
                className="status-dot"
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
              <span className="status-text">AVAILABLE FOR OPPORTUNITIES</span>
            </div>
            <div className="footer-meta">
              <span>© 2024</span>
              <span className="footer-divider">•</span>
              <span>Built with React + Framer Motion</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Contact;
