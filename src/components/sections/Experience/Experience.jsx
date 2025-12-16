import { motion } from "framer-motion";
import { FiBriefcase, FiMapPin, FiCalendar, FiChevronRight, FiZap, FiCode } from "react-icons/fi";

// Animated background particles
const FloatingParticle = ({ delay, size, x, y }) => (
  <motion.div
    className="absolute rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20"
    style={{ width: size, height: size, left: `${x}%`, top: `${y}%` }}
    animate={{
      y: [0, -30, 0],
      x: [0, 15, 0],
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.6, 0.3],
    }}
    transition={{
      duration: 5,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

// Glowing orb component
const GlowingOrb = ({ color, size, position }) => (
  <motion.div
    className="absolute rounded-full blur-3xl"
    style={{
      width: size,
      height: size,
      background: color,
      ...position,
    }}
    animate={{
      scale: [1, 1.3, 1],
      opacity: [0.3, 0.5, 0.3],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

const Experience = () => {
  const experiences = [
    {
      title: "Software Engineer",
      company: "Sharetasking",
      logo: <FiCode className="text-4xl text-white" />,
      location: "Remote",
      period: "Present",
      type: "Full-time",
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-500/10 to-cyan-500/10",
      description: [
        "Building scalable full-stack web applications with cutting-edge technologies",
        "Architecting robust backend systems and RESTful APIs",
        "Creating pixel-perfect, responsive UI components",
        "Collaborating in agile sprints to deliver features on time",
      ],
      technologies: ["React", "Next.js", "Node.js", "TypeScript", "PostgreSQL", "Tailwind CSS", "Convex", "Fastify"],
      current: true,
    },
  ];

  return (
    <section
      id="experience"
      className="relative min-h-screen py-24 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <GlowingOrb
          color="rgba(59, 130, 246, 0.15)"
          size={400}
          position={{ top: "10%", left: "-5%" }}
        />
        <GlowingOrb
          color="rgba(147, 51, 234, 0.15)"
          size={350}
          position={{ bottom: "10%", right: "-5%" }}
        />
        <GlowingOrb
          color="rgba(6, 182, 212, 0.1)"
          size={300}
          position={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
        />

        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <FloatingParticle
            key={i}
            delay={i * 0.3}
            size={Math.random() * 20 + 10}
            x={Math.random() * 100}
            y={Math.random() * 100}
          />
        ))}

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-6"
          >
            <FiZap className="animate-pulse" />
            Career Journey
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 dark:from-blue-400 dark:via-purple-400 dark:to-cyan-400">
              Experience
            </span>
          </h2>

          <motion.div
            className="w-40 h-1.5 mx-auto rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
          />
        </motion.div>

        {/* Main Experience Card */}
        <div className="max-w-5xl mx-auto">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Animated border gradient */}
              <motion.div
                className="absolute -inset-[2px] rounded-[2rem] bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 opacity-70"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  backgroundSize: "200% 200%",
                }}
              />

              {/* Card content */}
              <div className="relative p-8 md:p-12 rounded-[2rem] bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-500 to-transparent rounded-full blur-3xl" />
                  <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-500 to-transparent rounded-full blur-3xl" />
                </div>

                {/* Current badge with animation */}
                {exp.current && (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="absolute top-6 right-6 md:top-8 md:right-8"
                  >
                    <div className="relative">
                      <motion.div
                        className="absolute inset-0 bg-green-400 rounded-full blur-md"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.2, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <span className="relative flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-green-400 to-emerald-500 text-white text-sm font-bold rounded-full shadow-lg">
                        <motion.span
                          className="w-2 h-2 bg-white rounded-full"
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                        Currently Working
                      </span>
                    </div>
                  </motion.div>
                )}

                {/* Header section */}
                <div className="flex flex-col md:flex-row md:items-start gap-6 mb-10 relative z-10">
                  {/* Logo/Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    className="relative"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-xl opacity-50"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                    <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-2xl">
                      {exp.logo}
                    </div>
                  </motion.div>

                  {/* Title and company */}
                  <div className="flex-1">
                    <motion.h3
                      className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      {exp.title}
                    </motion.h3>
                    <motion.p
                      className="text-2xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      @ {exp.company}
                    </motion.p>

                    {/* Meta info */}
                    <motion.div
                      className="flex flex-wrap gap-4 mt-4"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <span className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <FiMapPin className="text-blue-500" />
                        {exp.location}
                      </span>
                      <span className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <FiCalendar className="text-purple-500" />
                        {exp.period}
                      </span>
                      <span className="px-4 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold">
                        {exp.type}
                      </span>
                    </motion.div>
                  </div>
                </div>

                {/* Description with animated bullets */}
                <div className="mb-10 relative z-10">
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
                    <FiBriefcase className="text-blue-500" />
                    What I Do
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {exp.description.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * i }}
                        viewport={{ once: true }}
                        whileHover={{ x: 5 }}
                        className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-700/30 border border-gray-200/50 dark:border-gray-700/50"
                      >
                        <motion.div
                          className="mt-1 w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0"
                          whileHover={{ scale: 1.2, rotate: 180 }}
                          transition={{ type: "spring" }}
                        >
                          <FiChevronRight className="text-white text-sm" />
                        </motion.div>
                        <span className="text-gray-700 dark:text-gray-300">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div className="relative z-10">
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
                    <FiZap className="text-cyan-500" />
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {exp.technologies.map((tech, i) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.05 * i, type: "spring" }}
                        viewport={{ once: true }}
                        whileHover={{
                          y: -5,
                          scale: 1.1,
                          boxShadow: "0 10px 30px -10px rgba(59, 130, 246, 0.5)"
                        }}
                        className="px-5 py-2.5 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 dark:from-blue-500/20 dark:via-purple-500/20 dark:to-cyan-500/20 text-gray-800 dark:text-gray-200 rounded-xl text-sm font-semibold border border-blue-200/50 dark:border-blue-700/30 cursor-default backdrop-blur-sm"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-6 left-6 w-20 h-20 border-t-2 border-l-2 border-blue-300/30 dark:border-blue-600/30 rounded-tl-3xl" />
                <div className="absolute bottom-6 right-6 w-20 h-20 border-b-2 border-r-2 border-purple-300/30 dark:border-purple-600/30 rounded-br-3xl" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom decoration */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="flex justify-center mt-16"
        >
          <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600" />
            <span className="text-sm font-medium">More experiences coming soon</span>
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
