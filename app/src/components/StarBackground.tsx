import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

const StarBackground = () => {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars: Star[] = [];
      for (let i = 0; i < 150; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 0.5,
          duration: Math.random() * 3 + 2,
          delay: Math.random() * 5,
          opacity: Math.random() * 0.7 + 0.3,
        });
      }
      setStars(newStars);
    };

    generateStars();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            backgroundColor: star.size > 1.5 ? '#06b6d4' : '#ffffff',
            boxShadow: star.size > 1.5 
              ? `0 0 ${star.size * 2}px rgba(6, 182, 212, 0.8)` 
              : `0 0 ${star.size}px rgba(255, 255, 255, 0.8)`,
          }}
          animate={{
            opacity: [star.opacity * 0.3, star.opacity, star.opacity * 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Shooting Stars */}
      <ShootingStars />
    </div>
  );
};

const ShootingStars = () => {
  const [shootingStars, setShootingStars] = useState<{ id: number; startX: number; startY: number }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newStar = {
        id: Date.now(),
        startX: Math.random() * 100,
        startY: Math.random() * 50,
      };
      setShootingStars(prev => [...prev.slice(-2), newStar]);
      
      setTimeout(() => {
        setShootingStars(prev => prev.filter(s => s.id !== newStar.id));
      }, 2000);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {shootingStars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute w-20 h-[2px] bg-gradient-to-r from-transparent via-galaxy-cyan to-transparent"
          style={{
            left: `${star.startX}%`,
            top: `${star.startY}%`,
            transform: 'rotate(-45deg)',
          }}
          initial={{ opacity: 0, x: 0, y: 0 }}
          animate={{ 
            opacity: [0, 1, 0],
            x: [0, 200],
            y: [0, 200],
          }}
          transition={{
            duration: 1.5,
            ease: "easeOut",
          }}
        />
      ))}
    </>
  );
};

export default StarBackground;
