import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { 
  Folder, 
  ExternalLink, 
  Github, 
  Cpu, 
  Globe, 
  Database, 
  Brain,
  Layers,
  ArrowRight,
  Code2
} from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'AI Agent Workflow System',
    description: 'Multi-agent system built with CrewAI for automating complex business workflows. Features intelligent task delegation, context-aware decision making, and real-time collaboration between AI agents.',
    tags: ['CrewAI', 'Python', 'FastAPI', 'React'],
    icon: Brain,
    color: '#6366f1',
    category: 'AI',
    links: { demo: '#', github: '#' },
  },
  {
    id: 2,
    title: 'RAG Document Processor',
    description: 'Intelligent document processing system using Retrieval-Augmented Generation. Implements vector embeddings with pgvector, semantic search, and contextual answer generation from enterprise documents.',
    tags: ['RAG', 'LangChain', 'PostgreSQL', 'OpenAI'],
    icon: Database,
    color: '#06b6d4',
    category: 'AI',
    links: { demo: '#', github: '#' },
  },
  {
    id: 3,
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with Django REST Framework backend and React frontend. Features include real-time inventory, payment integration, and admin dashboard.',
    tags: ['Django REST', 'React', 'PostgreSQL', 'Redis'],
    icon: Globe,
    color: '#3b82f6',
    category: 'Full Stack',
    links: { demo: '#', github: '#' },
  },
  {
    id: 4,
    title: 'Cross-Platform Mobile App',
    description: 'Flutter-based mobile application with Firebase backend. Features real-time messaging, push notifications, and offline synchronization.',
    tags: ['Flutter', 'Firebase', 'WebSockets', 'Dart'],
    icon: Layers,
    color: '#ec4899',
    category: 'Mobile',
    links: { demo: '#', github: '#' },
  },
  {
    id: 5,
    title: 'Video Calling Platform',
    description: 'Real-time video conferencing application with WebRTC integration. Features screen sharing, chat, and recording capabilities.',
    tags: ['WebRTC', 'Node.js', 'Socket.io', 'React'],
    icon: Cpu,
    color: '#10b981',
    category: 'Full Stack',
    links: { demo: '#', github: '#' },
  },
  {
    id: 6,
    title: 'Workflow Automation Suite',
    description: 'Business process automation using n8n and custom integrations. Automates data synchronization between multiple SaaS platforms.',
    tags: ['n8n', 'Node.js', 'APIs', 'Docker'],
    icon: Code2,
    color: '#f59e0b',
    category: 'DevOps',
    links: { demo: '#', github: '#' },
  },
];

const categories = ['All', 'AI', 'Full Stack', 'Mobile', 'DevOps'];

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="relative py-20 sm:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-galaxy-pink/10 blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-galaxy-purple/10 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
          >
            <Folder className="w-4 h-4 text-galaxy-pink" />
            <span className="text-sm text-gray-300">Featured Projects</span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-6">
            <span className="text-white">My </span>
            <span className="text-gradient">Portfolio</span>
          </h2>

          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Showcasing projects that demonstrate my expertise in AI integration, 
            full-stack development, and modern web technologies.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`
                px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${activeCategory === category 
                  ? 'bg-gradient-to-r from-galaxy-purple to-galaxy-cyan text-white shadow-glow' 
                  : 'glass text-gray-300 hover:text-white hover:bg-white/10'}
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                className="group relative glass rounded-2xl overflow-hidden cursor-pointer"
              >
                {/* Project Card Content */}
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ 
                        background: `linear-gradient(135deg, ${project.color}20, ${project.color}10)`,
                        border: `1px solid ${project.color}40`,
                      }}
                    >
                      <project.icon className="w-6 h-6" style={{ color: project.color }} />
                    </div>
                    <div className="flex gap-2">
                      <motion.a
                        href={project.links.github}
                        className="w-8 h-8 rounded-lg glass flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Github className="w-4 h-4" />
                      </motion.a>
                      <motion.a
                        href={project.links.demo}
                        className="w-8 h-8 rounded-lg glass flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </motion.a>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-gradient transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 rounded-md text-xs font-medium"
                        style={{
                          background: `${project.color}15`,
                          color: project.color,
                          border: `1px solid ${project.color}30`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hover Effects */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-galaxy-purple/10 to-galaxy-cyan/10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Border Glow */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    boxShadow: `inset 0 0 0 1px ${project.color}40, 0 0 30px ${project.color}20`,
                  }}
                />

                {/* View Project Link */}
                <motion.div
                  className="absolute bottom-4 right-4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: hoveredProject === project.id ? 1 : 0, x: hoveredProject === project.id ? 0 : 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <span 
                    className="flex items-center gap-1 text-sm font-medium"
                    style={{ color: project.color }}
                  >
                    View Project
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Projects CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-12"
        >
          <motion.button
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass text-white font-medium hover:bg-white/10 transition-colors border border-galaxy-purple/30"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Projects
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
