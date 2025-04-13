import React, { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  FiGithub,
  FiExternalLink,
  FiX,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { FaReact, FaNodeJs, FaPython, FaFigma } from "react-icons/fa";
import {
  SiDjango,
  SiMongodb,
  SiTailwindcss,
  SiThreedotjs,
} from "react-icons/si";
import { TbBrandNextjs } from "react-icons/tb";

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("Show All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const constraintsRef = useRef(null);
  const carouselRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: carouselRef,
    offset: ["start start", "end end"],
  });

  // Parallax values for carousel items
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  const filters = [
    "Show All",
    "Web Apps",
    "Mobile",
    "Full Stack",
    "UI/UX",
    "Innovative",
  ];

  const projects = [
    {
      id: 1,
      title: "Neon Commerce Platform",
      description:
        "Next-gen e-commerce with AR product previews and AI recommendations",
      tags: ["Next.js", "Three.js", "Node.js", "TensorFlow.js"],
      category: "Full Stack",
      image: "/projects/ecommerce-neon.jpg",
      github: "https://github.com/MRaysa/ecommerce-ar",
      live: "https://neon-commerce.demo",
      techIcons: [<TbBrandNextjs />, <SiThreedotjs />, <FaNodeJs />],
      accentColor:
        "bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600",
      details: {
        features: [
          "Augmented Reality product previews",
          "AI-powered recommendations",
          "Real-time inventory management",
          "3D product configurator",
          "Voice search functionality",
        ],
        challenges: "Implementing smooth AR transitions across devices",
        solutions: "Developed a WebGL fallback for unsupported devices",
        testimonial: {
          text: "This platform increased our conversion rate by 37% and reduced returns by 28%.",
          author: "Sarah K., E-Commerce Director",
        },
      },
    },
    {
      id: 2,
      title: "Cosmic Portfolio",
      description:
        "Interactive 3D portfolio with particle animations and spatial UI",
      tags: ["Three.js", "React", "GSAP", "WebGL"],
      category: "Web Apps",
      image: "/projects/cosmic-portfolio.jpg",
      github: "https://github.com/MRaysa/3d-portfolio",
      live: "https://cosmic-portfolio.demo",
      techIcons: [<FaReact />, <SiThreedotjs />],
      accentColor: "bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600",
      details: {
        features: [
          "3D animated environment",
          "Interactive particle system",
          "Spatial navigation",
          "Dynamic lighting effects",
          "60fps animations",
        ],
        challenges: "Maintaining performance with complex 3D scenes",
        solutions: "Implemented selective rendering and LOD techniques",
        testimonial: {
          text: "The most memorable portfolio we've seen - clients keep talking about it!",
          author: "Michael T., Creative Director",
        },
      },
    },
    {
      id: 3,
      title: "Neuro Fitness App",
      description: "AI-powered fitness coach with real-time form analysis",
      tags: ["React Native", "Python", "TensorFlow", "WebRTC"],
      category: "Mobile",
      image: "/projects/neuro-fitness.jpg",
      github: "https://github.com/MRaysa/neuro-fitness",
      live: "https://neurofitness.app",
      techIcons: [<FaReact />, <FaPython />],
      accentColor:
        "bg-gradient-to-br from-emerald-400 via-teal-500 to-green-600",
      details: {
        features: [
          "Real-time pose estimation",
          "Personalized workout plans",
          "Form correction AI",
          "Progress analytics",
          "Social challenges",
        ],
        challenges: "Processing video frames in real-time on mobile",
        solutions: "Optimized ML model for mobile inference",
        testimonial: {
          text: "Our user retention doubled after implementing the form analysis feature.",
          author: "David L., Fitness Startup CEO",
        },
      },
    },
    {
      id: 4,
      title: "Quantum Dashboard",
      description: "Data visualization platform with interactive 3D charts",
      tags: ["D3.js", "Three.js", "Node.js", "MongoDB"],
      category: "Web Apps",
      image: "/projects/quantum-dashboard.jpg",
      github: "https://github.com/MRaysa/data-viz",
      live: "https://quantum-dashboard.demo",
      techIcons: [<SiThreedotjs />, <FaNodeJs />, <SiMongodb />],
      accentColor:
        "bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-600",
      details: {
        features: [
          "3D data visualization",
          "Real-time data streaming",
          "Customizable dashboards",
          "Collaborative annotation",
          "Predictive analytics",
        ],
        challenges: "Handling large datasets without performance lag",
        solutions: "Implemented Web Workers for background processing",
        testimonial: {
          text: "Transformed how our analysts interact with complex datasets.",
          author: "Jennifer R., Data Science Lead",
        },
      },
    },
    {
      id: 5,
      title: "Luminous Design System",
      description: "Animated design system with micro-interaction library",
      tags: ["Figma", "Lottie", "After Effects", "Storybook"],
      category: "UI/UX",
      image: "/projects/luminous-design.jpg",
      github: "https://github.com/MRaysa/design-system",
      live: "https://luminous-design.demo",
      techIcons: [<FaFigma />],
      accentColor: "bg-gradient-to-br from-amber-400 via-orange-500 to-red-600",
      details: {
        features: [
          "500+ animated components",
          "Micro-interaction library",
          "Dark/light mode system",
          "Design token architecture",
          "Accessibility toolkit",
        ],
        challenges: "Creating consistent animations across platforms",
        solutions: "Developed a unified animation language",
        testimonial: {
          text: "Cut our design-dev handoff time by 65% while improving consistency.",
          author: "Alex M., Product Design Lead",
        },
      },
    },
  ];

  const filteredProjects =
    activeFilter === "Show All"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  // 3D floating cards effect
  const FloatingCard = ({ project, style }) => {
    const [rotation, setRotation] = useState({
      x: Math.random() * 10 - 5,
      y: Math.random() * 10 - 5,
    });

    return (
      <motion.div
        style={style}
        className="relative h-full w-full"
        whileHover={{
          zIndex: 10,
          scale: 1.05,
          transition: { duration: 0.3 },
        }}
        onHoverStart={() => setHoveredProject(project.id)}
        onHoverEnd={() => setHoveredProject(null)}
        animate={{
          rotateX: hoveredProject === project.id ? 0 : rotation.x,
          rotateY: hoveredProject === project.id ? 0 : rotation.y,
          transition: { type: "spring", stiffness: 50 },
        }}
      >
        <div
          className={`absolute inset-0 rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 ${project.accentColor}`}
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute inset-0 p-6 flex flex-col justify-end">
            <motion.h3
              className="text-2xl font-bold text-white mb-2"
              initial={{ y: 20, opacity: 0 }}
              animate={{
                y: 0,
                opacity: 1,
                transition: { delay: 0.2 },
              }}
            >
              {project.title}
            </motion.h3>
            <motion.p
              className="text-blue-100 mb-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{
                y: 0,
                opacity: 1,
                transition: { delay: 0.3 },
              }}
            >
              {project.description}
            </motion.p>
            <motion.div
              className="flex gap-2"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { delay: 0.4 },
              }}
            >
              {project.techIcons.map((Icon, i) => (
                <div
                  key={i}
                  className="p-2 bg-white/10 backdrop-blur-sm rounded-full"
                >
                  {Icon}
                </div>
              ))}
            </motion.div>
          </div>
          <motion.div
            className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setSelectedProject(project)}
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="px-6 py-3 bg-white text-gray-900 rounded-full font-medium flex items-center gap-2 shadow-lg"
            >
              Explore Project
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    );
  };

  // Particle background component
  const ParticleBackground = () => {
    const particles = Array(30).fill();

    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none  py-24  bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-gray-900 dark:to-gray-800">
        {particles.map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10 backdrop-blur-sm"
            style={{
              width: Math.random() * 10 + 5,
              height: Math.random() * 10 + 5,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <section
      id="projects"
      className="relative min-h-screen py-32 overflow-hidden bg-gray-900"
      ref={constraintsRef}
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
      />

      {/* Particle background */}
      <ParticleBackground />

      {/* Floating tech icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[FaReact, FaNodeJs, SiThreedotjs, TbBrandNextjs].map((Icon, i) => (
          <motion.div
            key={i}
            className="absolute text-white/10 text-7xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              rotate: 360,
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
            }}
            transition={{
              duration: Math.random() * 30 + 30,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
          >
            <Icon />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Animated Title with floating elements */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <div className="relative inline-block">
            <motion.h2
              className="text-6xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Project Universe
            </motion.h2>
            <motion.div
              className="absolute -bottom-4 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
            />
          </div>
          <motion.p
            className="mt-8 text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
          >
            Each project is a galaxy of innovation—explore my digital cosmos
            where technology meets creativity.
          </motion.p>
        </motion.div>

        {/* View mode toggle */}
        <motion.div
          className="flex justify-center mb-40"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex bg-gray-800 rounded-full p-1 shadow-inner">
            <motion.button
              className={`px-6 py-2 rounded-full ${
                viewMode === "grid"
                  ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white"
                  : "text-gray-400"
              }`}
              onClick={() => setViewMode("grid")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Galactic Grid
            </motion.button>
            <motion.button
              className={`px-6 py-2 rounded-full ${
                viewMode === "carousel"
                  ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white"
                  : "text-gray-400"
              }`}
              onClick={() => setViewMode("carousel")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Cosmic Carousel
            </motion.button>
          </div>
        </motion.div>

        {/* Filter Buttons - Animated orbit */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-40 relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {/* Animated orbit circle */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-white/10 pointer-events-none"
            style={{
              top: "-20%",
              bottom: "-20%",
              left: "20%",
              right: "20%",
            }}
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 60,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {filters.map((filter, i) => {
            const angle = (i / filters.length) * Math.PI * 2;
            const x = Math.cos(angle) * 120;
            const y = Math.sin(angle) * 120;

            return (
              <motion.button
                key={filter}
                initial={{ x: 0, y: 0, opacity: 0 }}
                animate={{
                  x,
                  y,
                  opacity: 1,
                  transition: { delay: i * 0.1 },
                }}
                whileHover={{
                  scale: 1.2,
                  backgroundColor: "rgba(124, 58, 237, 0.5)",
                }}
                whileTap={{ scale: 0.9 }}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all absolute ${
                  activeFilter === filter
                    ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg"
                    : "bg-gray-800 text-gray-300 shadow-sm border border-gray-700"
                }`}
                onClick={() => setActiveFilter(filter)}
                style={{
                  originX: 0.5,
                  originY: 0.5,
                }}
              >
                {filter}
              </motion.button>
            );
          })}

          {/* Center button to reset */}
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: filters.length * 0.1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white flex items-center justify-center shadow-xl"
            onClick={() => setActiveFilter("Show All")}
          >
            All
          </motion.button>
        </motion.div>

        {/* Projects Grid View */}
        {viewMode === "grid" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                className="relative h-96"
              >
                <FloatingCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Projects Carousel View */}
        {viewMode === "carousel" && (
          <div className="relative h-[120vh]" ref={carouselRef}>
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">
              <div className="relative w-full h-2/3">
                {filteredProjects.map((project, i) => {
                  let y = y1;
                  if (i % 3 === 1) y = y2;
                  if (i % 3 === 2) y = y3;

                  return (
                    <motion.div
                      key={project.id}
                      style={{ y }}
                      className={`absolute w-1/2 ${
                        i % 3 === 0 ? "left-0" : "right-0"
                      } ${i % 2 === 0 ? "top-0" : "bottom-0"}`}
                    >
                      <FloatingCard project={project} />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="text-8xl mb-6"
            >
              🪐
            </motion.div>
            <h3 className="text-2xl font-medium text-white mb-4">
              No planets found in this galaxy
            </h3>
            <p className="text-gray-400 max-w-md mx-auto">
              Try selecting a different filter or check back later as I continue
              to expand my digital universe.
            </p>
          </motion.div>
        )}
      </div>

      {/* Immersive Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative bg-gray-900 rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto border border-gray-800"
              onClick={(e) => e.stopPropagation()}
              layoutId={`project-${selectedProject.id}`}
            >
              {/* Close button */}
              <motion.button
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-6 right-6 z-20 p-2 rounded-full bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors border border-gray-700"
                onClick={() => setSelectedProject(null)}
              >
                <FiX size={24} />
              </motion.button>

              {/* Modal content */}
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Image with parallax effect */}
                <div className="relative h-96 lg:h-full overflow-hidden">
                  <motion.img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent lg:from-transparent lg:to-black/30" />

                  {/* Floating tech icons */}
                  <div className="absolute inset-0 pointer-events-none">
                    {selectedProject.techIcons.map((Icon, i) => (
                      <motion.div
                        key={i}
                        className="absolute text-white/20 text-6xl"
                        style={{
                          left: `${Math.random() * 80 + 10}%`,
                          top: `${Math.random() * 80 + 10}%`,
                        }}
                        animate={{
                          rotate: 360,
                          y: [0, Math.random() * 40 - 20],
                        }}
                        transition={{
                          duration: Math.random() * 20 + 20,
                          repeat: Infinity,
                          repeatType: "reverse",
                          ease: "linear",
                        }}
                      >
                        {Icon}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Details */}
                <div className="p-8 lg:p-12">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div
                      className={`h-2 w-16 rounded-full ${selectedProject.accentColor} mb-4`}
                    />
                    <h3 className="text-4xl font-bold text-white mb-2">
                      {selectedProject.title}
                    </h3>
                    <p className="text-gray-300 mb-8">
                      {selectedProject.description}
                    </p>
                  </motion.div>

                  {/* Tech stack */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-8"
                  >
                    <h4 className="text-xl font-semibold text-white mb-4">
                      Tech Cosmos
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {selectedProject.tags.map((tag) => (
                        <motion.div
                          key={tag}
                          whileHover={{ scale: 1.1 }}
                          className={`px-4 py-2 rounded-full text-sm ${selectedProject.accentColor} text-white`}
                        >
                          {tag}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Features */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mb-8"
                  >
                    <h4 className="text-xl font-semibold text-white mb-4">
                      Stellar Features
                    </h4>
                    <ul className="space-y-3">
                      {selectedProject.details.features.map((feature, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + i * 0.05 }}
                          className="flex items-start gap-3 text-gray-300"
                        >
                          <div
                            className={`w-5 h-5 rounded-full flex-shrink-0 ${selectedProject.accentColor} flex items-center justify-center`}
                          >
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          </div>
                          <span>{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* Testimonial */}
                  {selectedProject.details.testimonial && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      className="mb-8 p-6 bg-gray-800/50 rounded-xl border border-gray-700 backdrop-blur-sm"
                    >
                      <div className="flex items-start gap-3">
                        <div className="text-2xl">🌟</div>
                        <div>
                          <p className="text-gray-300 italic mb-2">
                            "{selectedProject.details.testimonial.text}"
                          </p>
                          <p className="text-gray-400 text-sm">
                            — {selectedProject.details.testimonial.author}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Action buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="flex gap-4 mt-8"
                  >
                    {selectedProject.github && (
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={selectedProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-3 px-6 rounded-lg flex items-center justify-center gap-2 border border-gray-700"
                      >
                        <FiGithub size={18} />
                        <span>View Code</span>
                      </motion.a>
                    )}
                    {selectedProject.live && (
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={selectedProject.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex-1 ${selectedProject.accentColor} text-white py-3 px-6 rounded-lg flex items-center justify-center gap-2`}
                      >
                        <FiExternalLink size={18} />
                        <span>Live Experience</span>
                      </motion.a>
                    )}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
