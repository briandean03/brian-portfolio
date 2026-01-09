import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      className="theme-toggle"
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <motion.div
        className="toggle-track"
        animate={{
          backgroundColor: theme === 'dark' ? '#0066cc' : '#e0e0e0'
        }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="toggle-thumb"
          animate={{
            x: theme === 'dark' ? 22 : 2,
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        >
          {theme === 'light' ? '☀️' : '🌙'}
        </motion.div>
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
