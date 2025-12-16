import React from "react";
import { motion } from "framer-motion";
import { TbBrandReact, TbBrandNextjs, TbDatabase } from "react-icons/tb";
import {
  SiTypescript,
  SiTailwindcss,
  SiJavascript,
  SiNodedotjs,
  SiExpress,
  SiPython,
  SiGithub,
  SiFigma,
  SiFastify,
  SiPostgresql,
} from "react-icons/si";

const OrbitingIcon = ({ icon, index, total, radius, duration, reverse, delay = 0 }) => {
  const angle = (index / total) * 360;

  return (
    <motion.div
      className="absolute"
      style={{
        width: 50,
        height: 50,
      }}
      animate={{
        rotate: reverse ? -360 : 360,
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "linear",
        delay: delay,
      }}
    >
      <motion.div
        className="absolute bg-white/95 dark:bg-gray-800/95 p-3 rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm flex items-center justify-center cursor-pointer"
        style={{
          left: `calc(50% + ${radius}px - 25px)`,
          top: "50%",
          transform: "translateY(-50%)",
        }}
        initial={{ rotate: -angle }}
        animate={{
          rotate: reverse ? angle : -angle,
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear",
          delay: delay,
        }}
        whileHover={{
          scale: 1.3,
          boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
          transition: { duration: 0.2 },
        }}
      >
        {icon}
      </motion.div>
    </motion.div>
  );
};

const OrbitRing = ({ children, radius, duration = 20, reverse = false, className = "" }) => {
  const items = React.Children.toArray(children);
  const total = items.length;

  return (
    <div
      className={`absolute inset-0 flex items-center justify-center ${className}`}
      style={{
        width: radius * 2,
        height: radius * 2,
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      {/* Orbit path ring */}
      <div
        className="absolute rounded-full border border-dashed border-blue-300/30 dark:border-blue-500/20"
        style={{
          width: radius * 2,
          height: radius * 2,
        }}
      />

      {/* Orbiting items */}
      {items.map((item, index) => (
        <OrbitingIcon
          key={index}
          icon={item}
          index={index}
          total={total}
          radius={radius}
          duration={duration}
          reverse={reverse}
          delay={(index / total) * duration}
        />
      ))}
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
    {
      name: "React",
      icon: <TbBrandReact className="text-blue-500" />,
      percentage: 95,
    },
    {
      name: "JavaScript",
      icon: <SiJavascript className="text-yellow-400" />,
      percentage: 90,
    },
    {
      name: "TypeScript",
      icon: <SiTypescript className="text-blue-600" />,
      percentage: 85,
    },
    {
      name: "Next.js",
      icon: <TbBrandNextjs className="text-black dark:text-white" />,
      percentage: 88,
    },
    {
      name: "Node.js",
      icon: <SiNodedotjs className="text-green-600" />,
      percentage: 87,
    },
    {
      name: "Tailwind CSS",
      icon: <SiTailwindcss className="text-cyan-500" />,
      percentage: 92,
    },
    {
      name: "Express",
      icon: <SiExpress className="text-gray-800 dark:text-gray-200" />,
      percentage: 83,
    },
    {
      name: "Python",
      icon: <SiPython className="text-blue-600" />,
      percentage: 90,
    },
    {
      name: "GitHub",
      icon: <SiGithub className="text-black dark:text-white" />,
      percentage: 94,
    },
    {
      name: "Figma",
      icon: <SiFigma className="text-purple-500" />,
      percentage: 78,
    },
    {
      name: "Fastify",
      icon: <SiFastify className="text-gray-800 dark:text-white" />,
      percentage: 82,
    },
    {
      name: "PostgreSQL",
      icon: <SiPostgresql className="text-blue-600" />,
      percentage: 85,
    },
    {
      name: "Convex",
      icon: <TbDatabase className="text-red-500" />,
      percentage: 80,
    },
  ];

  const orbitingSkills = [
    <TbBrandReact className="text-blue-500 text-3xl" />,
    <TbBrandNextjs className="text-black dark:text-white text-3xl" />,
    <SiTypescript className="text-blue-600 text-2xl" />,
    <SiJavascript className="text-yellow-400 text-2xl" />,
    <SiTailwindcss className="text-cyan-500 text-2xl" />,
    <SiNodedotjs className="text-green-600 text-2xl" />,
    <SiFastify className="text-gray-800 dark:text-white text-2xl" />,
    <SiPostgresql className="text-blue-600 text-2xl" />,
    <TbDatabase className="text-red-500 text-2xl" />,
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Skill Meters - Give this order-2 on mobile, order-1 on md+ */}
          <div className="order-2 md:order-1 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
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

          {/* Orbiting Circles Animation - Give this order-1 on mobile, order-2 on md+ */}
          <div className="order-1 md:order-2 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative w-[400px] h-[400px]"
            >
              {/* Outer glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-full blur-3xl" />

              {/* Central glowing orb */}
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-2xl flex items-center justify-center z-10"
                animate={{
                  scale: [1, 1.1, 1],
                  boxShadow: [
                    "0 0 30px rgba(59, 130, 246, 0.4)",
                    "0 0 60px rgba(147, 51, 234, 0.6)",
                    "0 0 30px rgba(59, 130, 246, 0.4)",
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <span className="text-white text-2xl font-bold">&lt;/&gt;</span>
              </motion.div>

              {/* Pulsing rings */}
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-400/20"
                  style={{
                    width: 80 + i * 30,
                    height: 80 + i * 30,
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.1, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.3,
                  }}
                />
              ))}

              {/* Outer orbiting skills */}
              <OrbitRing radius={160} duration={25}>
                {orbitingSkills.slice(0, 6)}
              </OrbitRing>

              {/* Inner orbiting skills */}
              <OrbitRing radius={95} duration={18} reverse>
                {orbitingSkills.slice(6)}
              </OrbitRing>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
