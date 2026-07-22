import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
    ["Machine Learning", "", ""],
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

const Chip = ({ skill }) => {
  const icon = renderIcon(skill.icon, {
    className: `${skill.iconColor || "text-[var(--muted)]"} text-base`,
  });
  return (
    <motion.span
      whileHover={{ y: -2 }}
      className="inline-flex items-center gap-2 rounded-md border border-[var(--border)] bg-[var(--surface-2)] px-2.5 py-1.5 font-mono text-xs text-[var(--fg)] transition-colors hover:border-[var(--accent)]"
    >
      {icon}
      {skill.name}
    </motion.span>
  );
};

const CategoryCard = ({ cat, items, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.45, delay: index * 0.06 }}
    viewport={{ once: true, margin: "-40px" }}
    className="card p-5"
  >
    <div className="mb-4 flex items-center gap-2 font-mono text-sm">
      <span className="text-[var(--accent)]">#</span>
      <span className="font-semibold text-[var(--fg-strong)] lowercase">
        {cat}
      </span>
      <span className="ml-auto text-[var(--faint)]">{items.length}</span>
    </div>
    <div className="flex flex-wrap gap-2">
      {items.map((s, i) => (
        <Chip key={`${s.name}-${i}`} skill={s} />
      ))}
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

  return (
    <section id="skills" className="relative overflow-hidden py-24">
      <GridBg glow={false} />
      <div className="relative z-10 mx-auto max-w-6xl px-5">
        <SectionLabel
          name="cat skills.json"
          title="Tech Stack"
          description="Languages, frameworks and tools I use to design and ship software."
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {grouped.map(({ cat, items }, i) => (
            <CategoryCard key={cat} cat={cat} items={items} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
