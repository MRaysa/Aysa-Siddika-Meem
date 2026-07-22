import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiGithub,
  FiExternalLink,
  FiChevronDown,
  FiChevronRight,
  FiFileText,
  FiCheck,
  FiGitBranch,
} from "react-icons/fi";
import { projectsApi } from "../../../lib/api";
import { renderIcon } from "../../../lib/icons";
import { SectionLabel, GridBg } from "../../ui/term";

const slug = (title = "") =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const pid = (p, i) => p._id || p.id || `${slug(p.title)}-${i}`;

// A dot color hinting the project's primary tech.
const LANG_COLORS = {
  FaReact: "#61dafb",
  TbBrandReact: "#61dafb",
  SiNextdotjs: "#8b949e",
  TbBrandNextjs: "#8b949e",
  FaNodeJs: "#3fb950",
  SiNodedotjs: "#3fb950",
  SiMongodb: "#47a248",
  FaPython: "#3572a5",
  SiPython: "#3572a5",
  SiFirebase: "#f5820b",
  SiTailwindcss: "#38bdf8",
  SiVite: "#a259ff",
};
const langColor = (p) =>
  LANG_COLORS[(p.techIcons || [])[0]] || "var(--accent)";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeId, setActiveId] = useState(null);
  const [collapsed, setCollapsed] = useState({});

  useEffect(() => {
    const norm = (list) => list.map((p) => ({ ...p, techIcons: p.techIcons || [] }));
    const load = async () => {
      try {
        const data = await projectsApi.list();
        if (Array.isArray(data) && data.length) return norm(data);
        const res = await fetch("/data/projects.json");
        return norm(await res.json());
      } catch {
        try {
          const res = await fetch("/data/projects.json");
          return norm(await res.json());
        } catch {
          return [];
        }
      }
    };
    load().then((list) => {
      setProjects(list);
      if (list.length) setActiveId(pid(list[0], 0));
      setLoading(false);
    });
  }, []);

  // group by category (folders)
  const folders = {};
  projects.forEach((p, i) => {
    const cat = p.category || "misc";
    (folders[cat] = folders[cat] || []).push({ p, i });
  });

  const active =
    projects.find((p, i) => pid(p, i) === activeId) || projects[0];
  const activeIndex = projects.findIndex((p, i) => pid(p, i) === activeId);

  return (
    <section id="projects" className="relative overflow-hidden py-24">
      <GridBg glow={false} />
      <div className="relative z-10 mx-auto max-w-6xl px-5">
        <SectionLabel
          name="ls ~/projects"
          title="Selected Work"
          description="Browse the source tree — pick a project to open its README."
        />

        <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-2xl">
          {/* window bar */}
          <div className="flex items-center gap-2 border-b border-[var(--border)] bg-[var(--surface-2)] px-4 py-2.5">
            <span className="term-dot bg-[#ff5f56]" />
            <span className="term-dot bg-[#ffbd2e]" />
            <span className="term-dot bg-[#27c93f]" />
            <span className="ml-3 font-mono text-xs text-[var(--muted)]">
              projects — workspace
            </span>
            <span className="ml-auto font-mono text-[10px] text-[var(--faint)]">
              {projects.length} repos
            </span>
          </div>

          {loading ? (
            <div className="p-8 font-mono text-sm text-[var(--muted)]">
              <span className="text-[var(--accent)]">$</span> loading workspace
              <span className="caret" />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr]">
              {/* Sidebar / explorer */}
              <aside className="border-b border-[var(--border)] bg-[var(--bg-alt)] lg:border-b-0 lg:border-r">
                <div className="px-4 py-2.5 font-mono text-[11px] uppercase tracking-wider text-[var(--faint)]">
                  Explorer
                </div>
                <div className="max-h-[220px] overflow-y-auto pb-2 lg:max-h-[520px]">
                  {Object.entries(folders).map(([cat, entries]) => {
                    const isCollapsed = collapsed[cat];
                    return (
                      <div key={cat}>
                        <button
                          onClick={() =>
                            setCollapsed((c) => ({ ...c, [cat]: !c[cat] }))
                          }
                          className="flex w-full items-center gap-1.5 px-3 py-1.5 font-mono text-xs text-[var(--fg)] transition-colors hover:bg-[var(--surface-2)]"
                        >
                          {isCollapsed ? (
                            <FiChevronRight size={13} className="text-[var(--faint)]" />
                          ) : (
                            <FiChevronDown size={13} className="text-[var(--faint)]" />
                          )}
                          <span className="text-[var(--amber)]">{cat}</span>
                          <span className="text-[var(--faint)]">/</span>
                        </button>

                        {!isCollapsed &&
                          entries.map(({ p, i }) => {
                            const id = pid(p, i);
                            const isActive = id === activeId;
                            return (
                              <button
                                key={id}
                                onClick={() => setActiveId(id)}
                                className={`flex w-full items-center gap-2 py-1.5 pl-8 pr-3 text-left font-mono text-xs transition-colors ${
                                  isActive
                                    ? "bg-[var(--surface-2)] text-[var(--accent)]"
                                    : "text-[var(--muted)] hover:bg-[var(--surface-2)]/60 hover:text-[var(--fg)]"
                                }`}
                              >
                                <span
                                  className="h-2 w-2 shrink-0 rounded-full"
                                  style={{ background: langColor(p) }}
                                />
                                <span className="truncate">{slug(p.title)}.md</span>
                              </button>
                            );
                          })}
                      </div>
                    );
                  })}
                </div>
              </aside>

              {/* README pane */}
              <div className="flex flex-col">
                {/* editor tab */}
                <div className="flex items-center border-b border-[var(--border)] bg-[var(--bg-alt)]">
                  <div className="flex items-center gap-2 border-r border-[var(--border)] bg-[var(--surface)] px-4 py-2 font-mono text-xs text-[var(--fg)]">
                    <FiFileText size={13} className="text-[var(--blue)]" />
                    {active ? `${slug(active.title)}.md` : "readme.md"}
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {active && (
                    <motion.div
                      key={activeId}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                      className="flex-1 overflow-y-auto p-6 lg:max-h-[520px]"
                    >
                      {active.image && (
                        <div className="mb-5 overflow-hidden rounded-lg border border-[var(--border)]">
                          <img
                            src={active.image}
                            alt={active.title}
                            className="max-h-56 w-full object-cover"
                          />
                        </div>
                      )}

                      <h3 className="flex items-center gap-2 font-mono text-2xl font-bold text-[var(--fg-strong)]">
                        <span className="text-[var(--accent)]">#</span>
                        {active.title}
                      </h3>
                      <p className="mt-3 leading-relaxed text-[var(--muted)]">
                        {active.description}
                      </p>

                      {/* tech stack */}
                      {(active.techIcons?.length || active.tags?.length) > 0 && (
                        <>
                          <p className="mt-6 font-mono text-sm text-[var(--accent)]">
                            ## tech stack
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {(active.techIcons?.length
                              ? active.techIcons
                              : active.tags
                            ).map((t, i) => (
                              <span
                                key={`${t}-${i}`}
                                className="inline-flex items-center gap-1.5 rounded-md border border-[var(--border)] bg-[var(--surface-2)] px-2.5 py-1 font-mono text-xs text-[var(--muted)]"
                              >
                                {renderIcon(t, {
                                  className: "text-[var(--muted)]",
                                })}
                                {t}
                              </span>
                            ))}
                          </div>
                        </>
                      )}

                      {/* features */}
                      {active.details?.features?.length > 0 && (
                        <>
                          <p className="mt-6 font-mono text-sm text-[var(--accent)]">
                            ## features
                          </p>
                          <ul className="mt-2 space-y-1.5">
                            {active.details.features.map((f, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-2 text-sm text-[var(--muted)]"
                              >
                                <FiCheck
                                  className="mt-0.5 shrink-0 text-[var(--accent)]"
                                  size={15}
                                />
                                {f}
                              </li>
                            ))}
                          </ul>
                        </>
                      )}

                      {/* actions */}
                      <div className="mt-7 flex flex-wrap gap-3">
                        {active.github && (
                          <a
                            href={active.github}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-md border border-[var(--border)] px-4 py-2 font-mono text-sm text-[var(--fg)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                          >
                            <FiGithub /> view code
                          </a>
                        )}
                        {active.live && (
                          <a
                            href={active.live}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-md bg-[var(--accent)] px-4 py-2 font-mono text-sm font-medium text-[var(--accent-fg)] transition-opacity hover:opacity-90"
                          >
                            <FiExternalLink /> live demo
                          </a>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}

          {/* status bar */}
          {!loading && active && (
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-[var(--border)] bg-[var(--accent)] px-4 py-1.5 font-mono text-[11px] text-[var(--accent-fg)]">
              <span className="inline-flex items-center gap-1.5">
                <FiGitBranch size={12} /> main
              </span>
              <span>{active.category}</span>
              <span className="ml-auto">
                {activeIndex + 1}/{projects.length}
              </span>
              <span>UTF-8</span>
              <span>Markdown</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
