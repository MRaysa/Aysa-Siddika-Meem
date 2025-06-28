import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  FaGraduationCap,
  FaSchool,
  FaUniversity,
  FaAward,
} from "react-icons/fa";
import { GiDiploma, GiBrain } from "react-icons/gi";
import { IoIosRocket } from "react-icons/io";
import { BsBook } from "react-icons/bs";

const Education = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]);

  const educationData = [
    {
      id: 1,
      degree: "Bachelor of Science in Computer Science and Engineering (CSE)",
      institution: "Independent University Bangladesh (IUB)",
      location: "IUB, Bangladesh",
      details: "Minor: Big Data and High Performance Computing | ID: 2220281",
      icon: <FaUniversity className="text-blue-500" size={24} />,
      year: "2022 - Present",
      achievements: [
        "Dean's List Honors",
        "Undergraduate Research Assistant",
        "Competitive Programming Team",
      ],
    },
    {
      id: 2,
      degree: "Higher Secondary School Certificate (Science Group)",
      institution: "Barguna Residential Model College",
      location: "BRMC, Bangladesh",
      details: "GPA: 5.00",
      icon: <FaSchool className="text-green-500" size={24} />,
      year: "February 2020",
      achievements: ["Debate Team Captain", "Art Exhibition Winner"],
    },
    {
      id: 3,
      degree: "Secondary School Certificate (Science Group)",
      institution: "Garjunbunia Secondary School, Barguna",
      location: "Bangladesh",
      details: "GPA: 5.00",
      icon: <FaSchool className="text-purple-500" size={24} />,
      year: "April 2018",
      achievements: [
        "Valedictorian",
        "Science Fair Winner",
        "Mathematics Champion",
      ],
    },
    {
      id: 4,
      degree: "Junior School Certificate",
      institution: "Gazimahmud JR. High School",
      location: "Bangladesh",
      details: "GPA: 5.00",
      icon: <GiDiploma className="text-yellow-500" size={24} />,
      year: "November 2015",
      achievements: [
        "Perfect Attendance Award",
        "Reading Competition Winner",
        "Art Exhibition Participant",
      ],
    },
  ];

  const floatingIcons = [
    { icon: <BsBook size={32} />, color: "text-blue-400" },
    { icon: <GiBrain size={32} />, color: "text-purple-400" },
    { icon: <FaAward size={32} />, color: "text-yellow-400" },
    { icon: <IoIosRocket size={32} />, color: "text-red-400" },
  ];

  return (
    <section
      id="educations"
      ref={containerRef}
      className="relative py-32 overflow-hidden bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-gray-900 dark:to-gray-800"
    >
      {/* Animated background elements */}
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

      {/* Floating icons */}
      {floatingIcons.map((item, i) => (
        <motion.div
          key={i}
          className={`absolute ${item.color} opacity-20 text-4xl`}
          style={{
            left: `${Math.random() * 80 + 10}%`,
            top: `${Math.random() * 80 + 10}%`,
            y: i % 2 === 0 ? y1 : y2,
            opacity,
          }}
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        >
          {item.icon}
        </motion.div>
      ))}

      <div className="container mx-auto px-6 relative z-10">
        {/* Title Section with advanced animation */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                Education Journey
              </span>
            </h2>
          </motion.div>

          <motion.div
            className="w-32 h-1 mx-auto bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mb-8"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.3, type: "spring" }}
            viewport={{ once: true }}
          />

          <motion.p
            className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            viewport={{ once: true }}
          >
            My academic path has been a continuous pursuit of knowledge and
            excellence in computer science and technology.
          </motion.p>
        </motion.div>

        {/* Animated Timeline */}
        <div className="relative">
          {/* Animated timeline line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-400 via-purple-500 to-pink-500 dark:from-blue-600 dark:to-purple-600 origin-top"
          />

          {educationData.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                type: "spring",
                stiffness: 100,
              }}
              viewport={{ once: true, margin: "-50px" }}
              className={`mb-16 flex flex-col ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } items-center`}
            >
              {/* Animated timeline dot */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: index * 0.15 + 0.3 }}
                className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 border-4 border-white dark:border-gray-800 z-10 flex items-center justify-center"
              >
                <motion.div
                  className="w-2 h-2 rounded-full bg-white"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>

              {/* Education card with advanced animations */}
              <motion.div
                whileHover={{
                  scale: 1.03,
                  boxShadow:
                    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
                whileTap={{ scale: 0.98 }}
                className={`w-full md:w-5/12 p-6 rounded-xl shadow-lg ${
                  index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
                } bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 relative overflow-hidden`}
              >
                {/* Background glow */}
                <motion.div
                  className={`absolute -inset-1 bg-gradient-to-r ${
                    index % 4 === 0
                      ? "from-blue-400 to-purple-500"
                      : index % 4 === 1
                      ? "from-green-400 to-teal-500"
                      : index % 4 === 2
                      ? "from-purple-400 to-pink-500"
                      : "from-yellow-400 to-orange-500"
                  } blur-md opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                />

                <div className="flex items-start gap-4 relative z-10">
                  <motion.div
                    whileHover={{ rotate: 15, scale: 1.1 }}
                    className="p-3 bg-blue-50 dark:bg-gray-700 rounded-lg"
                  >
                    {edu.icon}
                  </motion.div>
                  <div>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                        {edu.degree}
                      </h3>
                      <motion.span
                        whileHover={{ scale: 1.1 }}
                        className="text-sm bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 px-3 py-1 rounded-full"
                      >
                        {edu.year}
                      </motion.span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <h4 className="text-lg font-medium text-blue-600 dark:text-blue-400">
                        {edu.institution}
                      </h4>
                      <span className="text-gray-500 dark:text-gray-400 text-sm">
                        • {edu.location}
                      </span>
                    </div>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                      {edu.details}
                    </p>

                    {/* Achievements dropdown */}
                    <motion.div
                      className="mt-4"
                      initial={{ height: 0, opacity: 0 }}
                      whileInView={{ height: "auto", opacity: 1 }}
                      transition={{ delay: index * 0.15 + 0.5 }}
                    >
                      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                        <h5 className="flex items-center gap-2 text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
                          <FaAward className="text-yellow-500" /> Key
                          Achievements:
                        </h5>
                        <ul className="space-y-2">
                          {edu.achievements.map((achievement, i) => (
                            <motion.li
                              key={i}
                              initial={{ x: -20, opacity: 0 }}
                              whileInView={{ x: 0, opacity: 1 }}
                              transition={{
                                delay: index * 0.15 + 0.6 + i * 0.1,
                              }}
                              className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"
                            >
                              <span className="text-xs mt-1">•</span>
                              {achievement}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Ultra Advanced Achievement Badge */}
        <motion.div
          initial={{ opacity: 0, y: 80, scale: 0.95 }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
              type: "spring",
              damping: 15,
              stiffness: 100,
              delay: 0.4,
            },
          }}
          viewport={{ once: true, margin: "-100px" }}
          className="mt-24 p-2 rounded-3xl relative overflow-hidden group"
          style={{
            background:
              "linear-gradient(135deg, rgba(99, 102, 241, 0.4) 0%, rgba(168, 85, 247, 0.4) 50%, rgba(236, 72, 153, 0.4) 100%)",
            boxShadow: "0 25px 50px -12px rgba(79, 70, 229, 0.25)",
          }}
        >
          {/* Glass morphism container */}
          <div className="relative z-20 backdrop-blur-xl bg-white/5 dark:bg-gray-900/30 border border-white/20 dark:border-gray-700/50 rounded-[calc(1.5rem-4px)] p-8  overflow-hidden">
            {/* Floating gradient orbs */}
            <motion.div
              className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-indigo-500/20 blur-3xl"
              animate={{
                x: [0, 40, 0],
                y: [0, 30, 0],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-pink-500/20 blur-3xl"
              animate={{
                x: [0, -30, 0],
                y: [0, -20, 0],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 3,
                ease: "easeInOut",
              }}
            />

            {/* Shimmer border effect */}
            <div className="absolute inset-0 overflow-hidden rounded-2xl">
              <motion.div
                className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  transformOrigin: "center center",
                }}
              />
            </div>

            {/* Content container */}
            <div className="relative z-30 max-w-4xl mx-auto text-center">
              {/* Animated icon with floating effect */}
              <motion.div
                className="inline-flex items-center justify-center p-6 mb-6 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-white/10"
                animate={{
                  y: [0, -8, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }}
              >
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 10, 0],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 2,
                  }}
                >
                  <FaGraduationCap className="text-white" size={48} />
                </motion.div>
              </motion.div>

              {/* Headline with text gradient */}
              <motion.h3
                className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-purple-200"
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%"],
                  letterSpacing: ["0em", "0.02em", "0em"],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                Academic Excellence
              </motion.h3>

              {/* Subtitle with subtle animation */}
              <motion.p
                className="text-lg text-blue-100/90 mb-8 max-w-2xl mx-auto"
                animate={{
                  opacity: [0.9, 1, 0.9],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                }}
              >
                Maintained a perfect GPA of 5.00 throughout my academic journey,
                demonstrating consistent excellence across all levels of
                education.
              </motion.p>

              {/* Animated stats grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                  {
                    value: "5.00",
                    label: "GPA",
                    icon: <FaAward className="text-yellow-300" />,
                  },
                  {
                    value: "4",
                    label: "Institutions",
                    icon: <FaSchool className="text-blue-300" />,
                  },
                  {
                    value: "8+",
                    label: "Years",
                    icon: <GiDiploma className="text-purple-300" />,
                  },
                  {
                    value: "100%",
                    label: "Consistency",
                    icon: <GiBrain className="text-pink-300" />,
                  },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white/5 dark:bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-white/10 dark:border-gray-700/50"
                    whileHover={{
                      y: -5,
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <div className="text-2xl">{stat.icon}</div>
                      <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
                        {stat.value}
                      </span>
                    </div>
                    <p className="text-sm text-blue-100/80">{stat.label}</p>
                  </motion.div>
                ))}
              </div>

              {/* Particle explosion effect */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-yellow-300 text-xl"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      opacity: 0,
                    }}
                    animate={{
                      y: [
                        `${Math.random() * 100}%`,
                        `${Math.random() * -100}%`,
                      ],
                      x: [`${Math.random() * 50}%`, `${Math.random() * -50}%`],
                      rotate: [0, Math.random() * 360],
                      opacity: [0, 0.8, 0],
                      scale: [0.5, 1.5, 0],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 4,
                      repeat: Infinity,
                      repeatDelay: 5 + Math.random() * 10,
                      ease: "easeOut",
                    }}
                  >
                    {["★", "✧", "✦", "✶"][i % 4]}
                  </motion.div>
                ))}
              </div>

              {/* Glowing CTA button */}
              {/* <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 20px 5px rgba(99, 102, 241, 0.5)",
                }}
                whileTap={{ scale: 0.98 }}
                className="relative overflow-hidden px-8 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium shadow-lg"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <FaAward /> View Certificates
                </span>
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-700 opacity-0"
                  animate={{
                    opacity: [0, 0.5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                />
              </motion.button> */}
            </div>
          </div>

          {/* Outer glow effect on hover */}
          <motion.div
            className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background:
                "radial-gradient(circle at center, rgba(124, 58, 237, 0.4) 0%, transparent 70%)",
              boxShadow: "0 0 60px 20px rgba(124, 58, 237, 0.3)",
            }}
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
