import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import {
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiMail,
  FiHeart,
  FiPhone,
  FiMapPin,
  FiArrowUp,
  FiSend,
  FiCode,
  FiCoffee,
} from "react-icons/fi";
import { FaReact, FaNodeJs, FaWhatsapp } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiTypescript, SiMongodb, SiJavascript } from "react-icons/si";
import { HiSparkles, HiLightningBolt } from "react-icons/hi";
import { BsStars } from "react-icons/bs";

const Footer = () => {
  const footerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const [email, setEmail] = useState("");

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  const contactInfo = [
    { icon: <FiMail size={20} />, text: "aysasiddikameem3141@gmail.com", link: "mailto:aysasiddikameem3141@gmail.com", label: "Email" },
    { icon: <FiPhone size={20} />, text: "+880 1617272980", link: "tel:+8801617272980", label: "Phone" },
    { icon: <FaWhatsapp size={20} />, text: "WhatsApp", link: "https://wa.me/8801617272980", label: "WhatsApp" },
    { icon: <FiMapPin size={20} />, text: "Dhaka, Bangladesh", link: null, label: "Location" },
  ];

  const techStack = [
    { icon: <FaReact size={24} />, name: "React", color: "#61DAFB", glow: "rgba(97, 218, 251, 0.4)" },
    { icon: <SiNextdotjs size={24} />, name: "Next.js", color: "#ffffff", glow: "rgba(255, 255, 255, 0.3)" },
    { icon: <SiTypescript size={24} />, name: "TypeScript", color: "#3178C6", glow: "rgba(49, 120, 198, 0.4)" },
    { icon: <SiTailwindcss size={24} />, name: "Tailwind", color: "#06B6D4", glow: "rgba(6, 182, 212, 0.4)" },
    { icon: <FaNodeJs size={24} />, name: "Node.js", color: "#339933", glow: "rgba(51, 153, 51, 0.4)" },
    { icon: <SiMongodb size={24} />, name: "MongoDB", color: "#47A248", glow: "rgba(71, 162, 72, 0.4)" },
  ];

  const socialLinks = [
    { icon: <FiGithub size={24} />, url: "https://github.com/MRaysa", label: "GitHub", color: "#6e5494", gradient: "from-purple-600 to-violet-600" },
    { icon: <FiLinkedin size={24} />, url: "https://linkedin.com/in/mst-aysa-siddika-meem", label: "LinkedIn", color: "#0A66C2", gradient: "from-blue-600 to-cyan-600" },
    { icon: <FiTwitter size={24} />, url: "#", label: "Twitter", color: "#1DA1F2", gradient: "from-cyan-500 to-blue-500" },
    { icon: <FiMail size={24} />, url: "mailto:aysasiddikameem3141@gmail.com", label: "Email", color: "#EA4335", gradient: "from-red-500 to-orange-500" },
  ];

  const quickLinks = [
    { name: "Home", href: "#home", icon: "🏠" },
    { name: "About", href: "#about", icon: "👤" },
    { name: "Projects", href: "#projects", icon: "💼" },
    { name: "Skills", href: "#skills", icon: "⚡" },
    { name: "Education", href: "#educations", icon: "🎓" },
    { name: "Contact", href: "#contact", icon: "📧" },
  ];

  const stats = [
    { value: "50+", label: "Projects", icon: <FiCode /> },
    { value: "1000+", label: "Cups of Coffee", icon: <FiCoffee /> },
    { value: "∞", label: "Lines of Code", icon: <HiLightningBolt /> },
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = footerRef.current?.getBoundingClientRect();
      if (rect) {
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const springConfig = { stiffness: 100, damping: 30 };
  const rotateX = useSpring(useTransform(mouseY, [0, 800], [5, -5]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 1200], [-5, 5]), springConfig);

  return (
    <footer ref={footerRef} className="relative overflow-hidden perspective-[2000px] bg-slate-950">
      {/* Animated Wave Divider at Top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180">
        <svg
          className="relative block w-full h-[120px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          {/* Back wave - darkest */}
          <motion.path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            fill="#581c87"
            opacity="0.3"
            animate={{ d: [
              "M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z",
              "M0,0V26.29c57.79,32.2,113.59,42.17,168,38,80.36-5.37,146.33-43.31,216.8-47.5C458.64,12.43,532.34,43.67,603,62.05c79.27,18,148.3,34.88,219.4,23.08,46.15-6,79.85-27.84,114.45-39.34C1029.49,15,1123-24.29,1200,42.47V0Z",
              "M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            ]}}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Middle wave */}
          <motion.path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            fill="#7c3aed"
            opacity="0.5"
            animate={{ d: [
              "M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z",
              "M0,0V5.81C23,26.92,37.64,46.86,57.69,62.05,109.41,101.27,175,101,234.58,81.58c41.15-10.15,70.09-36.07,99.67-49.8,50.92-19,94.73-36,140.83-39.67,46.26-2.85,80.9,19.42,108.6,41.56,41.77,25.39,72.32,52,113.63,63,50.44,10.79,91.35-16.69,129.13-34.28s85.16-29,126.92-33.05c69.73-5.85,123.28,32.88,178.9,48.84,40.2,8.66,69,6.17,97.09-7.5,32.43-10.89,58-36.93,70.65-59.24V0Z",
              "M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            ]}}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
          {/* Front wave - brightest */}
          <motion.path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            fill="#8b5cf6"
            opacity="0.8"
            animate={{ d: [
              "M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z",
              "M0,0V15.63C159.93,69,324.09,81.32,485.83,52.57c53-7.64,94.23-30.12,137.61-36.46,69-8.63,122.48,22.24,175.56,45.4C857.93,87.22,916,105.24,981.2,100c96.53-7,182.46-55.71,218.8-94.81V0Z",
              "M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            ]}}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </svg>
      </div>

      {/* Aurora Background Effect */}
      <div className="absolute inset-0 bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-950 to-slate-950" />

        {/* Animated Aurora Stripes */}
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              "linear-gradient(45deg, transparent 0%, rgba(139, 92, 246, 0.1) 25%, transparent 50%, rgba(6, 182, 212, 0.1) 75%, transparent 100%)",
              "linear-gradient(45deg, transparent 0%, rgba(6, 182, 212, 0.1) 25%, transparent 50%, rgba(236, 72, 153, 0.1) 75%, transparent 100%)",
              "linear-gradient(45deg, transparent 0%, rgba(236, 72, 153, 0.1) 25%, transparent 50%, rgba(139, 92, 246, 0.1) 75%, transparent 100%)",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />

        {/* Noise Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')]" />
      </div>

      {/* Animated Mesh Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        {[
          { color: "purple", x: "20%", y: "20%", size: 400, delay: 0 },
          { color: "cyan", x: "80%", y: "60%", size: 350, delay: 2 },
          { color: "pink", x: "50%", y: "80%", size: 300, delay: 4 },
          { color: "blue", x: "10%", y: "70%", size: 250, delay: 1 },
        ].map((orb, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full blur-3xl opacity-20`}
            style={{
              width: orb.size,
              height: orb.size,
              left: orb.x,
              top: orb.y,
              background: `radial-gradient(circle, var(--tw-gradient-from) 0%, transparent 70%)`,
              "--tw-gradient-from": orb.color === "purple" ? "#8B5CF6" : orb.color === "cyan" ? "#06B6D4" : orb.color === "pink" ? "#EC4899" : "#3B82F6",
            }}
            animate={{
              x: [0, 50, -30, 0],
              y: [0, -40, 30, 0],
              scale: [1, 1.2, 0.9, 1],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              delay: orb.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Floating Code Symbols */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {["</>", "{}", "[]", "=>", "&&", "||", "++", "//"].map((symbol, i) => (
          <motion.span
            key={i}
            className="absolute text-purple-500/10 font-mono text-2xl font-bold"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 30}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.05, 0.15, 0.05],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 8 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            {symbol}
          </motion.span>
        ))}
      </div>

      {/* Interactive Cursor Glow */}
      {isHovering && (
        <motion.div
          className="absolute w-96 h-96 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)",
            x: mouseX,
            y: mouseY,
            translateX: "-50%",
            translateY: "-50%",
          }}
        />
      )}

      {/* Animated Top Border */}
      <div className="relative h-1 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-600 via-cyan-500 to-pink-500"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-cyan-500 to-pink-500 opacity-50" />
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 container mx-auto px-6 pt-32 pb-20"
        style={{ y, opacity }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Hero CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, type: "spring" }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          {/* Animated Status Badge */}
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full mb-8 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%)",
              border: "1px solid rgba(139, 92, 246, 0.3)",
            }}
            animate={{ boxShadow: ["0 0 20px rgba(139, 92, 246, 0.2)", "0 0 40px rgba(139, 92, 246, 0.4)", "0 0 20px rgba(139, 92, 246, 0.2)"] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-2 h-2 rounded-full bg-green-400"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="text-sm font-medium text-purple-300">Available for Freelance & Full-time Opportunities</span>
            <BsStars className="text-yellow-400" />
          </motion.div>

          {/* Main Heading with 3D Effect */}
          <motion.div
            className="relative inline-block"
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          >
            <motion.h2
              className="text-6xl md:text-8xl font-black mb-6 leading-tight"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
                Let's Build
              </span>
              <span className="block text-white mt-2">
                The Future
                <motion.span
                  className="inline-block ml-4"
                  animate={{ rotate: [0, 20, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🚀
                </motion.span>
              </span>
            </motion.h2>

            {/* Glowing underline */}
            <motion.div
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-1 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500"
              initial={{ width: 0 }}
              whileInView={{ width: "60%" }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mt-8 mb-12 leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Transform your ideas into <span className="text-cyan-400 font-semibold">stunning digital experiences</span>.
            <br className="hidden md:block" />
            Let's create something extraordinary together.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <motion.a
              href="mailto:aysasiddikameem3141@gmail.com"
              className="group relative px-10 py-5 rounded-2xl font-bold text-lg overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600" />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600"
                animate={{ x: ["0%", "100%", "0%"] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <span className="relative flex items-center gap-3 text-white">
                <FiSend className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                Start a Project
              </span>
              <motion.div
                className="absolute inset-0 rounded-2xl"
                animate={{ boxShadow: ["0 0 30px rgba(139, 92, 246, 0.5)", "0 0 60px rgba(139, 92, 246, 0.3)", "0 0 30px rgba(139, 92, 246, 0.5)"] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.a>

            <motion.a
              href="#projects"
              className="group px-10 py-5 rounded-2xl font-bold text-lg border-2 border-purple-500/50 text-purple-300 hover:text-white hover:border-purple-400 transition-all relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 opacity-0 group-hover:opacity-100 transition-opacity"
              />
              <span className="relative flex items-center gap-3">
                View My Work
                <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
              </span>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="flex flex-wrap justify-center gap-8 mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="relative group"
              whileHover={{ y: -10, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition-opacity" />
              <div className="relative px-8 py-6 bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-white/10">
                <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                  {stat.value}
                </div>
                <div className="flex items-center gap-2 text-gray-400 mt-2">
                  <span className="text-purple-400">{stat.icon}</span>
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Grid - Bento Style */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
          viewport={{ once: true }}
        >
          {/* About Card - Large */}
          <motion.div
            className="lg:col-span-5 group relative rounded-3xl overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8 }}
            onMouseEnter={() => setActiveCard("about")}
            onMouseLeave={() => setActiveCard(null)}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/60 to-slate-900/90 backdrop-blur-xl" />
            <div className="absolute inset-[1px] rounded-3xl bg-gradient-to-br from-purple-500/10 to-transparent" />
            <motion.div
              className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: "linear-gradient(135deg, rgba(139, 92, 246, 0.3), transparent, rgba(6, 182, 212, 0.3))" }}
            />

            <div className="relative p-8 h-full">
              {/* Profile Section */}
              <div className="flex items-start gap-6 mb-6">
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-3xl font-black text-white shadow-2xl shadow-purple-500/30">
                    A
                  </div>
                  <motion.div
                    className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-slate-900"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Aysa Siddika Meem</h3>
                  <p className="text-purple-400 font-medium">Full Stack Developer</p>
                  <p className="text-gray-500 text-sm mt-1">IUB • CSE Department</p>
                </div>
              </div>

              <p className="text-gray-400 leading-relaxed mb-6">
                Passionate about creating seamless digital experiences. Specializing in modern web technologies and scalable solutions.
              </p>

              {/* Tech Stack Icons */}
              <div className="flex flex-wrap gap-3">
                {techStack.map((tech, i) => (
                  <motion.div
                    key={i}
                    className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
                    whileHover={{
                      scale: 1.15,
                      backgroundColor: tech.glow,
                      boxShadow: `0 0 20px ${tech.glow}`
                    }}
                    style={{ color: tech.color }}
                    title={tech.name}
                  >
                    {tech.icon}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Quick Links Card */}
          <motion.div
            className="lg:col-span-3 group relative rounded-3xl overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -8 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/60 to-slate-900/90 backdrop-blur-xl" />
            <div className="absolute inset-[1px] rounded-3xl bg-gradient-to-br from-cyan-500/10 to-transparent" />

            <div className="relative p-6 h-full">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
                <span className="p-2 rounded-lg bg-cyan-500/20">
                  <HiLightningBolt className="text-cyan-400" />
                </span>
                Quick Links
              </h3>

              <div className="grid grid-cols-2 gap-3">
                {quickLinks.map((link, i) => (
                  <motion.a
                    key={i}
                    href={link.href}
                    className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all"
                    whileHover={{ x: 5, backgroundColor: "rgba(6, 182, 212, 0.1)" }}
                  >
                    <span>{link.icon}</span>
                    <span className="text-sm font-medium">{link.name}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Card */}
          <motion.div
            className="lg:col-span-4 group relative rounded-3xl overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -8 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-pink-900/60 to-slate-900/90 backdrop-blur-xl" />
            <div className="absolute inset-[1px] rounded-3xl bg-gradient-to-br from-pink-500/10 to-transparent" />

            <div className="relative p-6 h-full">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
                <span className="p-2 rounded-lg bg-pink-500/20">
                  <FiMail className="text-pink-400" />
                </span>
                Get In Touch
              </h3>

              <div className="space-y-3">
                {contactInfo.map((item, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ x: 5 }}
                  >
                    {item.link ? (
                      <a
                        href={item.link}
                        target={item.link.startsWith("http") ? "_blank" : undefined}
                        rel={item.link.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-pink-400 hover:border-pink-500/50 transition-all"
                      >
                        <span className="text-pink-400">{item.icon}</span>
                        <span className="text-sm truncate">{item.text}</span>
                      </a>
                    ) : (
                      <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-400">
                        <span className="text-pink-400">{item.icon}</span>
                        <span className="text-sm">{item.text}</span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Social Links - Horizontal Card */}
          <motion.div
            className="lg:col-span-12 group relative rounded-3xl overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/40 via-slate-900/60 to-cyan-900/40 backdrop-blur-xl" />
            <div className="absolute inset-[1px] rounded-3xl bg-gradient-to-r from-purple-500/5 via-transparent to-cyan-500/5" />

            <div className="relative p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Let's Connect</h3>
                  <p className="text-gray-400">Follow me on social media for updates</p>
                </div>

                <div className="flex items-center gap-4">
                  {socialLinks.map((social, i) => (
                    <motion.a
                      key={i}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative p-4 rounded-2xl bg-white/5 border border-white/10 text-gray-400 overflow-hidden group/social"
                      whileHover={{ scale: 1.1, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-br ${social.gradient} opacity-0 group-hover/social:opacity-100 transition-opacity`}
                      />
                      <span className="relative z-10 group-hover/social:text-white transition-colors">
                        {social.icon}
                      </span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Tech Stack Marquee */}
        <div className="relative overflow-hidden py-8 mb-16">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-950 to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-950 to-transparent z-10" />

          <motion.div
            className="flex gap-8"
            animate={{ x: [0, -1000] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            {[...techStack, ...techStack, ...techStack].map((tech, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 whitespace-nowrap"
                style={{ color: tech.color }}
              >
                {tech.icon}
                <span className="text-gray-300">{tech.name}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          className="relative pt-8 border-t border-white/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Copyright */}
            <div className="text-center lg:text-left">
              <p className="text-gray-400">
                © {new Date().getFullYear()} <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 font-semibold">Aysa Siddika Meem</span>
              </p>
              <p className="text-gray-500 text-sm mt-1">Department of CSE • Independent University Bangladesh</p>
            </div>

            {/* Made with Love */}
            <div className="flex items-center gap-3 text-gray-400">
              <span>Crafted with</span>
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-red-500"
              >
                <FiHeart />
              </motion.span>
              <span>and</span>
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="text-cyan-400"
              >
                <FaReact size={20} />
              </motion.span>
            </div>

            {/* Back to Top */}
            <motion.a
              href="#home"
              className="group flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600/20 to-cyan-600/20 border border-purple-500/30 text-purple-300 hover:text-white"
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(139, 92, 246, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="font-medium">Back to Top</span>
              <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <FiArrowUp />
              </motion.div>
            </motion.a>
          </div>
        </motion.div>
      </motion.div>

      {/* Animated Bottom Border */}
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
  );
};

export default Footer;
