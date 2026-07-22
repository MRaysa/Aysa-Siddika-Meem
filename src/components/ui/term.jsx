import { motion } from "framer-motion";

/* Subtle blueprint grid + glow background layer (absolute-positioned). */
export const GridBg = ({ glow = true }) => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    <div className="absolute inset-0 bg-grid" />
    {glow && <div className="absolute inset-0 bg-glow opacity-60" />}
  </div>
);

/* macOS-style terminal window chrome. */
export const TerminalWindow = ({ title = "bash", children, className = "" }) => (
  <div
    className={`overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-2xl ${className}`}
  >
    <div className="flex items-center gap-2 border-b border-[var(--border)] bg-[var(--surface-2)] px-4 py-2.5">
      <span className="term-dot bg-[#ff5f56]" />
      <span className="term-dot bg-[#ffbd2e]" />
      <span className="term-dot bg-[#27c93f]" />
      <span className="ml-3 font-mono text-xs text-[var(--muted)]">{title}</span>
    </div>
    <div className="p-5 sm:p-6 font-mono text-sm leading-relaxed">{children}</div>
  </div>
);

/* A `$ command` prompt line. */
export const Prompt = ({ children, symbol = "$" }) => (
  <div className="flex gap-2">
    <span className="select-none text-[var(--accent)]">{symbol}</span>
    <span className="text-[var(--fg)]">{children}</span>
  </div>
);

/* Command output line. */
export const Output = ({ children, className = "" }) => (
  <div className={`pl-4 text-[var(--muted)] ${className}`}>{children}</div>
);

/* Section header: `// name` kicker + title + optional description. */
export const SectionLabel = ({ name, title, description, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true, margin: "-80px" }}
    className={`mb-12 ${className}`}
  >
    <div className="mb-3 font-mono text-sm">
      <span className="text-[var(--faint)]">// </span>
      <span className="text-[var(--accent)]">{name}</span>
    </div>
    <h2 className="font-mono text-3xl font-bold tracking-tight text-[var(--fg-strong)] md:text-4xl">
      {title}
    </h2>
    {description && (
      <p className="mt-4 max-w-2xl leading-relaxed text-[var(--muted)]">
        {description}
      </p>
    )}
  </motion.div>
);

/* Monospace tag / chip. */
export const Tag = ({ children, className = "" }) => (
  <span
    className={`inline-flex items-center gap-1.5 rounded-md border border-[var(--border)] bg-[var(--surface-2)] px-2.5 py-1 font-mono text-xs text-[var(--muted)] ${className}`}
  >
    {children}
  </span>
);
