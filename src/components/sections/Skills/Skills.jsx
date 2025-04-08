import React, { useRef } from "react";
import { motion } from "framer-motion";
import { TbBrandReact, TbBrandNextjs } from "react-icons/tb";
import {
  SiTypescript,
  SiTailwindcss,
  SiJavascript,
  SiNodedotjs,
  SiExpress,
  SiDjango,
  SiPython,
  SiMongodb,
  SiPostgresql,
  SiGit,
  SiGithub,
  SiVercel,
  SiNetlify,
  SiFirebase,
  SiFigma,
} from "react-icons/si";
const techIcons = [
  { icon: <TbBrandReact size={28} />, name: "React" },
  { icon: <TbBrandNextjs size={28} />, name: "Next.js" },
  { icon: <SiTypescript size={24} />, name: "TypeScript" },
  { icon: <SiJavascript size={24} />, name: "JavaScript" },
  { icon: <SiTailwindcss size={24} />, name: "Tailwind" },
];
const Skills = () => {
  const ref = useRef(null);
  const skillCategories = [
    {
      title: "Frontend",
      skills: [
        { name: "React.js", icon: <TbBrandReact size={20} /> },
        { name: "Next.js", icon: <TbBrandNextjs size={20} /> },
        { name: "TypeScript", icon: <SiTypescript size={20} /> },
        { name: "Tailwind CSS", icon: <SiTailwindcss size={20} /> },
        { name: "JavaScript", icon: <SiJavascript size={20} /> },
      ],
      icon: "💻",
    },
    {
      title: "Backend",
      skills: [
        { name: "Node.js", icon: <SiNodedotjs size={20} /> },
        { name: "Express.js", icon: <SiExpress size={20} /> },
        { name: "Django", icon: <SiDjango size={20} /> },
        { name: "Python", icon: <SiPython size={20} /> },
        { name: "MongoDB", icon: <SiMongodb size={20} /> },
        { name: "PostgreSQL", icon: <SiPostgresql size={20} /> },
      ],
      icon: "⚙️",
    },
    {
      title: "Dev Tools",
      skills: [
        { name: "Git & GitHub", icon: <SiGithub size={20} /> },
        { name: "Vercel", icon: <SiVercel size={20} /> },
        { name: "Netlify", icon: <SiNetlify size={20} /> },
        // { name: "REST APIs", icon: <FiCode size={20} /> },
        { name: "Firebase", icon: <SiFirebase size={20} /> },
      ],
      icon: "🛠️",
    },
    {
      title: "UI/UX",
      skills: [
        { name: "Figma", icon: <SiFigma size={20} /> },
        { name: "Responsive Design", icon: "📱" },
        { name: "Accessibility", icon: "♿" },
      ],
      icon: "🎨",
    },
  ];

  return (
    <section
      id="skills"
      ref={ref}
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-gray-900 dark:to-gray-800 snap-start"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-10"
            style={{
              width: Math.random() * 300 + 100,
              height: Math.random() * 300 + 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, #3b82f6, transparent 70%)`,
            }}
            animate={{
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
              rotate: [0, Math.random() * 360],
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Floating Tech Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {techIcons.map((tech, i) => (
          <motion.div
            key={i}
            className="absolute text-blue-400/20 dark:text-blue-600/20"
            style={{
              fontSize: `${Math.random() * 40 + 20}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              rotate: [0, Math.random() * 360],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            {tech.icon}
          </motion.div>
        ))}
      </div>
      <div className="container mx-auto px-6">
        {/* Section Title matching Home.jsx */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-12"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
            My Skills
          </span>
        </motion.h2>

        {/* Skills Grid with 3D effects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 relative overflow-hidden group"
            >
              {/* 3D floating effect background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ rotate: 0 }}
                whileHover={{ rotate: 2 }}
                transition={{ type: "spring", stiffness: 300 }}
              />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <motion.span
                    className="text-2xl"
                    animate={{
                      rotate: [0, 5, -5, 0],
                      y: [0, -3, 0],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                    }}
                  >
                    {category.icon}
                  </motion.span>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                    {category.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, i) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 * i }}
                      viewport={{ once: true }}
                      whileHover={{
                        y: -5,
                        scale: 1.05,
                        backgroundColor: "#3b82f6",
                        color: "white",
                        boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.3)",
                      }}
                      className="px-3 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm cursor-default transition-all duration-200 flex items-center gap-2"
                    >
                      {skill.icon}
                      {skill.name}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating tech icons matching Home.jsx */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          {[
            <TbBrandReact key="react" />,
            <TbBrandNextjs key="next" />,
            <SiTypescript key="ts" />,
            <SiJavascript key="js" />,
            <SiTailwindcss key="tailwind" />,
            <SiNodedotjs key="node" />,
            <SiDjango key="django" />,
            <SiFigma key="figma" />,
          ].map((Icon, i) => (
            <motion.div
              key={i}
              className="absolute text-blue-400/20 dark:text-blue-600/20"
              style={{
                fontSize: `${Math.random() * 40 + 20}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, Math.random() * 100 - 50],
                rotate: [0, Math.random() * 360],
              }}
              transition={{
                duration: Math.random() * 20 + 10,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            >
              {Icon}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
