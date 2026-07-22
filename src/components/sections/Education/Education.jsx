import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiAward } from "react-icons/fi";
import { educationApi } from "../../../lib/api";
import { renderIcon } from "../../../lib/icons";
import { SectionLabel, GridBg } from "../../ui/term";

const fallbackEducation = [
  {
    degree: "M.Sc. in Computer Science",
    institution: "Independent University, Bangladesh (IUB)",
    location: "Dhaka, Bangladesh",
    details: "Currently pursuing",
    year: "2026 - Present",
    icon: "FaGraduationCap",
    iconColor: "text-blue-500",
    achievements: ["Graduate studies in Computer Science"],
  },
  {
    degree: "B.Sc. in Computer Science & Engineering (CSE)",
    institution: "Independent University, Bangladesh (IUB)",
    location: "Dhaka, Bangladesh",
    details: "CGPA: 3.82 / 4.00 · Minor: Big Data & High-Performance Computing",
    year: "2022 - 2026",
    icon: "FaUniversity",
    iconColor: "text-purple-500",
    achievements: [
      "Vice Chancellor's Honour List",
      "Dean's Honour List & Dean's Merit List",
      "Undergraduate Researcher at CCDS",
    ],
  },
  {
    degree: "Higher Secondary Certificate (HSC) – Science",
    institution: "Barguna Residential Model College",
    location: "Barguna, Bangladesh",
    details: "GPA: 5.00 / 5.00",
    year: "2020",
    icon: "FaSchool",
    iconColor: "text-green-500",
    achievements: ["Perfect GPA 5.00"],
  },
];

const EduEntry = ({ edu, index, isLast }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true, margin: "-60px" }}
    className="relative pl-8"
  >
    {!isLast && (
      <span className="absolute left-[7px] top-4 h-full w-px bg-[var(--border)]" />
    )}
    <span className="absolute left-0 top-2 h-4 w-4 rounded-full border-2 border-[var(--border-strong)] bg-[var(--bg)]" />

    <div className="card p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 shrink-0">
            {renderIcon(edu.icon, {
              className: `${edu.iconColor || "text-[var(--accent)]"}`,
              size: 20,
            })}
          </span>
          <div>
            <h3 className="font-mono font-semibold text-[var(--fg-strong)]">
              {edu.degree}
            </h3>
            <p className="mt-0.5 font-mono text-sm text-[var(--blue)]">
              {edu.institution}
            </p>
          </div>
        </div>
        <span className="rounded border border-[var(--border)] px-2 py-0.5 font-mono text-xs text-[var(--muted)]">
          {edu.year}
        </span>
      </div>

      {edu.details && (
        <p className="mt-3 pl-8 font-mono text-sm text-[var(--muted)]">
          {edu.details}
        </p>
      )}

      {edu.achievements?.length > 0 && (
        <ul className="mt-3 space-y-1 pl-8">
          {edu.achievements.map((a, i) => (
            <li
              key={i}
              className="flex items-center gap-2 text-sm text-[var(--muted)]"
            >
              <FiAward className="shrink-0 text-[var(--amber)]" size={13} />
              {a}
            </li>
          ))}
        </ul>
      )}
    </div>
  </motion.div>
);

const Education = () => {
  const [items, setItems] = useState(fallbackEducation);

  useEffect(() => {
    educationApi
      .list()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setItems(data);
      })
      .catch((err) => console.error("Education load failed:", err));
  }, []);

  return (
    <section id="educations" className="relative overflow-hidden py-24">
      <GridBg glow={false} />
      <div className="relative z-10 mx-auto max-w-4xl px-5">
        <SectionLabel
          name="cat education.log"
          title="Education"
          description="Academic background in Computer Science & Engineering."
        />

        <div className="space-y-6">
          {items.map((edu, i) => (
            <EduEntry
              key={edu._id || i}
              edu={edu}
              index={i}
              isLast={i === items.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
