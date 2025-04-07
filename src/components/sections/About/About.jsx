import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiTwitter, FiFacebook } from "react-icons/fi";

const About = () => {
  const [hovered, setHovered] = useState(false);
  const constraintsRef = useRef(null);

  const achievements = [
    { number: "3+", text: "Years Experience", icon: "🚀" },
    { number: "50+", text: "Projects", icon: "💻" },
    { number: "∞", text: "Coffee Cups", icon: "☕" },
  ];

  return (
    <section
      id="about"
      className="relative py-32 overflow-hidden bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-gray-900 dark:to-gray-800"
      ref={constraintsRef}
    >
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            drag
            dragConstraints={constraintsRef}
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

      <div className="container mx-auto px-6 relative z-10">
        {/* Animated Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <h2 className="text-6xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
              About Me
            </span>
          </h2>
          <motion.div
            className="w-32 h-1 mx-auto bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Profile Image Section */}
          <div
            className="h-[500px] relative rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <motion.div
              className="h-full w-full relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src="/profile.jpg"
                alt="Aysa Siddika"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent" />
              <div className="absolute inset-0 flex items-end p-8">
                <div>
                  <motion.h3
                    className="text-4xl font-bold text-white mb-2"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    Aysa Siddika Meem
                  </motion.h3>
                  <motion.p
                    className="text-xl text-blue-200"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    Full Stack Web Developer
                  </motion.p>
                </div>
              </div>
            </motion.div>

            {hovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute bottom-6 left-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg"
              >
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  UI/UX Designer • React Developer
                </p>
              </motion.div>
            )}
          </div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-8"
          >
            <h3 className="text-4xl font-bold text-gray-800 dark:text-white">
              I Build <span className="text-blue-500">Digital Experiences</span>{" "}
              That Inspire
            </h3>

            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Specializing in immersive 3D web applications and interactive
              interfaces. My code comes to life with smooth animations and
              pixel-perfect designs.
            </p>

            {/* Interactive Skill Cloud */}
            <div className="flex flex-wrap gap-3">
              {[
                "MERN Stack",
                "ReactJS",
                "Next.js",
                "Django",
                "Python",
                "Node.js",
                "JavaScript",
                "TypeScript",
                "C++",
                "UI/UX",
              ].map((skill, i) => (
                <motion.div
                  key={skill}
                  whileHover={{
                    y: -5,
                    scale: 1.05,
                    backgroundColor: "#3b82f6",
                    color: "white",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="px-4 py-2 bg-white cursor-pointer dark:bg-gray-800 rounded-full shadow-sm border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 cursor-default"
                >
                  {skill}
                </motion.div>
              ))}
            </div>

            {/* Animated Achievement Cards */}
            <div className="grid grid-cols-3 gap-4">
              {achievements.map((item, i) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{
                    y: -5,
                    boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)",
                  }}
                  className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 text-center relative overflow-hidden"
                >
                  <div className="text-4xl mb-2">{item.icon}</div>
                  <div className="text-2xl font-bold text-blue-500">
                    {item.number}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {item.text}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            {/* Social Links */}
            <div className="flex gap-4 pt-4">
              {[
                {
                  icon: <FiGithub size={24} />,
                  color: "from-gray-800 to-gray-600",
                  text: "GitHub",
                  url: "https://github.com/MRaysa",
                },
                {
                  icon: <FiLinkedin size={24} />,
                  color: "from-blue-600 to-blue-800",
                  text: "LinkedIn",
                  url: "https://www.linkedin.com/in/mst-aysa-siddika-meem/",
                },
                {
                  icon: <FiTwitter size={24} />,
                  color: "from-sky-400 to-sky-600",
                  text: "Twitter",
                  url: "#",
                },
                {
                  icon: <FiFacebook size={24} />,
                  color: "from-blue-500 to-blue-700",
                  text: "Facebook",
                  url: "https://www.facebook.com/muniaislam.meem",
                },
              ].map((social, i) => (
                <motion.a
                  key={social.text}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{
                    y: -5,
                    scale: 1.1,
                  }}
                  className={`bg-gradient-to-r ${social.color} text-white p-4 rounded-full w-14 h-14 flex items-center justify-center relative overflow-hidden shadow-lg`}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
