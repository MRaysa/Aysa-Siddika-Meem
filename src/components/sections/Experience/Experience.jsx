import React from "react";
import { motion } from "framer-motion";
import { FiBriefcase, FiMapPin, FiCalendar, FiExternalLink } from "react-icons/fi";

const Experience = () => {
  const experiences = [
    {
      title: "Software Engineer",
      company: "Sharetasking",
      location: "Remote",
      period: "Present",
      type: "Full-time",
      description: [
        "Developing and maintaining full-stack web applications using modern technologies",
        "Collaborating with cross-functional teams to deliver high-quality software solutions",
        "Implementing responsive and user-friendly interfaces with React and Next.js",
        "Building scalable backend services and RESTful APIs",
      ],
      technologies: ["React", "Next.js", "Node.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
      current: true,
    },
  ];

  return (
    <section
      id="experience"
      className="relative py-24 overflow-hidden bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-gray-900 dark:to-gray-800"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-10"
            style={{
              width: Math.random() * 200 + 100,
              height: Math.random() * 200 + 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, #8b5cf6, transparent 70%)`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
            }}
            transition={{
              duration: Math.random() * 20 + 15,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
              Experience
            </span>
          </h2>
          <motion.div
            className="w-32 h-1 mx-auto bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
          />
          <p className="mt-6 text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            My professional journey and the amazing teams I've had the privilege to work with
          </p>
        </motion.div>

        {/* Experience Cards */}
        <div className="max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500 hidden md:block" />

              {/* Timeline dot */}
              <motion.div
                className="absolute left-6 top-8 w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 border-4 border-white dark:border-gray-900 hidden md:block z-10"
                animate={exp.current ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              />

              {/* Card */}
              <div className="md:ml-20 mb-8">
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="relative p-8 rounded-3xl backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 border border-white/20 dark:border-gray-700/30 shadow-xl overflow-hidden group"
                >
                  {/* Current badge */}
                  {exp.current && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute top-4 right-4"
                    >
                      <span className="px-4 py-1.5 bg-gradient-to-r from-green-400 to-emerald-500 text-white text-sm font-medium rounded-full flex items-center gap-2">
                        <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        Currently Working
                      </span>
                    </motion.div>
                  )}

                  {/* Header */}
                  <div className="mb-6">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 dark:from-blue-500/30 dark:to-purple-500/30 flex items-center justify-center shadow-lg">
                        <FiBriefcase className="text-3xl text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
                          {exp.title}
                        </h3>
                        <p className="text-xl text-blue-600 dark:text-blue-400 font-semibold">
                          {exp.company}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Meta info */}
                  <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <FiMapPin className="text-purple-500" />
                      <span>{exp.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiCalendar className="text-purple-500" />
                      <span>{exp.period}</span>
                    </div>
                    <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-xs font-medium">
                      {exp.type}
                    </span>
                  </div>

                  {/* Description */}
                  <ul className="space-y-3 mb-6">
                    {exp.description.map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * i }}
                        viewport={{ once: true }}
                        className="flex items-start gap-3 text-gray-600 dark:text-gray-300"
                      >
                        <span className="w-2 h-2 mt-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex-shrink-0" />
                        {item}
                      </motion.li>
                    ))}
                  </ul>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, i) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.05 * i }}
                        viewport={{ once: true }}
                        whileHover={{ y: -3, scale: 1.05 }}
                        className="px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium border border-blue-100 dark:border-blue-800/30"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>

                  {/* Hover gradient */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: "linear-gradient(135deg, rgba(59,130,246,0.05) 0%, rgba(147,51,234,0.05) 100%)",
                    }}
                  />

                  {/* Corner decorations */}
                  <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-blue-400/20 rounded-tl-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-purple-400/20 rounded-br-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
