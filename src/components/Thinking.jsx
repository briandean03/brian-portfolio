import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import './Thinking.css';

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

const writings = [
  {
    title: 'Learning Data Systems in Public',
    link: 'https://yourname.substack.com/p/example-1',
    tag: 'DATA',
  },
  {
    title: 'Notes on Automating Boring IT Work',
    link: 'https://yourname.substack.com/p/example-2',
    tag: 'SYSTEMS',
  },
  {
    title: 'Early Career Mistakes in Tech',
    link: 'https://yourname.substack.com/p/example-3',
    tag: 'CAREER',
  },
];

const Thinking = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  return (
    <motion.section
      className="thinking"
      id="thinking"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0.15 }}
    >
      {/* Animated gradient background */}
      <motion.div
        className="thinking-gradient"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        viewport={{ once: true, amount: 0.2 }}
      />

      <motion.div
        className="thinking-container"
        initial={{ y: isMobile || prefersReducedMotion ? 15 : 30 }}
        whileInView={{ y: 0 }}
        transition={{ duration: isMobile ? 0.5 : 0.8, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Section meta */}
        <motion.div
          className="thinking-meta"
          initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: isMobile ? 0.4 : 0.6, delay: isMobile ? 0.1 : 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <span className="meta-index">03</span>
          <span className="meta-label">THINKING</span>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="thinking-divider"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: isMobile ? 0.5 : 0.8, delay: isMobile ? 0.15 : 0.3, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.3 }}
        />

        {/* Horizontal scroll list */}
        <motion.div
          className="thinking-list"
          initial={{ opacity: 0, y: isMobile ? 12 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: isMobile ? 0.4 : 0.6, delay: isMobile ? 0.2 : 0.4 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          {writings.map((item, index) => (
            <motion.a
              key={item.title}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="thinking-item"
              initial={isMobile || prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
              whileInView={isMobile || prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
              transition={{ duration: isMobile ? 0.3 : 0.4, delay: (isMobile ? 0.3 : 0.5) + index * (isMobile ? 0.05 : 0.1) }}
              viewport={{ once: true, amount: 0.3 }}
              whileHover={!isMobile ? { y: -4, boxShadow: '0 8px 20px rgba(0,102,204,0.1)' } : {}}
            >
              <span className="thinking-tag">{item.tag}</span>
              <span className="thinking-title">{item.title}</span>
              <motion.span
                className="thinking-arrow"
                whileHover={!isMobile ? { x: 6 } : {}}
                transition={{ duration: isMobile ? 0.15 : 0.2 }}
              >
                ↗
              </motion.span>
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Thinking;
