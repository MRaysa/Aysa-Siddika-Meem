import React from "react";
import { motion } from "framer-motion";
import { FaGraduationCap, FaSchool, FaUniversity } from "react-icons/fa";
import { GiDiploma } from "react-icons/gi";

const Education = () => {
  const educationData = [
    {
      id: 1,
      degree: "Bachelor of Science in Computer Science and Engineering (CSE)",
      institution: "Independent University Bangladesh (IUB)",
      location: "IUB, Bangladesh",
      details: "Minor: Big Data and High Performance Computing | ID: 2220281",
      icon: <FaUniversity className="text-blue-500" size={24} />,
      year: "2022 - Present",
    },
    {
      id: 2,
      degree: "Higher Secondary School Certificate (Science Group)",
      institution: "Barguna Residential Model College",
      location: "BRMC, Bangladesh",
      details: "GPA: 5.00",
      icon: <FaSchool className="text-green-500" size={24} />,
      year: "February 2020",
    },
    {
      id: 3,
      degree: "Secondary School Certificate (Science Group)",
      institution: "Garjunbunia Secondary School, Barguna",
      location: "Bangladesh",
      details: "GPA: 5.00",
      icon: <FaSchool className="text-purple-500" size={24} />,
      year: "April 2018",
    },
    {
      id: 4,
      degree: "Junior School Certificate",
      institution: "Gazimahmud JR. High School",
      location: "Bangladesh",
      details: "GPA: 5.00",
      icon: <GiDiploma className="text-yellow-500" size={24} />,
      year: "November 2015",
    },
  ];

  return (
    <section
      id="educations"
      className="relative py-24 overflow-hidden bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-gray-900 dark:to-gray-800"
    >
      {/* Background elements */}
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

      <div className="container mx-auto px-6 relative z-10">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
              Education Journey
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
            className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
          >
            My academic path has been a continuous pursuit of knowledge and
            excellence in computer science and technology.
          </motion.p>
        </motion.div>

        {/* Education Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-400 to-purple-500 dark:from-blue-600 dark:to-purple-600"></div>

          {educationData.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className={`mb-12 flex flex-col ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } items-center`}
            >
              {/* Timeline dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 border-4 border-white dark:border-gray-800 z-10"></div>

              {/* Content */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`w-full md:w-5/12 p-6 rounded-xl shadow-lg ${
                  index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
                } bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700`}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-50 dark:bg-gray-700 rounded-lg">
                    {edu.icon}
                  </div>
                  <div>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                        {edu.degree}
                      </h3>
                      <span className="text-sm bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 px-3 py-1 rounded-full">
                        {edu.year}
                      </span>
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
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Achievement Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 p-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-xl text-center text-white"
        >
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-center mb-4">
              <FaGraduationCap size={40} />
            </div>
            <h3 className="text-2xl font-bold mb-2">Perfect Academic Record</h3>
            <p className="text-blue-100">
              Maintained a perfect GPA of 5.00 throughout my school and college
              education, demonstrating consistent academic excellence.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
