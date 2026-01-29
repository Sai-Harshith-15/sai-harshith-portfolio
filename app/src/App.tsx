import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import OrbitSkills from './sections/OrbitSkills';
import About from './sections/About';
import Projects from './sections/Projects';
import Stats from './sections/Stats';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import StarBackground from './components/StarBackground';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-x-hidden">
      {/* Animated Background */}
      <motion.div 
        className="fixed inset-0 z-0"
        style={{ y: backgroundY }}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: 'url(/galaxy.jpg)',
            filter: 'brightness(0.4)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-galaxy-navy/80 via-galaxy-navy/60 to-galaxy-navy/90" />
      </motion.div>

      {/* Star Background */}
      <StarBackground />

      {/* Content */}
      <div className="relative z-10">
        <AnimatePresence>
          {isLoaded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Navigation />
              <main>
                <Hero />
                <OrbitSkills />
                <About />
                <Projects />
                <Stats />
                <Contact />
              </main>
              <Footer />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-galaxy-purple via-galaxy-cyan to-galaxy-pink z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />
    </div>
  );
}

export default App;
