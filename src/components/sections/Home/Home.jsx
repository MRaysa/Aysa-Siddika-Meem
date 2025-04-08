import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import {
  FiArrowRight,
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiFacebook,
  FiCode,
} from "react-icons/fi";
import { TbBrandNextjs, TbBrandReact } from "react-icons/tb";
import { SiTypescript, SiTailwindcss, SiJavascript } from "react-icons/si";

const TypewriterGreeting = () => {
  const greetings = [
    "Hello, I'm",
    "Whats up! I'm",
    "Hi there, I'm",
    "Greetings, I'm",
    "Hey, I'm",
  ];
  const [currentGreeting, setCurrentGreeting] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typingSpeed = isDeleting ? 50 : 100;
    const changeDelay = isDeleting ? 500 : 2000;

    const timer = setTimeout(() => {
      const fullGreeting = greetings[greetingIndex];

      if (isDeleting) {
        setCurrentGreeting(fullGreeting.substring(0, currentIndex - 1));
        setCurrentIndex(currentIndex - 1);

        if (currentIndex === 0) {
          setIsDeleting(false);
          setGreetingIndex((greetingIndex + 1) % greetings.length);
        }
      } else {
        setCurrentGreeting(fullGreeting.substring(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);

        if (currentIndex === fullGreeting.length) {
          setIsDeleting(true);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentIndex, isDeleting, greetingIndex]);

  return (
    <span className="text-lg text-blue-500 dark:text-blue-400 font-medium">
      {currentGreeting}
      <span className="animate-pulse">|</span>
    </span>
  );
};

const Home = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const heroVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const techIcons = [
    { icon: <TbBrandReact size={28} />, name: "React" },
    { icon: <TbBrandNextjs size={28} />, name: "Next.js" },
    { icon: <SiTypescript size={24} />, name: "TypeScript" },
    { icon: <SiJavascript size={24} />, name: "JavaScript" },
    { icon: <SiTailwindcss size={24} />, name: "Tailwind" },
  ];

  return (
    <div
      id="home"
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

      <div className="container mx-auto px-6 py-32 relative z-10">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={heroVariants}
          className="flex flex-col lg:flex-row items-center justify-between gap-12 min-h-[70vh]"
        >
          {/* Hero Content */}
          <div className="lg:w-1/2 space-y-8">
            <motion.div variants={itemVariants}>
              <TypewriterGreeting />
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                Aysa Siddika
              </span>
              <br />
              <span className="text-gray-800 dark:text-gray-200">Meem</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed"
            >
              A passionate{" "}
              <span className="text-blue-500 font-medium">
                Full Stack Developer
              </span>{" "}
              specializing in modern web technologies and creating exceptional
              digital experiences.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              <motion.a
                href="#about"
                whileHover={{
                  y: -3,
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg flex items-center gap-2 font-medium"
              >
                Explore My Journey
                <FiArrowRight className="transition-transform group-hover:translate-x-1" />
              </motion.a>

              <motion.a
                href="#projects"
                whileHover={{
                  y: -3,
                  scale: 1.05,
                  backgroundColor: "rgba(59, 130, 246, 0.1)",
                }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-full shadow-sm flex items-center gap-2 font-medium"
              >
                <FiCode />
                View Projects
              </motion.a>
            </motion.div>

            {/* Tech Stack Badges */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-3 pt-4"
            >
              {techIcons.map((tech, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5, scale: 1.05 }}
                  className="px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-sm border border-gray-200 dark:border-gray-700 flex items-center gap-2"
                >
                  <span className="text-blue-500">{tech.icon}</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Hero Image/Illustration */}
          <motion.div
            variants={itemVariants}
            className="w-full lg:w-1/2 flex justify-center relative mt-8 lg:mt-0"
          >
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
              {/* Layered background effect */}
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-3xl shadow-lg lg:shadow-2xl transform rotate-3 lg:rotate-6"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl shadow-lg lg:shadow-2xl transform -rotate-3 lg:-rotate-6"></div>
              </div>

              {/* Glow effect */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="absolute -inset-4 sm:-inset-6 lg:-inset-8 bg-blue-500/10 dark:bg-blue-600/10 rounded-3xl blur-md lg:blur-xl"
              />

              {/* Main card */}
              <motion.div
                whileHover={{ y: -10 }}
                className="relative h-64 sm:h-72 md:h-80 lg:h-96 w-full bg-white dark:bg-gray-800 rounded-3xl shadow-lg lg:shadow-xl overflow-hidden border-2 border-white/20 flex items-center justify-center"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <motion.div
                      animate={{
                        y: [0, -10, 0],
                        rotate: [0, 3, -3, 0],
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                      }}
                      className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
                    >
                      👩‍💻
                    </motion.div>
                    <motion.div
                      className="absolute -bottom-6 -right-6 sm:-bottom-8 sm:-right-8 lg:-bottom-10 lg:-right-10 text-2xl sm:text-3xl lg:text-4xl"
                      animate={{
                        y: [0, 6, 0],
                        rotate: [0, -6, 6, 0],
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: 1,
                        ease: "easeInOut",
                      }}
                    >
                      💻
                    </motion.div>
                    <motion.div
                      className="absolute -top-6 -left-6 sm:-top-8 sm:-left-8 lg:-top-10 lg:-left-10 text-2xl sm:text-3xl lg:text-4xl"
                      animate={{
                        y: [0, -6, 0],
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{
                        duration: 7,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: 2,
                        ease: "easeInOut",
                      }}
                    >
                      🌟
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="fixed left-6 bottom-6 hidden md:flex flex-col gap-4 z-50"
        >
          {[
            {
              icon: <FiGithub size={20} />,
              color: "from-gray-800 to-gray-600",
              url: "https://github.com/MRaysa",
            },
            {
              icon: <FiLinkedin size={20} />,
              color: "from-blue-600 to-blue-800",
              url: "https://www.linkedin.com/in/mst-aysa-siddika-meem/",
            },
            {
              icon: <FiTwitter size={20} />,
              color: "from-sky-400 to-sky-600",
              url: "#",
            },
            {
              icon: <FiFacebook size={20} />,
              color: "from-blue-500 to-blue-700",
              url: "https://www.facebook.com/muniaislam.meem",
            },
          ].map((social, i) => (
            <motion.a
              key={i}
              whileHover={{ y: -5, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`bg-gradient-to-r ${social.color} text-white p-3 rounded-full shadow-lg w-12 h-12 flex items-center justify-center`}
            >
              {social.icon}
            </motion.a>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden md:block"
        >
          <motion.div
            animate={{
              y: [0, 10, 0],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex flex-col items-center"
          >
            <span className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              Scroll Down
            </span>
            <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-500 rounded-full flex justify-center">
              <motion.div
                animate={{
                  y: [0, 8, 0],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-1 h-2 bg-gray-500 dark:bg-gray-400 rounded-full mt-2"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
