import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-scroll";
import { FiMoon, FiSun, FiMenu, FiX, FiDownload } from "react-icons/fi";
import Button from "../ui/Button";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [activeLink, setActiveLink] = useState("home");

  const navLinks = [
    { name: "Home", to: "home" },
    { name: "About", to: "about" },
    { name: "Projects", to: "projects" },
    { name: "Contact", to: "contact" },
  ];

  // Color scheme
  const colors = {
    primary: "rgb(99 102 241)", // indigo-600
    primaryLight: "rgb(129 140 248)", // indigo-400
    darkBg: "rgb(17 24 39)", // gray-900
    lightBg: "rgb(255 255 255)",
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Update active link based on scroll position
      const sections = document.querySelectorAll("section");
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 100) {
          setActiveLink(section.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("darkMode", newMode);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? `bg-white/90 dark:bg-[${colors.darkBg}]/90 backdrop-blur-md py-2 shadow-sm`
          : "py-4"
      }`}
      style={{
        backgroundColor: scrolled
          ? darkMode
            ? `${colors.darkBg}cc`
            : `${colors.lightBg}cc`
          : "transparent",
      }}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Animated Logo */}
        <Link
          to="home"
          smooth={true}
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => setActiveLink("home")}
        >
          <motion.div
            whileHover={{ rotate: 15 }}
            className="w-10 h-10 rounded-lg bg-indigo-600 dark:bg-indigo-500 flex items-center justify-center shadow-lg"
          >
            <span className="text-white font-bold text-xl">AS</span>
          </motion.div>
          <span className="text-2xl text-blue-600 dark:text-blue-600 hidden md:block transition-opacity group-hover:opacity-80">
            Aysa
          </span>
        </Link>

        {/* Desktop Navigation with animated indicators */}
        <nav className="hidden md:flex items-center gap-8 relative">
          {navLinks.map((link) => (
            <div
              key={link.to}
              className="relative"
              onMouseEnter={() => setActiveLink(link.to)}
              onMouseLeave={() =>
                setActiveLink(window.location.hash.slice(1) || "home")
              }
            >
              <Link
                to={link.to}
                smooth={true}
                offset={-80}
                className={`px-2 py-1 transition-colors cursor-pointer font-medium relative z-10 ${
                  activeLink === link.to
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "text-white dark:text-white hover:text-indigo-500 dark:hover:text-indigo-400"
                }`}
                onClick={() => setActiveLink(link.to)}
              >
                {link.name}
              </Link>
              {activeLink === link.to && (
                <motion.div
                  layoutId="navIndicator"
                  className="absolute bottom-0 left-0 w-full h-1 bg-indigo-500 rounded-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                />
              )}
            </div>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Button
            variant="primary"
            onClick={() => window.open("/resume.pdf")}
            className="group"
            icon={
              <FiDownload className="transition-transform group-hover:translate-y-0.5" />
            }
          >
            Resume
          </Button>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label={`Switch to ${darkMode ? "light" : "dark"} mode`}
          >
            {darkMode ? (
              <FiSun className="text-yellow-400" size={20} />
            ) : (
              <FiMoon className="text-indigo-600" size={20} />
            )}
          </button>
        </div>

        {/* Mobile Menu Button with animated hamburger */}
        <button
          className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 relative z-50"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <motion.div
            animate={mobileOpen ? "open" : "closed"}
            variants={{
              open: { rotate: 45, y: 5 },
              closed: { rotate: 0, y: 0 },
            }}
            className="w-6 h-0.5 bg-current"
          />
          <motion.div
            animate={mobileOpen ? "open" : "closed"}
            variants={{
              open: { opacity: 0 },
              closed: { opacity: 1 },
            }}
            className="w-6 h-0.5 bg-current my-1.5"
          />
          <motion.div
            animate={mobileOpen ? "open" : "closed"}
            variants={{
              open: { rotate: -45, y: -5 },
              closed: { rotate: 0, y: 0 },
            }}
            className="w-6 h-0.5 bg-current"
          />
        </button>
      </div>

      {/* Mobile Menu with sliding animation */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white dark:bg-gray-800 shadow-xl rounded-2xl"
            style={{ width: "200px", marginLeft: "auto", marginRight: "10px" }}
          >
            <div className="container mx-auto px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  smooth={true}
                  offset={-80}
                  className={`px-4 py-3 rounded-lg transition-colors ${
                    activeLink === link.to
                      ? "bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                  onClick={() => {
                    setMobileOpen(false);
                    setActiveLink(link.to);
                  }}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button
                  variant="primary"
                  onClick={() => {
                    window.open("/resume.pdf");
                    setMobileOpen(false);
                  }}
                  className="w-full"
                  icon={<FiDownload />}
                >
                  Resume
                </Button>
                <button
                  onClick={toggleTheme}
                  className="p-3 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center"
                >
                  {darkMode ? (
                    <FiSun className="text-yellow-400" size={20} />
                  ) : (
                    <FiMoon className="text-indigo-600" size={20} />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
