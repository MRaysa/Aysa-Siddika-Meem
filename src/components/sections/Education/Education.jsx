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

        {/* Ultra Creative Academic Excellence Section */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 80, delay: 0.3 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mt-24 relative"
        >
          {/* Main Container with 3D perspective */}
          <div className="relative perspective-[2000px]">
            {/* Animated Hexagonal Background Pattern */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              <svg className="absolute w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(0.5)">
                    <polygon points="25,0 50,14.4 50,43.4 25,57.7 0,43.4 0,14.4" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-purple-400"/>
                  </pattern>
                </defs>
                <motion.rect
                  width="100%"
                  height="100%"
                  fill="url(#hexagons)"
                  animate={{ x: [0, 25, 0] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
              </svg>
            </div>

            {/* Outer Glow Ring */}
            <motion.div
              className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-400 opacity-75 blur-xl"
              animate={{
                opacity: [0.5, 0.8, 0.5],
                scale: [1, 1.02, 1],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Main Card */}
            <motion.div
              className="relative rounded-3xl overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 27, 75, 0.95) 50%, rgba(20, 30, 48, 0.95) 100%)",
              }}
              whileHover={{ rotateX: 2, rotateY: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Inner border gradient */}
              <div className="absolute inset-[1px] rounded-3xl bg-gradient-to-br from-white/10 via-transparent to-white/5 pointer-events-none" />

              {/* Animated corner accents */}
              {[
                { position: "top-0 left-0", rotate: 0 },
                { position: "top-0 right-0", rotate: 90 },
                { position: "bottom-0 right-0", rotate: 180 },
                { position: "bottom-0 left-0", rotate: 270 },
              ].map((corner, i) => (
                <motion.div
                  key={i}
                  className={`absolute ${corner.position} w-24 h-24`}
                  style={{ rotate: corner.rotate }}
                >
                  <motion.div
                    className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-transparent"
                    animate={{ opacity: [0.3, 1, 0.3], scaleX: [0.5, 1, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                  />
                  <motion.div
                    className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-400 to-transparent"
                    animate={{ opacity: [0.3, 1, 0.3], scaleY: [0.5, 1, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                  />
                </motion.div>
              ))}

              {/* Floating Orbs */}
              <motion.div
                className="absolute top-10 right-20 w-32 h-32 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)",
                }}
                animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute bottom-20 left-10 w-24 h-24 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(34, 211, 238, 0.3) 0%, transparent 70%)",
                }}
                animate={{ x: [0, -20, 0], y: [0, 30, 0], scale: [1, 1.3, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              />

              {/* Content */}
              <div className="relative z-10 p-10 md:p-14">
                {/* Top Section - Icon and Title */}
                <div className="text-center mb-12">
                  {/* Animated 3D Trophy/Cap Icon */}
                  <motion.div
                    className="inline-block mb-8 relative"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {/* Glow behind icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        className="w-28 h-28 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 blur-2xl opacity-50"
                        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                    </div>
                    {/* Icon container with rotating ring */}
                    <div className="relative">
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-400/50"
                        style={{ width: 100, height: 100, top: -10, left: -10 }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      />
                      <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center shadow-2xl shadow-violet-500/30">
                        <FaGraduationCap className="text-white" size={40} />
                        {/* Sparkle effects */}
                        <motion.div
                          className="absolute -top-1 -right-1 text-yellow-300"
                          animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          ✦
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Title with animated underline */}
                  <div className="relative inline-block">
                    <motion.h3
                      className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-violet-200 to-cyan-200"
                      animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                      style={{ backgroundSize: "200% 200%" }}
                      transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    >
                      Academic Excellence
                    </motion.h3>
                    {/* Animated underline */}
                    <motion.div
                      className="absolute -bottom-3 left-0 right-0 h-1 rounded-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                      animate={{ scaleX: [0.3, 1, 0.3], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                  </div>

                  {/* Subtitle */}
                  <motion.p
                    className="mt-8 text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    Maintained a <span className="text-cyan-400 font-semibold">perfect GPA of 5.00</span> throughout my academic journey,
                    demonstrating consistent excellence across all levels of education.
                  </motion.p>
                </div>

                {/* Stats Section - Creative Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    {
                      value: "5.00",
                      label: "GPA",
                      icon: <FaAward size={28} />,
                      gradient: "from-amber-400 to-orange-500",
                      glowColor: "rgba(251, 191, 36, 0.3)",
                      description: "Perfect Score"
                    },
                    {
                      value: "4",
                      label: "Institutions",
                      icon: <FaSchool size={28} />,
                      gradient: "from-blue-400 to-indigo-500",
                      glowColor: "rgba(96, 165, 250, 0.3)",
                      description: "Prestigious"
                    },
                    {
                      value: "8+",
                      label: "Years",
                      icon: <GiDiploma size={28} />,
                      gradient: "from-violet-400 to-purple-500",
                      glowColor: "rgba(167, 139, 250, 0.3)",
                      description: "Of Learning"
                    },
                    {
                      value: "100%",
                      label: "Consistency",
                      icon: <GiBrain size={28} />,
                      gradient: "from-pink-400 to-rose-500",
                      glowColor: "rgba(244, 114, 182, 0.3)",
                      description: "Dedication"
                    },
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 30, rotateX: -20 }}
                      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{ delay: 0.2 + i * 0.15, type: "spring", stiffness: 100 }}
                      viewport={{ once: true }}
                      whileHover={{
                        y: -8,
                        scale: 1.02,
                        transition: { type: "spring", stiffness: 400 }
                      }}
                      className="relative group"
                    >
                      {/* Card glow on hover */}
                      <motion.div
                        className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg"
                        style={{ background: `linear-gradient(135deg, ${stat.glowColor}, transparent)` }}
                      />

                      {/* Card */}
                      <div className="relative h-full rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 p-6 overflow-hidden">
                        {/* Animated background pattern */}
                        <motion.div
                          className="absolute inset-0 opacity-20"
                          style={{
                            backgroundImage: `radial-gradient(circle at 50% 50%, ${stat.glowColor} 0%, transparent 50%)`,
                          }}
                          animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.3, 0.1] }}
                          transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
                        />

                        {/* Icon with gradient background */}
                        <motion.div
                          className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.gradient} mb-4 shadow-lg`}
                          whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                        >
                          <span className="text-white">{stat.icon}</span>
                        </motion.div>

                        {/* Value with counting animation effect */}
                        <motion.div
                          className={`text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${stat.gradient} mb-1`}
                          initial={{ scale: 0.5 }}
                          whileInView={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200, delay: 0.3 + i * 0.1 }}
                        >
                          {stat.value}
                        </motion.div>

                        {/* Label */}
                        <div className="text-white font-semibold text-lg">{stat.label}</div>
                        <div className="text-gray-400 text-sm mt-1">{stat.description}</div>

                        {/* Corner accent */}
                        <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                          <motion.div
                            className={`absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br ${stat.gradient} opacity-20 rotate-45`}
                            animate={{ opacity: [0.1, 0.3, 0.1] }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Bottom decorative element */}
                <motion.div
                  className="mt-12 flex justify-center items-center gap-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="text-yellow-400"
                      animate={{
                        scale: [1, 1.3, 1],
                        rotate: [0, 180, 360],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: "easeInOut"
                      }}
                    >
                      ★
                    </motion.div>
                  ))}
                </motion.div>

                {/* Floating particles */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {[...Array(15)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 rounded-full bg-cyan-400"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        y: [0, -100, 0],
                        x: [0, Math.random() * 50 - 25, 0],
                        opacity: [0, 1, 0],
                        scale: [0, 1.5, 0],
                      }}
                      transition={{
                        duration: 4 + Math.random() * 3,
                        repeat: Infinity,
                        delay: Math.random() * 5,
                        ease: "easeOut",
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
