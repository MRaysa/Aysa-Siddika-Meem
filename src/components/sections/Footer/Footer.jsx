import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiMail,
  FiHeart,
  FiPhone,
  FiMapPin,
} from "react-icons/fi";
import { FaReact, FaNodeJs } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiTypescript } from "react-icons/si";

const Footer = () => {
  // const constraintsRef = useRef(null);

  // const techStack = [
  //   { icon: <FaReact className="text-blue-500" />, name: "React" },
  //   {
  //     icon: <SiNextdotjs className="text-black dark:text-white" />,
  //     name: "Next.js",
  //   },
  //   { icon: <SiTypescript className="text-blue-600" />, name: "TypeScript" },
  //   { icon: <SiTailwindcss className="text-cyan-500" />, name: "Tailwind" },
  //   { icon: <FaNodeJs className="text-green-600" />, name: "Node.js" },
  // ];

  const contactInfo = [
    { icon: <FiMail />, text: "aysasiddikameem@gmail.com" },
    { icon: <FiPhone />, text: "+880 1521-427028" },
    { icon: <FiMapPin />, text: "Dhaka, Bangladesh" },
  ];
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");

  const techStack = [
    { icon: <FaReact className="text-blue-400" size={20} />, name: "React" },
    {
      icon: <SiNextdotjs className="text-black dark:text-white" size={20} />,
      name: "Next.js",
    },
    {
      icon: <SiTypescript className="text-blue-600" size={20} />,
      name: "TypeScript",
    },
    {
      icon: <SiTailwindcss className="text-cyan-400" size={20} />,
      name: "Tailwind",
    },
    {
      icon: <FaNodeJs className="text-green-500" size={20} />,
      name: "Node.js",
    },
  ];

  const socialLinks = [
    {
      icon: <FiGithub size={20} />,
      url: "https://github.com/MRaysa",
      label: "GitHub",
    },
    {
      icon: <FiLinkedin size={20} />,
      url: "https://linkedin.com/in/mst-aysa-siddika-meem",
      label: "LinkedIn",
    },
    { icon: <FiTwitter size={20} />, url: "#", label: "Twitter" },
    {
      icon: <FiMail size={20} />,
      url: "mailto:aysasiddikameem@gmail.com",
      label: "Email",
    },
  ];

  useEffect(() => {
    const mouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  const variants = {
    default: {
      x: cursorPosition.x - 16,
      y: cursorPosition.y - 16,
      backgroundColor: "#3b82f6",
      mixBlendMode: "normal",
    },
    text: {
      x: cursorPosition.x - 32,
      y: cursorPosition.y - 32,
      backgroundColor: "#8b5cf6",
      width: 64,
      height: 64,
      mixBlendMode: "difference",
    },
    social: {
      x: cursorPosition.x - 24,
      y: cursorPosition.y - 24,
      backgroundColor: "#ec4899",
      width: 48,
      height: 48,
      mixBlendMode: "normal",
    },
    tech: {
      x: cursorPosition.x - 20,
      y: cursorPosition.y - 20,
      backgroundColor: "#10b981",
      width: 40,
      height: 40,
      mixBlendMode: "normal",
    },
  };

  const textEnter = () => setCursorVariant("text");
  const textLeave = () => setCursorVariant("default");
  const socialEnter = () => setCursorVariant("social");
  const socialLeave = () => setCursorVariant("default");
  const techEnter = () => setCursorVariant("tech");
  const techLeave = () => setCursorVariant("default");

  return (
    <>
      {/* Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-50"
        variants={variants}
        animate={cursorVariant}
        transition={{ type: "spring", mass: 0.1 }}
      />

      <footer className="relative overflow-hidden bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-gray-900 dark:to-gray-800 border-t border-gray-200 dark:border-gray-700">
        {/* Floating background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full opacity-10"
              style={{
                width: Math.random() * 200 + 50,
                height: Math.random() * 200 + 50,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `radial-gradient(circle, ${
                  i % 2 === 0 ? "#3b82f6" : "#8b5cf6"
                }, transparent 70%)`,
              }}
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
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

        {/* Tech stack floating bubbles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {techStack.map((tech, i) => (
            <motion.div
              key={i}
              className="absolute flex items-center justify-center p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg"
              style={{
                width: 60,
                height: 60,
                left: `${10 + i * 15}%`,
                top: `${20 + Math.random() * 60}%`,
              }}
              animate={{
                y: [0, Math.random() * 40 - 20],
                rotate: [0, Math.random() * 20 - 10],
              }}
              transition={{
                duration: Math.random() * 10 + 5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            >
              {tech.icon}
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto px-6 py-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-8 text-center"
              whileHover={{
                scale: 1.05,
              }}
              onMouseEnter={textEnter}
              onMouseLeave={textLeave}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                Let's Build Something Amazing
              </span>
            </motion.h2>

            <motion.p
              className="text-lg text-gray-600 dark:text-gray-300 mb-12 text-center max-w-2xl"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              onMouseEnter={textEnter}
              onMouseLeave={textLeave}
            >
              Whether you have a project in mind or just want to chat about
              tech, I'd love to hear from you!
            </motion.p>
            <div className="container mx-auto px-6 relative z-10">
              {/* Main Footer Content */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16"
              >
                {/* About Section */}
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-blue-500/30 transition-all"
                >
                  <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                    Aysa Siddika Meem
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Full Stack Developer creating digital experiences that
                    inspire and solve real-world problems with clean, efficient
                    code.
                  </p>
                  <div className="flex gap-3">
                    {techStack.map((tech, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.2, y: -5 }}
                        className="text-2xl p-2 bg-white/10 rounded-lg hover:bg-blue-500/20 transition-all"
                        title={tech.name}
                      >
                        {tech.icon}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Quick Links */}
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-purple-500/30 transition-all"
                >
                  <h3 className="text-xl font-bold mb-4 text-white">
                    Quick Links
                  </h3>
                  <ul className="space-y-3">
                    {["Home", "About", "Projects", "Skills", "Contact"].map(
                      (link, i) => (
                        <motion.li
                          key={i}
                          whileHover={{ x: 5 }}
                          className="text-gray-300 hover:text-blue-400 transition-colors"
                        >
                          <a
                            href={`#${link.toLowerCase()}`}
                            className="flex items-center gap-2"
                          >
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            {link}
                          </a>
                        </motion.li>
                      )
                    )}
                  </ul>
                </motion.div>

                {/* Contact Info */}
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-cyan-500/30 transition-all"
                >
                  <h3 className="text-xl font-bold mb-4 text-white">
                    Get In Touch
                  </h3>
                  <ul className="space-y-4">
                    {contactInfo.map((item, i) => (
                      <motion.li
                        key={i}
                        whileHover={{ x: 5 }}
                        className="text-gray-300 flex items-start gap-3"
                      >
                        <span className="text-blue-400 mt-1">{item.icon}</span>
                        <span>{item.text}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                {/* Newsletter */}
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-pink-500/30 transition-all"
                >
                  <h3 className="text-xl font-bold mb-4 text-white">
                    Newsletter
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Subscribe to get updates on my latest projects and articles.
                  </p>
                  <motion.div whileHover={{ scale: 1.02 }} className="flex">
                    <input
                      type="email"
                      placeholder="Your email"
                      className="flex-1 bg-white/10 border border-white/20 text-white px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 rounded-r-lg font-medium hover:opacity-90 transition-opacity">
                      Subscribe
                    </button>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
            {/* Social links with creative hover effects */}
            <motion.div
              className="flex gap-6 mb-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
            >
              {socialLinks.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative p-4 rounded-full bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700"
                  whileHover={{
                    y: -5,
                    scale: 1.1,
                    backgroundColor: i % 2 === 0 ? "#3b82f6" : "#8b5cf6",
                    color: "white",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                  viewport={{ once: true }}
                  onMouseEnter={socialEnter}
                  onMouseLeave={socialLeave}
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-0 group-hover:opacity-100 blur transition duration-200"></div>
                  {social.icon}
                  <span className="sr-only">{social.label}</span>
                </motion.a>
              ))}
            </motion.div>

            {/* Tech stack pill */}
            <motion.div
              className="flex items-center gap-3 mb-8 flex-wrap justify-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              viewport={{ once: true }}
            >
              <span
                className="text-blue-500 dark:text-blue-400"
                onMouseEnter={textEnter}
                onMouseLeave={textLeave}
              >
                Built with
              </span>
              {techStack.map((tech, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-gray-800 rounded-full shadow-sm border border-gray-200 dark:border-gray-700"
                  whileHover={{
                    y: -3,
                    scale: 1.05,
                    backgroundColor: "#3b82f6",
                    color: "white",
                  }}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i }}
                  viewport={{ once: true }}
                  onMouseEnter={techEnter}
                  onMouseLeave={techLeave}
                >
                  {tech.icon}
                  <span className="text-sm">{tech.name}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Copyright with beating heart */}
            <motion.div
              className="flex flex-col items-center text-gray-500 dark:text-gray-400 mt-12 text-center space-y-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              viewport={{ once: true }}
              onMouseEnter={textEnter}
              onMouseLeave={textLeave}
            >
              {/* Line 1: Copyright */}
              <div>© {new Date().getFullYear()} Aysa Siddika Meem</div>

              {/* Line 2: Education */}
              <div>Department of Computer Science and Engineering (CSE)</div>

              {/* Line 3: University */}
              <div>Independent University Bangladesh (IUB)</div>

              {/* Line 4: Technology stack attribution */}
              <div className="flex items-center justify-center gap-1 pt-2">
                <span>Developed using</span>
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-red-500 px-1"
                >
                  <FiHeart />
                </motion.span>
                <span>with</span>
                <motion.span
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 1 }}
                  className="text-blue-500 px-1"
                >
                  <FaReact size={16} />
                </motion.span>
              </div>

              {/* Line 5: Location */}
              <div className="text-sm text-gray-400 dark:text-gray-500">
                Dhaka, Bangladesh
              </div>
            </motion.div>

            {/* Back to top button */}
            <motion.a
              href="#home"
              className="mt-12 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg flex items-center gap-2"
              whileHover={{
                y: -5,
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)",
              }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1 }}
              viewport={{ once: true }}
              onMouseEnter={textEnter}
              onMouseLeave={textLeave}
            >
              Back to Top
              <motion.span
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ↑
              </motion.span>
            </motion.a>
          </motion.div>
        </div>

        {/* Wavy divider at the very bottom */}
        <div className="relative h-16 overflow-hidden">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="absolute top-0 left-0 w-full h-full"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              className="fill-blue-500 dark:fill-purple-600"
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              className="fill-blue-500 dark:fill-purple-600"
            ></path>
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              className="fill-blue-500 dark:fill-purple-600"
            ></path>
          </svg>
        </div>
      </footer>
    </>
  );
};

export default Footer;
