import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiExternalLink, FiX } from "react-icons/fi";
import { FaReact, FaNodeJs, FaPython } from "react-icons/fa";
import { SiDjango, SiMongodb, SiTailwindcss } from "react-icons/si";

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const constraintsRef = useRef(null);

  const filters = ["All", "Web", "Mobile", "Fullstack", "UI/UX"];

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description:
        "A full-featured online store with payment integration, product management, and user authentication.",
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
      category: "Fullstack",
      image: "/projects/ecommerce.jpg",
      github: "https://github.com/MRaysa/ecommerce",
      live: "https://ecommerce-demo.com",
      techIcons: [<FaReact />, <FaNodeJs />, <SiMongodb />],
      details: {
        features: [
          "Product catalog with filters",
          "Shopping cart functionality",
          "User authentication (JWT)",
          "Payment processing with Stripe",
          "Admin dashboard",
        ],
        challenges:
          "Implementing real-time inventory updates proved challenging but was solved using WebSockets.",
        solutions:
          "Optimized image loading with lazy loading and compression, reducing page load time by 40%.",
      },
    },
    {
      id: 2,
      title: "Portfolio Website",
      description:
        "A creative portfolio showcasing my work with interactive elements and smooth animations.",
      tags: ["React", "Framer Motion", "Tailwind CSS"],
      category: "Web",
      image: "/projects/portfolio.jpg",
      github: "https://github.com/MRaysa/portfolio",
      live: "https://aysa-portfolio.com",
      techIcons: [<FaReact />, <SiTailwindcss />],
      details: {
        features: [
          "Interactive animations",
          "Dark/light mode toggle",
          "Responsive design",
          "Project showcase",
          "Contact form",
        ],
        challenges:
          "Creating performant animations that work smoothly across devices.",
        solutions:
          "Implemented intersection observers to trigger animations only when visible.",
      },
    },
    {
      id: 3,
      title: "Task Management App",
      description:
        "A productivity application for organizing tasks with drag-and-drop functionality.",
      tags: ["React", "Django", "PostgreSQL"],
      category: "Fullstack",
      image: "/projects/taskapp.jpg",
      github: "https://github.com/MRaysa/task-manager",
      live: "https://taskmanager-demo.com",
      techIcons: [<FaReact />, <FaPython />, <SiDjango />],
      details: {
        features: [
          "Drag-and-drop interface",
          "Team collaboration",
          "Task prioritization",
          "Progress tracking",
          "Calendar integration",
        ],
        challenges: "Implementing real-time updates for multiple users.",
        solutions: "Used Django Channels for WebSocket communication.",
      },
    },
    {
      id: 4,
      title: "Health Tracker",
      description:
        "Mobile application for tracking fitness goals, nutrition, and workout routines.",
      tags: ["React Native", "Firebase", "Redux"],
      category: "Mobile",
      image: "/projects/health.jpg",
      github: "https://github.com/MRaysa/health-tracker",
      live: "https://healthtracker-app.com",
      techIcons: [<FaReact />],
      details: {
        features: [
          "Workout logging",
          "Nutrition tracking",
          "Progress charts",
          "Reminder notifications",
          "Community challenges",
        ],
        challenges: "Handling offline functionality in a data-intensive app.",
        solutions:
          "Implemented robust local storage with sync capabilities when online.",
      },
    },
    {
      id: 5,
      title: "UI Design System",
      description:
        "A comprehensive design system with reusable components and style guidelines.",
      tags: ["Figma", "Storybook", "CSS"],
      category: "UI/UX",
      image: "/projects/design.jpg",
      github: "https://github.com/MRaysa/design-system",
      live: "https://design-system-docs.com",
      techIcons: [],
      details: {
        features: [
          "Component library",
          "Design tokens",
          "Accessibility guidelines",
          "Documentation",
          "Dark mode support",
        ],
        challenges: "Maintaining consistency across multiple platforms.",
        solutions: "Created detailed documentation and automated style checks.",
      },
    },
  ];

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  // Floating background elements
  const floatingShapes = [...Array(15)].map((_, i) => {
    const colors = [
      "from-blue-500/10 to-blue-700/10",
      "from-purple-500/10 to-purple-700/10",
      "from-emerald-500/10 to-emerald-700/10",
      "from-amber-500/10 to-amber-700/10",
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    return (
      <motion.div
        key={i}
        drag
        dragConstraints={constraintsRef}
        className={`absolute rounded-full bg-gradient-to-br ${randomColor}`}
        style={{
          width: Math.random() * 200 + 50,
          height: Math.random() * 200 + 50,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          mixBlendMode: "multiply",
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
    );
  });

  return (
    <section
      id="projects"
      className="relative py-24 overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50/50 dark:from-gray-900 dark:to-gray-800"
      ref={constraintsRef}
    >
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingShapes}
      </div>

      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-10 dark:opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid-pattern"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Animated Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
              My Projects
            </span>
          </h2>
          <motion.div
            className="w-32 h-1 mx-auto bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
          />
          <motion.p
            className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
          >
            Each project is a unique journey. Here's a collection of my work,
            blending creativity with technical expertise.
          </motion.p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {filters.map((filter) => (
            <motion.button
              key={filter}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === filter
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 shadow-sm border border-gray-200 dark:border-gray-700"
              }`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -10 }}
              className="group relative overflow-hidden rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
            >
              {/* Project Image */}
              <div className="h-48 overflow-hidden relative">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  viewport={{ once: true }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-transparent to-transparent" />
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                    {project.title}
                  </h3>
                  <div className="flex gap-2">
                    {project.techIcons.map((Icon, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        className="text-gray-600 dark:text-gray-400"
                      >
                        {Icon}
                      </motion.div>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <motion.span
                      key={tag}
                      whileHover={{ scale: 1.05 }}
                      className="px-2 py-1 bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400 text-xs rounded-full"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 text-sm"
                    onClick={() => setSelectedProject(project)}
                  >
                    <span>View Details</span>
                  </motion.button>
                  {project.github && (
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300"
                    >
                      <FiGithub />
                    </motion.a>
                  )}
                  {project.live && (
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300"
                    >
                      <FiExternalLink />
                    </motion.a>
                  )}
                </div>
              </div>

              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-5xl mb-4">🧐</div>
            <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300">
              No projects found in this category
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Try selecting a different filter or check back later
            </p>
          </motion.div>
        )}
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                onClick={() => setSelectedProject(null)}
              >
                <FiX size={24} />
              </button>

              {/* Modal content */}
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Image */}
                <div className="relative h-64 lg:h-full overflow-hidden">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-transparent to-transparent" />
                </div>

                {/* Details */}
                <div className="p-8">
                  <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                    {selectedProject.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {selectedProject.description}
                  </p>

                  {/* Tech stack */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                      Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400 text-sm rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                      Key Features
                    </h4>
                    <ul className="space-y-2">
                      {selectedProject.details.features.map((feature, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="flex items-start gap-2 text-gray-600 dark:text-gray-300"
                        >
                          <span className="text-blue-500 mt-1">•</span>
                          <span>{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Challenges & Solutions */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 bg-blue-50/50 dark:bg-gray-700/50 rounded-lg">
                      <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">
                        Challenges
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300">
                        {selectedProject.details.challenges}
                      </p>
                    </div>
                    <div className="p-4 bg-emerald-50/50 dark:bg-gray-700/50 rounded-lg">
                      <h4 className="font-semibold text-emerald-600 dark:text-emerald-400 mb-2">
                        Solutions
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300">
                        {selectedProject.details.solutions}
                      </p>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-3 mt-8">
                    {selectedProject.github && (
                      <motion.a
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        href={selectedProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-gray-800 text-white py-3 px-6 rounded-lg flex items-center justify-center gap-2"
                      >
                        <FiGithub size={18} />
                        <span>View Code</span>
                      </motion.a>
                    )}
                    {selectedProject.live && (
                      <motion.a
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        href={selectedProject.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg flex items-center justify-center gap-2"
                      >
                        <FiExternalLink size={18} />
                        <span>Live Demo</span>
                      </motion.a>
                    )}
                  </div>
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
