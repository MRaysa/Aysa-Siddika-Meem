import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiGithub,
  FiExternalLink,
  FiX,
  FiFolder,
  FiCheck,
} from "react-icons/fi";
import { projectsApi } from "../../../lib/api";
import { renderIcon } from "../../../lib/icons";
import { SectionLabel, GridBg } from "../../ui/term";

const TechRow = ({ techIcons = [], tags = [] }) => {
  const names = techIcons.length ? techIcons : tags.slice(0, 5);
  return (
    <div className="flex flex-wrap items-center gap-2">
      {names.map((name, i) => {
        const icon = renderIcon(name, { className: "text-[var(--muted)]" });
        return (
          <span
            key={`${name}-${i}`}
            className="inline-flex items-center gap-1.5 rounded-md border border-[var(--border)] bg-[var(--surface-2)] px-2 py-0.5 font-mono text-xs text-[var(--muted)]"
          >
            {icon}
            {name}
          </span>
        );
      })}
    </div>
  );
};

const RepoCard = ({ project, index, onOpen }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: (index % 3) * 0.08 }}
    viewport={{ once: true, margin: "-40px" }}
    whileHover={{ y: -4 }}
    onClick={() => onOpen(project)}
    className="card group flex cursor-pointer flex-col overflow-hidden hover:border-[var(--accent)]"
  >
    {/* preview */}
    {project.image && (
      <div className="relative aspect-video overflow-hidden border-b border-[var(--border)]">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-transparent to-transparent opacity-60" />
      </div>
    )}

    <div className="flex flex-1 flex-col p-5">
      <div className="mb-2 flex items-center gap-2 font-mono text-sm">
        <FiFolder className="text-[var(--accent)]" />
        <span className="font-semibold text-[var(--fg-strong)]">
          {project.title}
        </span>
      </div>

      <p className="mb-4 flex-1 text-sm leading-relaxed text-[var(--muted)]">
        {project.description}
      </p>

      <div className="mb-4">
        <TechRow techIcons={project.techIcons} tags={project.tags} />
      </div>

      <div className="flex items-center gap-4 border-t border-[var(--border)] pt-3 font-mono text-xs">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
          >
            <FiGithub size={14} /> code
          </a>
        )}
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
          >
            <FiExternalLink size={14} /> live
          </a>
        )}
        <span className="ml-auto text-[var(--faint)]">{project.category}</span>
      </div>
    </div>
  </motion.div>
);

const ProjectModal = ({ project, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={onClose}
    className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm"
  >
    <motion.div
      initial={{ scale: 0.96, y: 20 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0.96, y: 20 }}
      onClick={(e) => e.stopPropagation()}
      className="my-8 w-full max-w-2xl overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-2xl"
    >
      {/* window bar */}
      <div className="flex items-center gap-2 border-b border-[var(--border)] bg-[var(--surface-2)] px-4 py-2.5">
        <span className="term-dot bg-[#ff5f56]" />
        <span className="term-dot bg-[#ffbd2e]" />
        <span className="term-dot bg-[#27c93f]" />
        <span className="ml-3 truncate font-mono text-xs text-[var(--muted)]">
          ~/projects/{project.title}
        </span>
        <button
          onClick={onClose}
          className="ml-auto text-[var(--muted)] hover:text-[var(--fg)]"
        >
          <FiX />
        </button>
      </div>

      {project.image && (
        <img
          src={project.image}
          alt={project.title}
          className="max-h-64 w-full border-b border-[var(--border)] object-cover"
        />
      )}

      <div className="p-6">
        <h3 className="font-mono text-xl font-bold text-[var(--fg-strong)]">
          {project.title}
        </h3>
        <p className="mt-2 leading-relaxed text-[var(--muted)]">
          {project.description}
        </p>

        {/* tags */}
        {project.tags?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span
                key={t}
                className="rounded-md border border-[var(--border)] bg-[var(--surface-2)] px-2 py-0.5 font-mono text-xs text-[var(--muted)]"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {/* features */}
        {project.details?.features?.length > 0 && (
          <div className="mt-6">
            <p className="mb-2 font-mono text-sm text-[var(--accent)]">
              # features
            </p>
            <ul className="space-y-1.5">
              {project.details.features.map((f, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-[var(--muted)]"
                >
                  <FiCheck className="mt-0.5 shrink-0 text-[var(--accent)]" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* actions */}
        <div className="mt-6 flex gap-3">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-[var(--border)] px-4 py-2 font-mono text-sm text-[var(--fg)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <FiGithub /> view code
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-[var(--accent)] px-4 py-2 font-mono text-sm font-medium text-[var(--accent-fg)] hover:opacity-90"
            >
              <FiExternalLink /> live demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  </motion.div>
);

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const withIcons = (list) =>
      list.map((p) => ({ ...p, techIcons: p.techIcons || [] }));

    const load = async () => {
      try {
        const data = await projectsApi.list();
        if (Array.isArray(data) && data.length > 0) {
          setProjects(withIcons(data));
        } else {
          const res = await fetch("/data/projects.json");
          setProjects(withIcons(await res.json()));
        }
      } catch {
        try {
          const res = await fetch("/data/projects.json");
          setProjects(withIcons(await res.json()));
        } catch {
          setProjects([]);
        }
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const categories = ["all", ...new Set(projects.map((p) => p.category).filter(Boolean))];
  const filtered =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="relative overflow-hidden py-24">
      <GridBg glow={false} />
      <div className="relative z-10 mx-auto max-w-6xl px-5">
        <SectionLabel
          name="ls ~/projects"
          title="Selected Work"
          description="A selection of things I've designed, built and shipped."
        />

        {/* filters */}
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`rounded-md border px-3 py-1.5 font-mono text-xs transition-colors ${
                filter === c
                  ? "border-[var(--accent)] text-[var(--accent)]"
                  : "border-[var(--border)] text-[var(--muted)] hover:text-[var(--fg)]"
              }`}
            >
              {c === "all" ? "--all" : c}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="font-mono text-sm text-[var(--muted)]">
            <span className="text-[var(--accent)]">$</span> loading projects
            <span className="caret" />
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p, i) => (
              <RepoCard
                key={p._id || p.id || i}
                project={p}
                index={i}
                onOpen={setSelected}
              />
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
