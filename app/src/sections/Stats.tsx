import { useRef, useEffect, useState } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import {
  Briefcase,
  Code2,
  Users,
  Award,
  TrendingUp,
  Clock,
  Zap,
  Target,
} from "lucide-react";

interface StatItemProps {
  value: number;
  suffix?: string;
  label: string;
  icon: React.ElementType;
  color: string;
  delay: number;
}

const AnimatedCounter = ({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const spring = useSpring(0, {
    stiffness: 50,
    damping: 20,
    duration: 2,
  });

  const display = useTransform(spring, (current) => Math.floor(current));

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, spring, value]);

  useEffect(() => {
    const unsubscribe = display.on("change", (latest) => {
      setDisplayValue(latest);
    });
    return unsubscribe;
  }, [display]);

  return (
    <span ref={ref}>
      {displayValue}
      {suffix}
    </span>
  );
};

const StatItem = ({
  value,
  suffix,
  label,
  icon: Icon,
  color,
  delay,
}: StatItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="glass rounded-2xl p-6 text-center group cursor-pointer"
    >
      <div
        className="w-14 h-14 rounded-xl mx-auto mb-4 flex items-center justify-center transition-transform group-hover:scale-110"
        style={{
          background: `linear-gradient(135deg, ${color}20, ${color}10)`,
          border: `1px solid ${color}40`,
          boxShadow: `0 0 20px ${color}20`,
        }}
      >
        <Icon className="w-7 h-7" style={{ color }} />
      </div>

      <div
        className="text-4xl sm:text-5xl font-display font-bold mb-2"
        style={{ color }}
      >
        <AnimatedCounter value={value} suffix={suffix} />
      </div>

      <div className="text-gray-400 text-sm">{label}</div>
    </motion.div>
  );
};

const stats = [
  {
    value: 2,
    suffix: "+",
    label: "Years Experience",
    icon: Clock,
    color: "#6366f1",
  },
  {
    value: 15,
    suffix: "+",
    label: "Technologies",
    icon: Code2,
    color: "#06b6d4",
  },
  {
    value: 20,
    suffix: "+",
    label: "Projects Completed",
    icon: Briefcase,
    color: "#ec4899",
  },
  {
    value: 10,
    suffix: "+",
    label: "Happy Clients",
    icon: Users,
    color: "#3b82f6",
  },
];

const achievements = [
  {
    icon: TrendingUp,
    title: "35-40%",
    subtitle: "AI Role Growth",
    description: "Annual growth rate in AI-integrated positions",
    color: "#6366f1",
  },
  {
    icon: Target,
    title: "50%+",
    subtitle: "Demand Gap",
    description: "Unfilled AI developer positions globally",
    color: "#06b6d4",
  },
  {
    icon: Zap,
    title: "$3.5B",
    subtitle: "Market by 2030",
    description: "Projected Agentic AI market size",
    color: "#ec4899",
  },
  {
    icon: Award,
    title: "92%",
    subtitle: "Career Match",
    description: "Alignment with AI-Integrated Full Stack path",
    color: "#3b82f6",
  },
];

const Stats = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-20 sm:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-galaxy-purple/5 blur-[150px]" />
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
            <TrendingUp className="w-4 h-4 text-galaxy-purple" />
            <span className="text-sm text-gray-300">By The Numbers</span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-6">
            <span className="text-white">Impact </span>
            <span className="text-gradient">Metrics</span>
          </h2>

          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Quantifiable results and market positioning that demonstrate the
            value I bring to every project.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-20">
          {stats.map((stat, index) => (
            <StatItem key={stat.label} {...stat} delay={index * 0.1} />
          ))}
        </div>

        {/* Market Position Section */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <h3 className="text-2xl sm:text-3xl font-display font-bold text-white text-center mb-10">
            Market Position & Opportunities
          </h3>
        </motion.div> */}

        {/* Achievements Grid */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.03, y: -8 }}
              className="glass rounded-2xl p-6 text-center group cursor-pointer relative overflow-hidden"
            > */}
        {/* Icon */}
        {/* <div 
                className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center transition-transform group-hover:scale-110"
                style={{ 
                  background: `linear-gradient(135deg, ${item.color}20, ${item.color}10)`,
                  border: `1px solid ${item.color}40`,
                }}
              >
                <item.icon className="w-6 h-6" style={{ color: item.color }} />
              </div> */}

        {/* Value */}
        {/* <div 
                className="text-3xl sm:text-4xl font-display font-bold mb-1"
                style={{ color: item.color }}
              >
                {item.title}
              </div> */}

        {/* Subtitle */}
        {/* <div className="text-white font-medium mb-2">{item.subtitle}</div> */}

        {/* Description */}
        {/* <div className="text-gray-400 text-sm">{item.description}</div> */}

        {/* Hover Glow */}
        {/* <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at center, ${item.color}10 0%, transparent 70%)`,
                }}
              />
            </motion.div>
          ))}
        </div> */}

        {/* Salary Progression */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-16 glass rounded-3xl p-8"
        >
          <h3 className="text-xl sm:text-2xl font-display font-bold text-white text-center mb-8">
            Projected Salary Growth
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                period: "Current (2 years)",
                range: "6-12 LPA",
                level: "Mid-level Developer",
                color: "#6366f1",
              },
              {
                period: "6 months (AI skills)",
                range: "12-18 LPA",
                level: "AI-Integrated Developer",
                color: "#06b6d4",
              },
              {
                period: "12 months",
                range: "18-28 LPA",
                level: "Senior AI Developer",
                color: "#ec4899",
              },
            ].map((item, index) => (
              <motion.div
                key={item.period}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 1 + index * 0.1 }}
                className="relative"
              >
                <div
                  className="absolute left-0 top-0 bottom-0 w-1 rounded-full"
                  style={{ background: item.color }}
                />
                <div className="pl-6">
                  <div className="text-gray-400 text-sm mb-1">
                    {item.period}
                  </div>
                  <div
                    className="text-2xl sm:text-3xl font-bold mb-1"
                    style={{ color: item.color }}
                  >
                    {item.range}
                  </div>
                  <div className="text-white text-sm">{item.level}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div> */}
      </div>
    </section>
  );
};

export default Stats;
