import React from "react";
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
  SiGithub,
  SiVercel,
  SiFirebase,
  SiFigma,
} from "react-icons/si";

const SkillMeter = ({ name, icon, percentage }) => {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center">
          <span className="text-xl mr-2">{icon}</span>
          <span className="font-medium text-gray-700 dark:text-gray-300">
            {name}
          </span>
        </div>
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {percentage}%
        </span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          transition={{ duration: 1.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

const TechStackSection = () => {
  const skills = [
    { name: "React", icon: <TbBrandReact />, percentage: 95 },
    { name: "JavaScript", icon: <SiJavascript />, percentage: 90 },
    { name: "TypeScript", icon: <SiTypescript />, percentage: 85 },
    { name: "Next.js", icon: <TbBrandNextjs />, percentage: 88 },
    { name: "Node.js", icon: <SiNodedotjs />, percentage: 87 },
    { name: "Tailwind CSS", icon: <SiTailwindcss />, percentage: 92 },
    { name: "Express", icon: <SiExpress />, percentage: 83 },
    { name: "Python", icon: <SiPython />, percentage: 80 },
    { name: "GitHub", icon: <SiGithub />, percentage: 94 },
    { name: "Figma", icon: <SiFigma />, percentage: 78 },
  ];

  return (
    <section
      id="skills"
      className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-gray-900 dark:to-gray-800"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400"
          >
            My Skill Mastery
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-600 dark:text-gray-300"
          >
            Technologies I've mastered with proficiency levels
          </motion.p>
        </div>

        {/* Skill Meters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <SkillMeter
                name={skill.name}
                icon={skill.icon}
                percentage={skill.percentage}
              />
            </motion.div>
          ))}
        </div>

        {/* Floating Tech Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          {skills.map((skill, i) => (
            <motion.div
              key={i}
              className="absolute text-blue-400/10 dark:text-blue-600/10"
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
              {skill.icon}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
