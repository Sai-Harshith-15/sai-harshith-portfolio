import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  User, 
  Target, 
  Rocket, 
  Award, 
  TrendingUp,
  Brain,
  Code,
  Sparkles
} from 'lucide-react';

const highlights = [
  {
    icon: Brain,
    title: 'AI Integration Specialist',
    description: 'Expert in CrewAI, RAG systems, and LLM integration with 35-40% industry growth rate.',
    color: '#6366f1',
  },
  {
    icon: Code,
    title: 'Full Stack Developer',
    description: '2+ years building scalable applications with React, Python, and modern frameworks.',
    color: '#06b6d4',
  },
  {
    icon: Rocket,
    title: 'Fast Learner',
    description: 'Rapidly adapting to emerging technologies like LangChain, LangGraph, and Vector DBs.',
    color: '#ec4899',
  },
  {
    icon: Target,
    title: 'Problem Solver',
    description: 'Building end-to-end solutions from concept to production deployment.',
    color: '#3b82f6',
  },
];

const careerPaths = [
  {
    title: 'AI-Integrated Full Stack',
    match: '92%',
    salary: '12-28 LPA',
    description: 'Primary focus on Python + React + AI Integration',
  },
  {
    title: 'Python Backend + AI',
    match: '85%',
    salary: '15-35 LPA',
    description: 'Deep backend expertise with AI microservices',
  },
  {
    title: 'Mobile-First Full Stack',
    match: '78%',
    salary: '10-22 LPA',
    description: 'Flutter + Firebase + Cross-platform development',
  },
];

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-20 sm:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-galaxy-cyan/10 blur-[120px]" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 rounded-full bg-galaxy-purple/10 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
          >
            <User className="w-4 h-4 text-galaxy-cyan" />
            <span className="text-sm text-gray-300">About Me</span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-6">
            <span className="text-white">Passionate </span>
            <span className="text-gradient">Developer</span>
          </h2>

          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Positioned at the intersection of Full Stack Development and AI Integration, 
            I bring a unique combination of traditional software engineering skills and 
            cutting-edge AI capabilities.
          </p>
        </motion.div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="glass rounded-2xl p-6 group cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                  style={{ 
                    background: `linear-gradient(135deg, ${item.color}20, ${item.color}10)`,
                    border: `1px solid ${item.color}40`,
                  }}
                >
                  <item.icon className="w-6 h-6" style={{ color: item.color }} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Career Paths Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp className="w-6 h-6 text-galaxy-purple" />
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
              Recommended Career Paths
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {careerPaths.map((path, index) => (
              <motion.div
                key={path.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.03, y: -8 }}
                className="relative glass rounded-2xl p-6 overflow-hidden group"
              >
                {/* Match Badge */}
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r from-galaxy-purple to-galaxy-cyan text-white text-sm font-bold">
                  {path.match} Match
                </div>

                <div className="mb-4">
                  <Award className="w-8 h-8 text-galaxy-cyan mb-3" />
                  <h4 className="text-lg font-semibold text-white mb-2">{path.title}</h4>
                  <p className="text-gray-400 text-sm mb-4">{path.description}</p>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <div className="text-xs text-gray-500 mb-1">Expected Salary Range</div>
                  <div className="text-xl font-bold text-gradient-cyan">{path.salary}</div>
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-galaxy-purple/10 to-galaxy-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quote Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="relative glass rounded-3xl p-8 sm:p-12 text-center overflow-hidden"
        >
          <Sparkles className="absolute top-6 left-6 w-8 h-8 text-galaxy-purple/30" />
          <Sparkles className="absolute bottom-6 right-6 w-8 h-8 text-galaxy-cyan/30" />
          
          <blockquote className="relative z-10">
            <p className="text-xl sm:text-2xl md:text-3xl font-display font-medium text-white mb-6 leading-relaxed">
              "The market is rewarding developers who can bridge traditional software engineering 
              <span className="text-gradient"> with AI integration</span>."
            </p>
            <footer className="text-gray-400">
              — Career Guidance Report 2025-2026
            </footer>
          </blockquote>

          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-galaxy-purple/5 via-transparent to-galaxy-cyan/5" />
        </motion.div>
      </div>
    </section>
  );
};

export default About;
