import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import './Navigation.css';

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('about');
  const { scrollYProgress } = useScroll();

  const sections = [
    { id: 'about', label: 'Overview', index: '01' },
    { id: 'experience', label: 'Experience', index: '02' }, // NEW SECTION
    { id: 'projects', label: 'Work', index: '03' },          // UPDATED INDEX
    { id: 'thinking', label: 'Thinking', index: '04' },     // UPDATED INDEX
    { id: 'contact', label: 'Connect', index: '05' },       // UPDATED INDEX
  ];

  // Rail reacts subtly to scroll depth
  const railOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);
  const railX = useTransform(scrollYProgress, [0, 0.05], [-12, 0]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (!element) return;

        const offsetTop = element.offsetTop;
        const offsetBottom = offsetTop + element.offsetHeight;

        if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      className="index-rail"
      style={{ opacity: railOpacity, x: railX }}
      transition={{ ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="index-rail-content">
        {sections.map((section) => {
          const isActive = activeSection === section.id;

          return (
            <motion.button
              key={section.id}
              className={`index-item ${isActive ? 'active' : ''}`}
              onClick={() => handleNavClick(section.id)}
              whileHover={{ x: 6 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Active indicator */}
              <div className="index-item-marker">
                <motion.div
                  className="index-item-dot"
                  animate={{
                    scale: isActive ? 1 : 0,
                    opacity: isActive ? 1 : 0,
                  }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>

              {/* Content */}
              <div className="index-item-content">
                <span className="index-item-number">{section.index}</span>

                <motion.span
                  className="index-item-label"
                  animate={{
                    opacity: isActive ? 1 : 0,
                    x: isActive ? 0 : -8,
                  }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  {section.label}
                </motion.span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default Navigation;
