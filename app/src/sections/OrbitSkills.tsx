import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Code2, 
  Database, 
  Server, 
  Cpu, 
  Globe, 
  Layers, 
  Zap,
  Box,
  Cloud,
  Workflow,
  MessageSquare,
  Smartphone,
  GitBranch,
  Container,
  BrainCircuit
} from 'lucide-react';

// Skill categories with icons
const skillsData = {
  frontend: [
    { name: 'React', icon: Code2, color: '#61DAFB' },
    { name: 'Next.js', icon: Globe, color: '#ffffff' },
    { name: 'TypeScript', icon: Layers, color: '#3178C6' },
    { name: 'Tailwind CSS', icon: Zap, color: '#06B6D4' },
    { name: 'Flutter', icon: Smartphone, color: '#02569B' },
  ],
  backend: [
    { name: 'Python', icon: Code2, color: '#3776AB' },
    { name: 'Django REST', icon: Server, color: '#092E20' },
    { name: 'Node.js', icon: Server, color: '#339933' },
    { name: 'FastAPI', icon: Zap, color: '#009688' },
    { name: 'PostgreSQL', icon: Database, color: '#336791' },
  ],
  ai: [
    { name: 'CrewAI', icon: BrainCircuit, color: '#6366f1' },
    { name: 'RAG Systems', icon: MessageSquare, color: '#06b6d4' },
    { name: 'LangChain', icon: Workflow, color: '#ec4899' },
    { name: 'OpenAI API', icon: Cpu, color: '#10a37f' },
    { name: 'Vector DBs', icon: Database, color: '#8b5cf6' },
  ],
  devops: [
    { name: 'Docker', icon: Container, color: '#2496ED' },
    { name: 'Azure', icon: Cloud, color: '#0078D4' },
    { name: 'Git', icon: GitBranch, color: '#F05032' },
    { name: 'Redis', icon: Database, color: '#DC382D' },
    { name: 'WebSockets', icon: Box, color: '#FF6B6B' },
  ],
};

interface OrbitRingProps {
  skills: { name: string; icon: React.ElementType; color: string }[];
  radius: number;
  duration: number;
  direction?: 'clockwise' | 'counterclockwise';
}

const OrbitRing = ({ skills, radius, duration, direction = 'clockwise' }: OrbitRingProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const angleStep = 360 / skills.length;
  const rotationDirection = direction === 'clockwise' ? 360 : -360;

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      animate={{ rotate: isPaused ? undefined : rotationDirection }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "linear",
        repeatType: "loop",
      }}
      style={{
        animationPlayState: isPaused ? 'paused' : 'running',
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Orbit Path */}
      <div 
        className="absolute rounded-full border border-dashed border-white/10"
        style={{
          width: radius * 2,
          height: radius * 2,
        }}
      />

      {/* Skills */}
      {skills.map((skill, index) => {
        const angle = (index * angleStep * Math.PI) / 180;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const isHovered = hoveredIndex === index;

        return (
          <motion.div
            key={skill.name}
            className="absolute"
            style={{
              x,
              y,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: isHovered ? 1.3 : 1, 
              opacity: 1,
            }}
            transition={{ 
              scale: { type: "spring", stiffness: 300, damping: 20 },
              opacity: { duration: 0.5, delay: index * 0.1 }
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Counter-rotation to keep icon upright */}
            <motion.div
              animate={{ rotate: isPaused ? undefined : -rotationDirection }}
              transition={{
                duration: duration,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop",
              }}
              style={{
                animationPlayState: isPaused ? 'paused' : 'running',
              }}
            >
              <div
                className={`
                  relative group cursor-pointer
                  w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20
                  rounded-2xl flex items-center justify-center
                  transition-all duration-300
                  ${isHovered ? 'z-20' : 'z-10'}
                `}
                style={{
                  background: `linear-gradient(135deg, ${skill.color}20, ${skill.color}10)`,
                  border: `1px solid ${skill.color}40`,
                  boxShadow: isHovered 
                    ? `0 0 30px ${skill.color}60, 0 0 60px ${skill.color}30`
                    : `0 0 15px ${skill.color}20`,
                }}
              >
                <skill.icon 
                  className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 transition-transform duration-300"
                  style={{ color: skill.color }}
                />

                {/* Tooltip */}
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{ 
                    opacity: isHovered ? 1 : 0, 
                    y: isHovered ? -50 : 10,
                    scale: isHovered ? 1 : 0.8 
                  }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-full left-1/2 -translate-x-1/2 whitespace-nowrap"
                >
                  <div 
                    className="px-3 py-1.5 rounded-lg text-sm font-medium text-white"
                    style={{
                      background: `linear-gradient(135deg, ${skill.color}40, ${skill.color}20)`,
                      border: `1px solid ${skill.color}60`,
                    }}
                  >
                    {skill.name}
                  </div>
                </motion.div>

                {/* Glow Effect */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                  style={{
                    background: `radial-gradient(circle, ${skill.color}30 0%, transparent 70%)`,
                    filter: 'blur(10px)',
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

const OrbitSkills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="relative py-20 sm:py-32 overflow-hidden">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-24">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
          >
            <Cpu className="w-4 h-4 text-galaxy-purple" />
            <span className="text-sm text-gray-300">Technical Expertise</span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-6">
            <span className="text-white">Skills in </span>
            <span className="text-gradient">Orbit</span>
          </h2>

          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            My technology stack spans frontend, backend, AI integration, and DevOps. 
            Hover over the orbits to pause and explore each skill.
          </p>
        </motion.div>
      </div>

      {/* Orbit System */}
      <div className="relative flex items-center justify-center min-h-[600px] sm:min-h-[700px] md:min-h-[800px]">
        {/* Central Hub */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative z-20"
        >
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full flex items-center justify-center">
            {/* Pulsing Rings */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-galaxy-purple/30"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-galaxy-cyan/20"
              animate={{ scale: [1.1, 1.3, 1.1], opacity: [0.3, 0.1, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
            />
            
            {/* Center Content */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-galaxy-purple via-galaxy-cyan to-galaxy-pink p-[2px]">
              <div className="w-full h-full rounded-full bg-galaxy-navy flex flex-col items-center justify-center">
                <BrainCircuit className="w-8 h-8 sm:w-10 sm:h-10 text-galaxy-cyan mb-1" />
                <span className="text-xs sm:text-sm font-bold text-white">AI + Full</span>
                <span className="text-[10px] sm:text-xs text-gray-400">Stack</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Orbit Rings Container */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Inner Ring - Frontend */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <OrbitRing
              skills={skillsData.frontend}
              radius={140}
              duration={25}
              direction="clockwise"
            />
          </motion.div>

          {/* Middle Ring - Backend */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <OrbitRing
              skills={skillsData.backend}
              radius={220}
              duration={35}
              direction="counterclockwise"
            />
          </motion.div>

          {/* Outer Ring - AI & DevOps */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <OrbitRing
              skills={[...skillsData.ai, ...skillsData.devops]}
              radius={300}
              duration={45}
              direction="clockwise"
            />
          </motion.div>
        </div>

        {/* Background Glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] rounded-full bg-galaxy-purple/5 blur-[100px]" />
        </div>
      </div>

      {/* Skill Categories Legend */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Frontend', color: '#61DAFB', count: skillsData.frontend.length },
            { name: 'Backend', color: '#3776AB', count: skillsData.backend.length },
            { name: 'AI/ML', color: '#6366f1', count: skillsData.ai.length },
            { name: 'DevOps', color: '#2496ED', count: skillsData.devops.length },
          ].map((category, index) => (
            <motion.div
              key={category.name}
              className="glass rounded-xl p-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.4 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div 
                className="w-3 h-3 rounded-full mx-auto mb-2"
                style={{ backgroundColor: category.color, boxShadow: `0 0 10px ${category.color}` }}
              />
              <div className="text-white font-medium text-sm">{category.name}</div>
              <div className="text-gray-400 text-xs">{category.count} technologies</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default OrbitSkills;
