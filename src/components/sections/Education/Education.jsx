import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiCheck, FiAward } from "react-icons/fi";
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

const jobName = (degree = "") =>
  degree
    .toLowerCase()
    .replace(/\(.*?\)/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 22);

const Stage = ({ edu, index, isLast }) => {
  const running = /present|pursuing|current/i.test(
    `${edu.year} ${edu.details}`
  );
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      className="group flex gap-4"
    >
      {/* status rail */}
      <div className="flex flex-col items-center pt-0.5">
        <span
          className={`relative flex h-6 w-6 items-center justify-center rounded-md border font-mono text-xs ${
            running
              ? "border-[var(--accent)] text-[var(--accent)]"
              : "border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-fg)]"
          }`}
        >
          {running ? (
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
              className="inline-block h-3 w-3 rounded-full border-2 border-[var(--accent)] border-t-transparent"
            />
          ) : (
            <FiCheck size={14} strokeWidth={3} />
          )}
        </span>
        {!isLast && <span className="mt-1 w-px flex-1 bg-[var(--border)]" />}
      </div>

      {/* stage body */}
      <div className="flex-1 pb-8 font-mono text-sm">
        {/* leader row */}
        <div className="flex flex-wrap items-baseline gap-x-2">
          <span className="flex items-center gap-2">
            {renderIcon(edu.icon, {
              className: `${edu.iconColor || "text-[var(--accent)]"}`,
              size: 15,
            })}
            <span className="font-semibold text-[var(--fg-strong)]">
              {jobName(edu.degree)}
            </span>
          </span>
          <span className="hidden flex-1 border-b border-dotted border-[var(--border)] sm:block" />
          <span className="text-[var(--faint)]">{edu.year}</span>
          <span
            className={`rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
              running
                ? "bg-[var(--accent)]/15 text-[var(--accent)]"
                : "bg-[var(--accent)]/10 text-[var(--accent)]"
            }`}
          >
            {running ? "running" : "passed"}
          </span>
        </div>

        {/* full degree + institution */}
        <p className="mt-2 text-[var(--fg)]">{edu.degree}</p>
        <p className="text-[var(--blue)]">{edu.institution}</p>
        {edu.details && (
          <p className="mt-1 text-[var(--muted)]">
            <span className="text-[var(--faint)]">→ </span>
            {edu.details}
          </p>
        )}

        {/* achievements */}
        {edu.achievements?.length > 0 && (
          <div className="mt-3 space-y-1">
            {edu.achievements.map((a, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-[var(--muted)]"
              >
                <FiAward size={12} className="shrink-0 text-[var(--amber)]" />
                {a}
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

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
      <div className="relative z-10 mx-auto max-w-6xl px-5">
        <SectionLabel
          name="./pipeline run education.yml"
          title="Education"
          description="My academic journey — each milestone, a stage that passed."
        />

        <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-2xl">
          {/* window bar */}
          <div className="flex items-center gap-2 border-b border-[var(--border)] bg-[var(--surface-2)] px-4 py-2.5">
            <span className="term-dot bg-[#ff5f56]" />
            <span className="term-dot bg-[#ffbd2e]" />
            <span className="term-dot bg-[#27c93f]" />
            <span className="ml-3 font-mono text-xs text-[var(--muted)]">
              zsh — academic.pipeline
            </span>
          </div>

          <div className="p-5 sm:p-6">
            {/* command + summary */}
            <div className="mb-6 font-mono text-sm">
              <div className="flex gap-2">
                <span className="text-[var(--accent)]">$</span>
                <span className="text-[var(--fg)]">
                  ./pipeline run education.yml
                </span>
              </div>
              <div className="mt-2 text-[var(--muted)]">
                <span className="text-[var(--accent)]">▶</span> education.target
                <span className="text-[var(--faint)]">
                  {" "}
                  · {items.length} stages · CGPA 3.82/4.00
                </span>
              </div>
            </div>

            <div>
              {items.map((edu, i) => (
                <Stage
                  key={edu._id || i}
                  edu={edu}
                  index={i}
                  isLast={i === items.length - 1}
                />
              ))}
            </div>

            {/* footer */}
            <div className="mt-2 flex items-center gap-2 font-mono text-sm text-[var(--accent)]">
              <FiCheck size={14} strokeWidth={3} />
              pipeline finished · academic excellence maintained
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
