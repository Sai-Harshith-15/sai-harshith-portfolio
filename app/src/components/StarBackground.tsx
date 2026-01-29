import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

interface ShootingStar {
  id: number;
  x: number;
  y: number;
  direction: "left-to-right" | "right-to-left";
  duration: number;
  scale: number;
  isBurst?: boolean;
}

const StarBackground = () => {
  const [stars, setStars] = useState<Star[]>([]);
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);
  const [burstMode, setBurstMode] = useState(true);

  // Generate static twinkling stars
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

  // Create shooting star helper
  const createShootingStar = useCallback(
    (id: number, isBurst = false): ShootingStar => ({
      id,
      x: Math.random() * (isBurst ? 60 : 100),
      y: Math.random() * (isBurst ? 40 : 50),
      direction: Math.random() > 0.5 ? "left-to-right" : "right-to-left",
      duration: isBurst ? 1.2 + Math.random() * 0.8 : 1.5 + Math.random() * 1.5,
      scale: 0.6 + Math.random() * 0.6,
      isBurst,
    }),
    [],
  );

  // BURST MODE: Dramatic entrance to make users stop and look
  useEffect(() => {
    const burstStars = Array.from({ length: 10 }, (_, i) =>
      createShootingStar(Date.now() + i, true),
    );
    setShootingStars(burstStars);

    const timer = setTimeout(() => {
      setBurstMode(false);
      setShootingStars((prev) => prev.slice(0, 3));
    }, 3000);

    return () => clearTimeout(timer);
  }, [createShootingStar]);

  // AMBIENT MODE: Occasional random shooting stars (elegant, not chaotic)
  useEffect(() => {
    if (burstMode) return;

    const spawnStar = () => {
      setShootingStars((prev) => {
        // Keep only stars that are less than 4 seconds old
        const fresh = prev.filter((s) => Date.now() - s.id < 4000);

        // Only spawn if less than 2 stars currently visible (premium feel)
        if (fresh.length < 2 && Math.random() > 0.3) {
          return [...fresh, createShootingStar(Date.now())];
        }
        return fresh;
      });
    };

    // First ambient star after burst ends (1 second later)
    const initialDelay = setTimeout(spawnStar, 1000);

    // Then random intervals between 4-10 seconds (organic feel)
    let intervalId: ReturnType<typeof setTimeout>;

    const scheduleNext = () => {
      const randomDelay = 4000 + Math.random() * 6000; // 4-10 seconds
      intervalId = setTimeout(() => {
        spawnStar();
        scheduleNext(); // Schedule next one recursively
      }, randomDelay);
    };

    scheduleNext();

    return () => {
      clearTimeout(initialDelay);
      clearTimeout(intervalId);
    };
  }, [burstMode, createShootingStar]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {/* Static Twinkling Stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            backgroundColor: star.size > 1.5 ? "#06b6d4" : "#ffffff",
            boxShadow:
              star.size > 1.5
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

      {/* Enhanced Shooting Stars */}
      <AnimatePresence>
        {shootingStars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
            }}
            initial={{
              opacity: 0,
              x: 0,
              y: 0,
              scale: 0,
            }}
            animate={{
              opacity: [0, 1, 1, 0],
              x: star.direction === "left-to-right" ? 400 : -400,
              y: 400,
              scale: star.scale,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: star.duration,
              ease: "linear",
              opacity: {
                times: [0, 0.1, 0.9, 1],
                duration: star.duration,
              },
            }}
          >
            {/* Rotating container for direction */}
            <div
              style={{
                transform: `rotate(${star.direction === "left-to-right" ? "45deg" : "-45deg"})`,
                transformOrigin: "0 0",
              }}
            >
              {/* Star Head - Glowing tip */}
              <div
                className="absolute w-1.5 h-1.5 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"
                style={{
                  boxShadow: `
                    0 0 10px 2px rgba(255,255,255,0.9),
                    0 0 20px 4px rgba(6,182,212,0.6),
                    0 0 30px 6px rgba(139,92,246,0.4)
                  `,
                }}
              />

              {/* Primary Trail */}
              <div
                className="absolute h-[2px] origin-left"
                style={{
                  width: star.isBurst ? "180px" : "120px",
                  background: `linear-gradient(${star.direction === "left-to-right" ? "90deg" : "270deg"}, 
                    rgba(255,255,255,1) 0%, 
                    rgba(6,182,212,0.9) 15%, 
                    rgba(139,92,246,0.5) 50%, 
                    transparent 100%)`,
                  boxShadow: "0 0 8px rgba(6, 182, 212, 0.6)",
                  left: "0px",
                  top: "0px",
                }}
              />

              {/* Secondary Aura Trail (wider, softer) */}
              <div
                className="absolute h-[1px] origin-left opacity-60"
                style={{
                  width: star.isBurst ? "250px" : "180px",
                  background: `linear-gradient(${star.direction === "left-to-right" ? "90deg" : "270deg"}, 
                    rgba(6,182,212,0) 0%, 
                    rgba(6,182,212,0.4) 30%, 
                    rgba(139,92,246,0.2) 60%, 
                    transparent 100%)`,
                  left: "0px",
                  top: "0.5px",
                }}
              />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Burst Mode Glow Overlay */}
      <AnimatePresence>
        {burstMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 50% 30%, rgba(139,92,246,0.1) 0%, transparent 50%)",
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default StarBackground;
