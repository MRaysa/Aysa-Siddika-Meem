import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiMapPin, FiClock } from "react-icons/fi";
import { experienceApi } from "../../../lib/api";
import { SectionLabel, GridBg } from "../../ui/term";

const fallbackExperiences = [
  {
    title: "Junior Software Engineer",
    company: "NAFCORP Technologies",
    location: "Remote, Australia",
    period: "Jul 2026 – Present",
    type: "Full-time",
    current: true,
    description: [
      "Developing PluginChatbot — an AI chatbot SaaS embedded on client sites for instant support",
      "Building the full management dashboard with responsive UI/UX",
      "Implementing human-handoff so team members can take over conversations",
    ],
    technologies: ["Next.js", "Node.js", "TypeScript", "OpenAI", "PostgreSQL"],
  },
  {
    title: "Software Engineer",
    company: "Sharetasking",
    location: "Remote, United States",
    period: "Aug 2025 – Jul 2026",
    type: "Full-time",
    current: false,
    description: [
      "Built multi-tenant SaaS products with Stripe billing and role-based access control",
      "Integrated Facebook Ads API and AI features via OpenAI & Gemini",
      "Optimized performance and shipped features in Agile sprints",
    ],
    technologies: ["Next.js", "Fastify", "Prisma", "PostgreSQL", "MongoDB", "Stripe"],
  },
  {
    title: "Full Stack Engineer",
    company: "JWeis Marketing",
    location: "Remote, United States",
    period: "Nov 2024 – Apr 2026",
    type: "Full-time",
    current: false,
    description: [
      "Built a marketing automation platform streamlining campaign workflows",
      "Integrated HubSpot CRM, Mailchimp and Facebook Ads APIs",
      "Developed AI-powered personalized email generation",
    ],
    technologies: ["Next.js", "Node.js", "HubSpot", "Mailchimp"],
  },
];

// git-style scope from company name, e.g. "nafcorp"
const scope = (company) =>
  (company || "").toLowerCase().replace(/[^a-z0-9]+/g, "").slice(0, 10);

const CommitEntry = ({ exp, index, isLast }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true, margin: "-60px" }}
    className="relative pl-8"
  >
    {/* timeline line + node */}
    {!isLast && (
      <span className="absolute left-[7px] top-4 h-full w-px bg-[var(--border)]" />
    )}
    <span
      className={`absolute left-0 top-2 flex h-4 w-4 items-center justify-center rounded-full border-2 ${
        exp.current
          ? "border-[var(--accent)] bg-[var(--accent)]"
          : "border-[var(--border-strong)] bg-[var(--bg)]"
      }`}
    >
      {exp.current && (
        <span className="absolute h-4 w-4 animate-ping rounded-full bg-[var(--accent)] opacity-50" />
      )}
    </span>

    <div className="card p-5 sm:p-6">
      {/* commit header */}
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="font-mono text-sm">
          <span className="text-[var(--accent)]">feat</span>
          <span className="text-[var(--faint)]">(</span>
          <span className="text-[var(--amber)]">{scope(exp.company)}</span>
          <span className="text-[var(--faint)]">):</span>{" "}
          <span className="font-semibold text-[var(--fg-strong)]">
            {exp.title}
          </span>
        </div>
        {exp.current && (
          <span className="rounded border border-[var(--accent)] px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
            HEAD
          </span>
        )}
      </div>

      {/* meta */}
      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-[var(--muted)]">
        <span className="text-[var(--blue)]">@ {exp.company}</span>
        <span className="inline-flex items-center gap-1">
          <FiMapPin size={12} /> {exp.location}
        </span>
        <span className="inline-flex items-center gap-1">
          <FiClock size={12} /> {exp.period}
        </span>
        {exp.type && (
          <span className="text-[var(--faint)]">· {exp.type}</span>
        )}
      </div>

      {/* diff-style bullets */}
      <ul className="mt-4 space-y-1.5 font-mono text-sm">
        {(exp.description || []).map((d, i) => (
          <li key={i} className="flex gap-2">
            <span className="select-none text-[var(--accent)]">+</span>
            <span className="text-[var(--muted)]">{d}</span>
          </li>
        ))}
      </ul>

      {/* tech tags */}
      {exp.technologies?.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {exp.technologies.map((t) => (
            <span
              key={t}
              className="rounded-md border border-[var(--border)] bg-[var(--surface-2)] px-2 py-0.5 font-mono text-xs text-[var(--muted)]"
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
  </motion.div>
);

const Experience = () => {
  const [experiences, setExperiences] = useState(fallbackExperiences);

  useEffect(() => {
    experienceApi
      .list()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setExperiences(data);
      })
      .catch((err) => console.error("Experience load failed:", err));
  }, []);

  return (
    <section id="experience" className="relative overflow-hidden py-24">
      <GridBg glow={false} />
      <div className="relative z-10 mx-auto max-w-4xl px-5">
        <SectionLabel
          name="git log --experience"
          title="Experience"
          description="Roles where I've shipped real products for real users."
        />

        <div className="space-y-6">
          {experiences.map((exp, i) => (
            <CommitEntry
              key={exp._id || i}
              exp={exp}
              index={i}
              isLast={i === experiences.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
