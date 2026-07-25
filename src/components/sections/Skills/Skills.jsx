import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiHash } from "react-icons/fi";
import { skillsApi } from "../../../lib/api";
import { renderIcon } from "../../../lib/icons";
import { SectionLabel, GridBg } from "../../ui/term";

// Fallback content (used if the DB is empty / unreachable). [name, icon, color]
const fallbackGroups = {
  Frontend: [
    ["React", "TbBrandReact", "text-cyan-400"],
    ["Next.js", "SiNextdotjs", ""],
    ["TypeScript", "SiTypescript", "text-blue-500"],
    ["JavaScript", "SiJavascript", "text-yellow-400"],
    ["Redux", "SiRedux", "text-purple-500"],
    ["Tailwind CSS", "SiTailwindcss", "text-cyan-500"],
    ["HTML5", "SiHtml5", "text-orange-500"],
    ["CSS3", "SiCss3", "text-blue-500"],
    ["Bootstrap", "SiBootstrap", "text-purple-600"],
  ],
  Backend: [
    ["Node.js", "SiNodedotjs", "text-green-600"],
    ["Express.js", "SiExpress", ""],
    ["Fastify", "SiFastify", ""],
    ["REST API", "", ""],
    ["Socket.io", "SiSocketdotio", ""],
    ["WebSockets", "", ""],
  ],
  Database: [
    ["PostgreSQL", "SiPostgresql", "text-blue-600"],
    ["MongoDB", "SiMongodb", "text-green-500"],
    ["MySQL", "SiMysql", "text-blue-500"],
    ["Redis", "SiRedis", "text-red-500"],
    ["Prisma", "SiPrisma", "text-teal-500"],
    ["Firebase", "SiFirebase", "text-amber-500"],
  ],
  "DevOps & Cloud": [
    ["Docker", "SiDocker", "text-blue-400"],
    ["AWS", "FaAws", "text-orange-500"],
    ["Linux", "SiLinux", "text-yellow-600"],
    ["Nginx", "SiNginx", "text-green-600"],
    ["Cloudflare Workers", "SiCloudflare", "text-orange-500"],
    ["GitHub Actions", "SiGithubactions", "text-blue-500"],
    ["CI/CD", "", ""],
    ["Vercel", "SiVercel", ""],
    ["Netlify", "SiNetlify", "text-teal-500"],
  ],
  Security: [
    ["JWT", "SiJsonwebtokens", "text-pink-500"],
    ["OAuth", "", ""],
    ["NextAuth", "", ""],
    ["RBAC", "", ""],
    ["RSA", "", ""],
  ],
  Programming: [
    ["JavaScript", "SiJavascript", "text-yellow-400"],
    ["TypeScript", "SiTypescript", "text-blue-500"],
    ["Python", "SiPython", "text-blue-500"],
    ["Java", "FaJava", "text-red-500"],
    ["C", "SiC", "text-blue-600"],
    ["C++", "SiCplusplus", "text-blue-500"],
  ],
  "AI & Research": [
    ["AI Integration", "SiOpenai", "text-emerald-500"],
    ["Machine Learning", "https://cdn-icons-png.flaticon.com/512/7017/7017557.png", ""],
    ["Computer Vision", "", ""],
    ["HPC", "", ""],
    ["Parallel Computing", "", ""],
    ["Geospatial Analysis", "", ""],
    ["Data Structures", "", ""],
    ["Algorithms", "", ""],
  ],
  Tools: [
    ["Git", "SiGit", "text-orange-600"],
    ["GitHub", "SiGithub", ""],
    ["Axios", "SiAxios", "text-purple-600"],
    ["Prisma", "SiPrisma", "text-teal-500"],
  ],
};

const CATEGORY_ORDER = [
  "Frontend",
  "Backend",
  "Database",
  "DevOps & Cloud",
  "Security",
  "Programming",
  "AI & Research",
  "Tools",
];

const fallbackFromGroups = () =>
  Object.entries(fallbackGroups).flatMap(([category, list]) =>
    list.map(([name, icon, iconColor]) => ({ name, category, icon, iconColor }))
  );

function groupByCategory(list) {
  const groups = {};
  for (const s of list) {
    const cat = s.category || "Other";
    (groups[cat] = groups[cat] || []).push(s);
  }
  const ordered = CATEGORY_ORDER.filter((c) => groups[c]);
  const extras = Object.keys(groups).filter((c) => !ordered.includes(c));
  return [...ordered, ...extras].map((cat) => ({ cat, items: groups[cat] }));
}

// One dependency-tree branch (a category and its skills).
const Branch = ({ cat, items, index, isLastBranch }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * 0.05 }}
    viewport={{ once: true, margin: "-40px" }}
    className="font-mono text-sm"
  >
    {/* branch header */}
    <div className="flex items-center gap-1.5">
      <span className="select-none text-[var(--faint)]">
        {isLastBranch ? "└─┬" : "├─┬"}
      </span>
      <span className="font-semibold text-[var(--accent)] lowercase">
        {cat.replace(/\s+/g, "-")}
      </span>
      <span className="text-[var(--faint)]">@{items.length}</span>
    </div>

    {/* leaves */}
    <div className="mt-0.5">
      {items.map((s, i) => {
        const last = i === items.length - 1;
        // icon can be: an image URL, a react-icons name, or empty.
        // Concepts with no logo fall back to a neutral marker.
        const isUrl = s.icon && /^https?:\/\//.test(s.icon);
        const icon = isUrl ? (
          <img
            src={s.icon}
            alt=""
            className="h-4 w-4 shrink-0 object-contain"
          />
        ) : (
          renderIcon(s.icon, {
            className: `${s.iconColor || "text-[var(--muted)]"} shrink-0`,
          }) || <FiHash size={12} className="text-[var(--faint)] shrink-0" />
        );
        return (
          <div
            key={`${s.name}-${i}`}
            className="group flex items-center gap-2 rounded px-1 py-[3px] transition-colors hover:bg-[var(--surface-2)]"
          >
            <span className="select-none text-[var(--faint)]">
              {isLastBranch ? "  " : "│ "}
              {last ? "└──" : "├──"}
            </span>
            <span className="flex h-4 w-4 items-center justify-center">
              {icon}
            </span>
            <span className="text-[var(--muted)] transition-colors group-hover:text-[var(--fg)]">
              {s.name}
            </span>
          </div>
        );
      })}
    </div>
  </motion.div>
);

const Skills = () => {
  const [grouped, setGrouped] = useState(() =>
    groupByCategory(fallbackFromGroups())
  );

  useEffect(() => {
    skillsApi
      .list()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0)
          setGrouped(groupByCategory(data));
      })
      .catch((err) => console.error("Skills load failed:", err));
  }, []);

  const total = grouped.reduce((n, g) => n + g.items.length, 0);

  return (
    <section id="skills" className="relative overflow-hidden py-24">
      <GridBg glow={false} />
      <div className="relative z-10 mx-auto max-w-6xl px-5">
        <SectionLabel
          name="npm ls --stack"
          title="Tech Stack"
          description="My working dependency tree — languages, frameworks and tools I ship with."
        />

        <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-2xl">
          {/* window bar */}
          <div className="flex items-center gap-2 border-b border-[var(--border)] bg-[var(--surface-2)] px-4 py-2.5">
            <span className="term-dot bg-[#ff5f56]" />
            <span className="term-dot bg-[#ffbd2e]" />
            <span className="term-dot bg-[#27c93f]" />
            <span className="ml-3 font-mono text-xs text-[var(--muted)]">
              zsh — npm ls
            </span>
          </div>

          <div className="p-5 sm:p-6">
            {/* command + root */}
            <div className="mb-4 font-mono text-sm">
              <div className="flex gap-2">
                <span className="text-[var(--accent)]">$</span>
                <span className="text-[var(--fg)]">npm ls --stack --all</span>
              </div>
              <div className="mt-2 text-[var(--fg-strong)]">
                aysa-siddika-meem
                <span className="text-[var(--faint)]">@stack</span>{" "}
                <span className="text-[var(--faint)]">
                  ({total} dependencies)
                </span>
              </div>
            </div>

            {/* branches grid */}
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
              {grouped.map(({ cat, items }, i) => (
                <Branch
                  key={cat}
                  cat={cat}
                  items={items}
                  index={i}
                  isLastBranch={i === grouped.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
