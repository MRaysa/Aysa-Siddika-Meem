import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { FiMail, FiMapPin, FiPhone, FiSend, FiCheck } from "react-icons/fi";
import { FaTelegramPlane, FaWhatsapp } from "react-icons/fa";

const Contact = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
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

  return (
    <div
      id="contact"
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

      <div className="container mx-auto px-6 py-32 relative z-10">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="flex flex-col lg:flex-row items-center justify-between gap-12 min-h-[70vh]"
        >
          {/* Contact Info */}
          <motion.div variants={itemVariants} className="lg:w-1/2 space-y-8">
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                Let's Connect
              </span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 dark:text-gray-300"
            >
              Have a project in mind or want to discuss opportunities? Feel free
              to reach out!
            </motion.p>

            <motion.div variants={itemVariants} className="space-y-6">
              <ContactInfoItem
                icon={<FiMail className="text-blue-500" size={24} />}
                title="Email"
                value="meem@example.com"
                link="mailto:meem@example.com"
              />
              <ContactInfoItem
                icon={<FiPhone className="text-green-500" size={24} />}
                title="Phone"
                value="+880 1234 567890"
                link="tel:+8801234567890"
              />
              <ContactInfoItem
                icon={<FiMapPin className="text-purple-500" size={24} />}
                title="Location"
                value="Dhaka, Bangladesh"
              />
            </motion.div>

            <motion.div variants={itemVariants} className="flex gap-4 pt-4">
              <motion.a
                href="https://wa.me/8801234567890"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-green-500 text-white rounded-full shadow-lg"
              >
                <FaWhatsapp size={24} />
              </motion.a>
              <motion.a
                href="https://t.me/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-blue-400 text-white rounded-full shadow-lg"
              >
                <FaTelegramPlane size={24} />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants} className="w-full lg:w-1/2">
            <ContactForm />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

const ContactInfoItem = ({ icon, title, value, link }) => {
  return (
    <motion.div
      whileHover={{ x: 5 }}
      className="flex items-start gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
    >
      <div className="p-2 bg-blue-50 dark:bg-gray-700 rounded-lg">{icon}</div>
      <div>
        <h3 className="text-gray-500 dark:text-gray-400 text-sm">{title}</h3>
        {link ? (
          <a
            href={link}
            className="text-lg font-medium text-gray-800 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
          >
            {value}
          </a>
        ) : (
          <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
            {value}
          </p>
        )}
      </div>
    </motion.div>
  );
};

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: "", email: "", message: "" });

      // Reset success message after 3 seconds
      setTimeout(() => setIsSuccess(false), 3000);
    }, 1500);
  };

  return (
    <motion.div whileHover={{ y: -5 }} className="relative">
      {/* Form background layers */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-3xl shadow-lg transform rotate-2"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl shadow-lg transform -rotate-2"></div>
      </div>

      {/* Glow effect */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="absolute -inset-4 bg-blue-500/10 dark:bg-blue-600/10 rounded-3xl blur-md"
      />

      {/* Main form */}
      <div className="relative p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-lg border-2 border-white/20">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          Send me a message
        </h3>

        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg flex items-center gap-3 mb-6"
          >
            <FiCheck className="text-green-500" size={20} />
            <span>Your message has been sent successfully!</span>
          </motion.div>
        ) : null}

        <form onSubmit={handleSubmit}>
          <div className="space-y-5">
            <motion.div whileFocus={{ scale: 1.02 }} className="relative">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </motion.div>

            <motion.div whileFocus={{ scale: 1.02 }} className="relative">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </motion.div>

            <motion.div whileFocus={{ scale: 1.02 }} className="relative">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              ></textarea>
            </motion.div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={!isSubmitting ? { y: -3, scale: 1.02 } : {}}
              whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              className={`w-full px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 ${
                isSubmitting
                  ? "bg-gray-300 dark:bg-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  <FiSend size={18} />
                  Send Message
                </>
              )}
            </motion.button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default Contact;
