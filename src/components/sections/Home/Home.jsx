import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-scroll";
import {
  FiGithub,
  FiArrowRight,
  FiDownload,
  FiCheck,
  FiFolder,
} from "react-icons/fi";
import { GridBg } from "../../ui/term";

const RESUME = "/Mst_Aysa_Siddika_Meem_Resume.pdf";
const GITHUB = "https://github.com/MRaysa";

const ROLES = [
  "Full-Stack Software Engineer",
  "AI Integration Engineer",
  "Cloudflare Workers Engineer",
  "Scalable API Engineer",
  "SaaS Product Engineer",
];

const HIGHLIGHTS = [
  "2+ yrs professional experience",
  "10+ projects shipped",
  "AI integrations (OpenAI · Gemini)",
  "SaaS · Stripe · scalable APIs",
  "Undergraduate researcher @ CCDS",
  "Available for hire",
];

/* ---------- rotating role typewriter (single robust loop) ---------- */
const RoleRotator = () => {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    let roleIdx = 0;
    let char = 0;
    let deleting = false;
    let timer;

    const loop = () => {
      const full = ROLES[roleIdx];
      if (!deleting) {
        char++;
        setDisplay(full.slice(0, char));
        if (char === full.length) {
          deleting = true;
          timer = setTimeout(loop, 1600); // hold on the full word
          return;
        }
      } else {
        char--;
        setDisplay(full.slice(0, char));
        if (char === 0) {
          deleting = false;
          roleIdx = (roleIdx + 1) % ROLES.length; // next role
        }
      }
      timer = setTimeout(loop, deleting ? 40 : 85);
    };

    timer = setTimeout(loop, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <span className="text-[var(--accent)]">
      {display}
      <span className="caret" />
    </span>
  );
};

/* ---------- live code editor (right) ---------- */
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

const CODE = [
  [["// who I am, in code", "cmt"]],
  [["const ", "kw"], ["engineer", "fn"], [": ", "punc"], ["Developer", "fn"], [" = {", "punc"]],
  [["  name", "key"], [": ", "punc"], ['"Aysa Siddika Meem"', "str"], [",", "punc"]],
  [["  role", "key"], [": ", "punc"], ['"Full-Stack Software Engineer"', "str"], [",", "punc"]],
  [["  location", "key"], [": ", "punc"], ['"Dhaka, BD · Remote"', "str"], [",", "punc"]],
  [["  experience", "key"], [": ", "punc"], ['"2+ years"', "str"], [",", "punc"]],
  [["  stack", "key"], [": [", "punc"], ['"Next.js"', "str"], [", ", "punc"], ['"Node"', "str"], [", ", "punc"], ['"Fastify"', "str"], ["],", "punc"]],
  [["  databases", "key"], [": [", "punc"], ['"PostgreSQL"', "str"], [", ", "punc"], ['"MongoDB"', "str"], ["],", "punc"]],
  [["  cloud", "key"], [": [", "punc"], ['"Cloudflare Workers"', "str"], [", ", "punc"], ['"AWS"', "str"], ["],", "punc"]],
  [["  focus", "key"], [": [", "punc"], ['"SaaS"', "str"], [", ", "punc"], ['"AI"', "str"], [", ", "punc"], ['"Edge APIs"', "str"], ["],", "punc"]],
  [["  openToWork", "key"], [": ", "punc"], ["true", "num"], [",", "punc"]],
  [["};", "punc"]],
  [[""]],
  [["export default", "kw"], [" engineer", "fn"], [";", "punc"]],
];

const lineLength = (line) => line.reduce((n, t) => n + t[0].length, 0);

const CodeEditor = () => {
  const [count, setCount] = useState(0);
  const total = useRef(CODE.reduce((n, l) => n + lineLength(l), 0));

  useEffect(() => {
    let n = 0;
    let timer;
    const tick = () => {
      n++;
      if (n > total.current) {
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

  let consumed = 0;
  const rendered = CODE.map((line, li) => {
    const len = lineLength(line);
    const lineStart = consumed;
    consumed += len;
    const visibleInLine = Math.max(0, Math.min(len, count - lineStart));
    const isCurrent = count >= lineStart && count < lineStart + len;

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

    return (
      <div key={li} className="flex">
        <span className="w-8 shrink-0 select-none pr-3 text-right text-[var(--faint)]/60">
          {li + 1}
        </span>
        <code className="whitespace-pre">
          {spans}
          {isCurrent && <span className="caret" />}
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
        <span className="ml-3 font-mono text-xs text-[var(--muted)]">code.ts</span>
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

/* ---------- hero ---------- */
const Home = () => {
  return (
    <section
      id="home"
      className="relative flex items-center overflow-hidden pt-28 pb-20 sm:pt-32"
    >
      <GridBg />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-5 lg:grid-cols-2">
        {/* Left */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-4 flex items-center gap-2 font-mono text-sm text-[var(--muted)]"
          >
            <span className="text-[var(--accent)]">$</span> whoami
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-mono text-4xl font-extrabold leading-[1.1] tracking-tight text-[var(--fg-strong)] sm:text-5xl lg:text-6xl"
          >
            Aysa Siddika
            <br />
            Meem
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 font-mono text-lg text-[var(--muted)] sm:text-xl"
          >
            <span className="text-[var(--faint)]">&gt; </span>
            <RoleRotator />
          </motion.p>

          {/* divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="my-6 h-px w-full max-w-sm origin-left bg-gradient-to-r from-[var(--border-strong)] to-transparent"
          />

          {/* highlights checklist */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="grid max-w-lg grid-cols-1 gap-x-6 gap-y-2 font-mono text-sm sm:grid-cols-2"
          >
            {HIGHLIGHTS.map((h, i) => (
              <div key={i} className="flex items-center gap-2 text-[var(--muted)]">
                <FiCheck className="shrink-0 text-[var(--accent)]" strokeWidth={3} />
                {h}
              </div>
            ))}
          </motion.div>

          {/* buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href={RESUME}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-[var(--accent)] px-5 py-2.5 font-mono text-sm font-medium text-[var(--accent-fg)] transition-opacity hover:opacity-90"
            >
              <FiDownload size={15} /> resume.pdf
            </a>
            <Link
              to="projects"
              smooth
              duration={500}
              offset={-72}
              className="group inline-flex cursor-pointer items-center gap-2 rounded-md border border-[var(--border)] px-5 py-2.5 font-mono text-sm text-[var(--fg)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <FiFolder size={15} /> projects
              <FiArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href={GITHUB}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-[var(--border)] px-5 py-2.5 font-mono text-sm text-[var(--fg)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <FiGithub size={15} /> github
            </a>
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
