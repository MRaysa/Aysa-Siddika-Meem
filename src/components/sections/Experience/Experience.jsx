import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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

// deterministic short commit hash from a string
const shortHash = (str = "") => {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h.toString(16).padStart(7, "0").slice(0, 7);
};

const scope = (company = "") =>
  company.toLowerCase().replace(/[^a-z0-9]+/g, "").slice(0, 10);

const Commit = ({ exp, index, isLast }) => {
  const hash = shortHash(exp.company + exp.title);
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      viewport={{ once: true, margin: "-60px" }}
      className="group flex gap-4"
    >
      {/* graph rail */}
      <div className="flex flex-col items-center pt-1">
        <span
          className={`relative flex h-4 w-4 items-center justify-center rounded-full border-2 ${
            exp.current
              ? "border-[var(--accent)] bg-[var(--accent)]"
              : "border-[var(--border-strong)] bg-[var(--bg)]"
          }`}
        >
          {exp.current && (
            <span className="absolute h-4 w-4 animate-ping rounded-full bg-[var(--accent)] opacity-40" />
          )}
        </span>
        {!isLast && <span className="mt-1 w-px flex-1 bg-[var(--border)]" />}
      </div>

      {/* commit body */}
      <div className="flex-1 pb-9 font-mono text-sm leading-relaxed">
        {/* commit hash + refs */}
        <div className="flex flex-wrap items-center gap-x-2">
          <span className="text-[var(--amber)]">commit {hash}</span>
          {exp.current ? (
            <span className="text-[var(--faint)]">
              (<span className="text-[var(--cyan)]">HEAD -&gt; </span>
              <span className="text-[var(--accent)]">main</span>
              <span className="text-[var(--faint)]">, </span>
              <span className="text-[var(--red)]">origin/main</span>)
            </span>
          ) : (
            <span className="text-[var(--faint)]">
              (<span className="text-[var(--red)]">origin/main</span>)
            </span>
          )}
        </div>

        {/* author + date */}
        <div className="text-[var(--muted)]">
          <span className="text-[var(--faint)]">Author: </span>
          Aysa Siddika Meem &lt;aysasiddikameem3141@gmail.com&gt;
        </div>
        <div className="text-[var(--muted)]">
          <span className="text-[var(--faint)]">Date:&nbsp;&nbsp; </span>
          {exp.period}
          <span className="text-[var(--faint)]">
            {" "}
            · {exp.location} · {exp.type}
          </span>
        </div>

        {/* commit subject */}
        <div className="mt-3 pl-4">
          <span className="text-[var(--accent)]">feat</span>
          <span className="text-[var(--faint)]">(</span>
          <span className="text-[var(--amber)]">{scope(exp.company)}</span>
          <span className="text-[var(--faint)]">): </span>
          <span className="font-semibold text-[var(--fg-strong)]">
            {exp.title}
          </span>
          <span className="text-[var(--muted)]"> @ {exp.company}</span>
        </div>

        {/* body bullets */}
        <div className="mt-2 space-y-1 pl-4">
          {(exp.description || []).map((d, i) => (
            <div key={i} className="flex gap-2 text-[var(--muted)]">
              <span className="select-none text-[var(--faint)]">-</span>
              <span>{d}</span>
            </div>
          ))}
        </div>

        {/* tech footer */}
        {exp.technologies?.length > 0 && (
          <div className="mt-3 flex flex-wrap items-center gap-2 pl-4">
            <span className="text-[var(--faint)]">stack:</span>
            {exp.technologies.map((t) => (
              <span
                key={t}
                className="rounded border border-[var(--border)] bg-[var(--surface-2)] px-1.5 py-0.5 text-xs text-[var(--muted)] transition-colors group-hover:border-[var(--border-strong)]"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

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
      <div className="relative z-10 mx-auto max-w-6xl px-5">
        <SectionLabel
          name="git log --experience"
          title="Experience"
          description="My commit history — roles where I've shipped real products for real users."
        />

        <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-2xl">
          {/* window bar */}
          <div className="flex items-center gap-2 border-b border-[var(--border)] bg-[var(--surface-2)] px-4 py-2.5">
            <span className="term-dot bg-[#ff5f56]" />
            <span className="term-dot bg-[#ffbd2e]" />
            <span className="term-dot bg-[#27c93f]" />
            <span className="ml-3 font-mono text-xs text-[var(--muted)]">
              zsh — git log
            </span>
          </div>

          <div className="p-5 sm:p-6">
            {/* command */}
            <div className="mb-6 flex gap-2 font-mono text-sm">
              <span className="text-[var(--accent)]">$</span>
              <span className="text-[var(--fg)]">
                git log --graph --decorate --author="Aysa"
              </span>
            </div>

            <div>
              {experiences.map((exp, i) => (
                <Commit
                  key={exp._id || i}
                  exp={exp}
                  index={i}
                  isLast={i === experiences.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
