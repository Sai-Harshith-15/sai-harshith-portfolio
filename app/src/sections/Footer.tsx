import { motion } from 'framer-motion';
import { Code2, Heart, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Navigation',
      links: [
        { name: 'Home', href: '#home' },
        { name: 'Skills', href: '#skills' },
        { name: 'About', href: '#about' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' },
      ],
    },
    {
      title: 'Technologies',
      links: [
        { name: 'React & Next.js', href: '#' },
        { name: 'Python & FastAPI', href: '#' },
        { name: 'AI & Machine Learning', href: '#' },
        { name: 'Cloud & DevOps', href: '#' },
      ],
    },
    {
      title: 'Connect',
      links: [
        { name: 'LinkedIn', href: '#' },
        { name: 'GitHub', href: '#' },
        { name: 'Twitter', href: '#' },
        { name: 'Email', href: 'mailto:hello@developer.ai' },
      ],
    },
  ];

  return (
    <footer className="relative py-16 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-galaxy-navy via-galaxy-navy/90 to-transparent" />

      {/* Top Border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-galaxy-purple/50 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <motion.a
              href="#home"
              className="flex items-center gap-2 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-galaxy-purple to-galaxy-cyan flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-white" />
                </div>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-galaxy-purple to-galaxy-cyan blur-lg opacity-50" />
              </div>
              <span className="text-xl font-display font-bold text-white">
                Dev<span className="text-galaxy-cyan">.</span>AI
              </span>
            </motion.a>

            <p className="text-gray-400 text-sm mb-6 max-w-sm">
              Full Stack & AI Developer specializing in building intelligent 
              applications with modern technologies. Let's create something amazing together.
            </p>

            {/* Back to Top Button */}
            <motion.button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg glass text-sm text-gray-300 hover:text-white transition-colors"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowUp className="w-4 h-4" />
              Back to Top
            </motion.button>
          </div>

          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 text-sm hover:text-galaxy-cyan transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm text-center sm:text-left">
              © {currentYear} Dev.AI. All rights reserved.
            </p>

            <p className="flex items-center gap-1 text-gray-400 text-sm">
              Made with <Heart className="w-4 h-4 text-galaxy-pink fill-galaxy-pink" /> using React & Tailwind
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-10 left-10 w-20 h-20 border border-galaxy-purple/10 rounded-full" />
      <div className="absolute top-20 right-20 w-16 h-16 border border-galaxy-cyan/10 rounded-full" />
    </footer>
  );
};

export default Footer;
