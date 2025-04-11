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

const OrbitingCircles = ({
  children,
  radius = 150,
  size = 40,
  delay = 0,
  reverse = false,
}) => {
  return (
    <div className="relative" style={{ width: radius * 2, height: radius * 2 }}>
      {React.Children.map(children, (child, i) => {
        const angle = i * (360 / React.Children.count(children)) + delay;
        const radians = (angle * Math.PI) / 180;
        const x = radius + radius * Math.cos(radians) * (reverse ? -1 : 1);
        const y = radius + radius * Math.sin(radians) * (reverse ? -1 : 1);

        return (
          <motion.div
            key={i}
            className="absolute flex flex-col items-center justify-center"
            style={{
              width: size,
              height: size,
              x: x - size / 2,
              y: y - size / 2,
            }}
            animate={{
              rotate: [0, reverse ? -360 : 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            whileHover={{
              scale: 1.3,
              transition: { duration: 0.3 },
            }}
          >
            {child}
          </motion.div>
        );
      })}
    </div>
  );
};

const SkillMeter = ({ name, icon, percentage }) => {
  return (
    <div className="mb-5">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <span className="text-xl mr-3">{icon}</span>
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

const Skills = () => {
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

  const orbitingSkills = [
    <TbBrandReact className="text-blue-500" size={32} />,
    <TbBrandNextjs className="text-black dark:text-white" size={32} />,
    <SiTypescript className="text-blue-600" size={28} />,
    <SiJavascript className="text-yellow-400" size={28} />,
    <SiTailwindcss className="text-cyan-500" size={28} />,
    <SiNodedotjs className="text-green-600" size={28} />,
    <SiGithub className="text-black dark:text-white" size={28} />,
    <SiFigma className="text-purple-500" size={28} />,
  ];

  return (
    <section
      id="skills"
      className="relative min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-gray-900 dark:to-gray-800 overflow-hidden"
    >
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-400/10 dark:bg-blue-600/10 backdrop-blur-sm"
            style={{
              width: Math.random() * 200 + 50,
              height: Math.random() * 200 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              rotate: [0, Math.random() * 360],
            }}
            transition={{
              duration: Math.random() * 30 + 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400"
          >
            My Skills
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Technologies I've mastered with proficiency levels
          </motion.p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Orbiting Circles Animation */}
          <div className="flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Central glowing orb */}
              <motion.div
                className="absolute inset-0 m-auto w-40 h-40 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-600/20 blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.4, 0.6, 0.4],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Outer orbiting skills */}
              <OrbitingCircles radius={220} size={80} speed={25}>
                {orbitingSkills.slice(0, 6)}
              </OrbitingCircles>

              {/* Inner orbiting skills */}
              <OrbitingCircles radius={140} size={60} speed={18} reverse>
                {orbitingSkills.slice(6)}
              </OrbitingCircles>
            </motion.div>
          </div>

          {/* Skill Meters */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
              Skill Proficiency
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
