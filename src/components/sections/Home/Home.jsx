import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { FiGithub, FiLinkedin, FiMail, FiArrowRight, FiDownload } from "react-icons/fi";
import { GridBg } from "../../ui/term";

const RESUME = "/Mst_Aysa_Siddika_Meem_Resume.pdf";

const SOCIALS = [
  { icon: <FiGithub size={18} />, url: "https://github.com/MRaysa", label: "github" },
  { icon: <FiLinkedin size={18} />, url: "https://www.linkedin.com/in/mst-aysa-siddika-meem/", label: "linkedin" },
  { icon: <FiMail size={18} />, url: "mailto:aysasiddikameem3141@gmail.com", label: "email" },
];

// Token colors -> CSS design tokens
const C = {
  kw: "var(--red)",
  fn: "var(--blue)",
  key: "var(--purple)",
  str: "var(--cyan)",
  num: "var(--amber)",
  punc: "var(--faint)",
  cmt: "var(--faint)",
  plain: "var(--fg)",
};

// The "developer.ts" file that gets typed out — this is "about me" as code.
const CODE = [
  [["// who I am, in code", "cmt"]],
  [["const ", "kw"], ["engineer", "fn"], [": ", "punc"], ["Developer", "fn"], [" = {", "punc"]],
  [["  name", "key"], [": ", "punc"], ['"Aysa Siddika Meem"', "str"], [",", "punc"]],
  [["  role", "key"], [": ", "punc"], ['"Full-Stack Software Engineer"', "str"], [",", "punc"]],
  [["  location", "key"], [": ", "punc"], ['"Dhaka, BD · Remote"', "str"], [",", "punc"]],
  [["  experience", "key"], [": ", "punc"], ['"2+ years"', "str"], [",", "punc"]],
  [["  stack", "key"], [": [", "punc"], ['"Next.js"', "str"], [", ", "punc"], ['"Node"', "str"], [", ", "punc"], ['"Fastify"', "str"], ["],", "punc"]],
  [["  databases", "key"], [": [", "punc"], ['"PostgreSQL"', "str"], [", ", "punc"], ['"MongoDB"', "str"], ["],", "punc"]],
  [["  focus", "key"], [": [", "punc"], ['"SaaS"', "str"], [", ", "punc"], ['"AI"', "str"], [", ", "punc"], ['"Scalable APIs"', "str"], ["],", "punc"]],
  [["  openToWork", "key"], [": ", "punc"], ["true", "num"], [",", "punc"]],
  [["};", "punc"]],
  [[""]],
  [["export default", "kw"], [" engineer", "fn"], [";", "punc"]],
];

const lineLength = (line) => line.reduce((n, t) => n + t[0].length, 0);

const CodeEditor = () => {
  // total characters typed so far
  const [count, setCount] = useState(0);
  const total = useRef(CODE.reduce((n, l) => n + lineLength(l), 0));

  useEffect(() => {
    let n = 0;
    let timer;
    const tick = () => {
      n++;
      if (n > total.current) {
        // hold, then restart the "session"
        timer = setTimeout(() => {
          n = 0;
          setCount(0);
          timer = setTimeout(tick, 400);
        }, 2600);
        setCount(total.current);
        return;
      }
      setCount(n);
      timer = setTimeout(tick, 32);
    };
    timer = setTimeout(tick, 500);
    return () => clearTimeout(timer);
  }, []);

  // Figure out how many chars belong to each line as we render
  let consumed = 0;
  const rendered = CODE.map((line, li) => {
    const len = lineLength(line);
    const lineStart = consumed;
    consumed += len;
    const visibleInLine = Math.max(0, Math.min(len, count - lineStart));
    const isCurrent = count >= lineStart && count < lineStart + len;
    const isTypedThrough = count >= lineStart + len;

    // build colored spans up to visibleInLine
    let used = 0;
    const spans = [];
    for (let ti = 0; ti < line.length; ti++) {
      const [text, color] = line[ti];
      if (used >= visibleInLine) break;
      const take = Math.min(text.length, visibleInLine - used);
      spans.push(
        <span key={ti} style={{ color: C[color] || C.plain }}>
          {text.slice(0, take)}
        </span>
      );
      used += take;
    }

    const showCaret = isCurrent || (isTypedThrough && li === CODE.length - 1 && count >= total.current);

    return (
      <div key={li} className="flex">
        <span className="w-8 shrink-0 select-none pr-3 text-right text-[var(--faint)]/60">
          {li + 1}
        </span>
        <code className="whitespace-pre">
          {spans}
          {showCaret && count < total.current + 1 && isCurrent && (
            <span className="caret" />
          )}
        </code>
      </div>
    );
  });

  return (
    <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-2xl">
      <div className="flex items-center gap-2 border-b border-[var(--border)] bg-[var(--surface-2)] px-4 py-2.5">
        <span className="term-dot bg-[#ff5f56]" />
        <span className="term-dot bg-[#ffbd2e]" />
        <span className="term-dot bg-[#27c93f]" />
        <span className="ml-3 font-mono text-xs text-[var(--muted)]">
          developer.ts
        </span>
        <span className="ml-auto font-mono text-[10px] text-[var(--faint)]">
          TypeScript
        </span>
      </div>

      <div className="min-h-[340px] bg-[var(--surface)] p-5 font-mono text-[13px] leading-6 sm:text-sm">
        {rendered}
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-24 pb-16"
    >
      <GridBg />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-5 lg:grid-cols-2">
        {/* Left: intro */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-2)] px-3 py-1.5 font-mono text-xs text-[var(--muted)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
            </span>
            available for opportunities
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-mono text-4xl font-extrabold leading-tight tracking-tight text-[var(--fg-strong)] sm:text-5xl lg:text-6xl"
          >
            Aysa Siddika
            <br />
            Meem
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 font-mono text-lg text-[var(--accent)]"
          >
            &gt; Full-Stack Software Engineer
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-5 max-w-lg leading-relaxed text-[var(--muted)]"
          >
            I build scalable, production-grade web platforms — multi-tenant SaaS,
            AI integrations, and clean APIs — with Next.js, Node.js, Fastify and
            PostgreSQL. 2+ years shipping for US-based companies.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Link
              to="projects"
              smooth
              duration={500}
              offset={-72}
              className="group inline-flex cursor-pointer items-center gap-2 rounded-md bg-[var(--accent)] px-5 py-2.5 font-mono text-sm font-medium text-[var(--accent-fg)] transition-opacity hover:opacity-90"
            >
              view work
              <FiArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href={RESUME}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-[var(--border)] px-5 py-2.5 font-mono text-sm text-[var(--fg)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <FiDownload size={15} />
              resume.pdf
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8 flex items-center gap-5"
          >
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="link-underline inline-flex items-center gap-2 font-mono text-sm text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
              >
                {s.icon}
                <span className="hidden sm:inline">{s.label}</span>
              </a>
            ))}
          </motion.div>
        </div>

        {/* Right: live code editor */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <CodeEditor />
        </motion.div>
      </div>
    </section>
  );
};

export default Home;
