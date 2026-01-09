import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import './Hero.css';

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  // Nike-style scroll kinetics - scale + blur + opacity
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '60%']);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.6], [1, 0.8, 0]);
  const blur = useTransform(scrollYProgress, [0, 0.5], [0, 8]);

  const title = "CRAFTING DIGITAL\nEXPERIENCES";
  const words = title.split('\n');

  const letterSpacing = useTransform(scrollYProgress, [0, 0.5], ['0em', '-0.03em']);
  
  //Depth drift on scroll
  const depthY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);


  return (
    <section className="hero" id="home" ref={containerRef}>
      <motion.div
        className="hero-container"
        whileHover={{scale: 1.01}}
        transition={{duration: 0.6, ease: [0.19, 1, 0.22, 1]}}
        style={{
          y: depthY,
          opacity,
          scale,
          filter: useTransform(blur, (value) => `blur(${value}px)`)
        }}
      >
        <div className="hero-content">
          {words.map((line, lineIndex) => (
            <div key={lineIndex} className="hero-line">
              {line.split('').map((char, charIndex) => (
                <motion.span
                  key={`${lineIndex}-${charIndex}`}
                  className="hero-char"
                  initial={{ opacity: 0, y: 120, rotateX: -90, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
                  transition={{
                    duration: 1.2,
                    delay: (lineIndex * 0.4) + (charIndex * 0.025),
                    ease: [0.19, 1.0, 0.22, 1.0] // easeOutExpo
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}

                  <motion.div
                    className="hero-content"
                    style={{ letterSpacing }}
                  ></motion.div>

                </motion.span>
              ))}
            </div>
          ))}
        </div>

        <motion.div
          className="hero-subtitle"
          initial={{ opacity: 0, y: 60, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{
            delay: 1.8,
            duration: 1.4,
            ease: [0.19, 1.0, 0.22, 1.0]
          }}
        >
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <p>Sed do eiusmod tempor incididunt ut labore.</p>
        </motion.div>

        <motion.div
          className="hero-scroll-indicator"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 1.2, ease: [0.19, 1.0, 0.22, 1.0] }}
        >
          <motion.div
            className="scroll-line"
            animate={{
              scaleY: useTransform(scrollYProgress, [0, 0.2], [1, 0]),
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: [0.45, 0, 0.55, 1],
              repeatDelay: 0.2
            }}
          />
          <span>Scroll</span>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero-gradient"
        style={{
          opacity: useTransform(scrollYProgress, [0, 0.4], [0, 1])
        }}
      />
    </section>
  );
};

export default Hero;
