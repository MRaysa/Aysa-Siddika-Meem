import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { FiGithub, FiLinkedin, FiMail, FiArrowUp } from "react-icons/fi";

const NAV = [
  { name: "about", to: "about" },
  { name: "experience", to: "experience" },
  { name: "work", to: "projects" },
  { name: "skills", to: "skills" },
  { name: "education", to: "educations" },
  { name: "contact", to: "contact" },
];

const SOCIALS = [
  { icon: <FiGithub />, url: "https://github.com/MRaysa" },
  { icon: <FiLinkedin />, url: "https://www.linkedin.com/in/mst-aysa-siddika-meem/" },
  { icon: <FiMail />, url: "mailto:aysasiddikameem3141@gmail.com" },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-[var(--border)] bg-[var(--bg-alt)]">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row">
          {/* Brand */}
          <div className="max-w-sm">
            <Link
              to="home"
              smooth
              duration={500}
              className="cursor-pointer font-mono text-sm font-semibold"
            >
              <span className="text-[var(--accent)]">~/</span>
              <span className="text-[var(--fg-strong)]">aysa</span>
              <span className="text-[var(--muted)]">-siddika-meem</span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
              Full-Stack Software Engineer building scalable, data-driven
              products. Open to opportunities worldwide.
            </p>
            <div className="mt-4 flex gap-2">
              {SOCIALS.map((s, i) => (
                <a
                  key={i}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <p className="mb-3 font-mono text-xs text-[var(--faint)]">
              // sitemap
            </p>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2">
              {NAV.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  smooth
                  duration={500}
                  offset={-72}
                  className="cursor-pointer font-mono text-sm text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
                >
                  <span className="text-[var(--faint)]">/</span>
                  {n.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-[var(--border)] pt-6 font-mono text-xs text-[var(--muted)] sm:flex-row">
          <p>
            © {year} Aysa Siddika Meem ·{" "}
            <span className="text-[var(--faint)]">
              built with React + Tailwind
            </span>
          </p>
          <Link
            to="home"
            smooth
            duration={500}
            className="group inline-flex cursor-pointer items-center gap-2 transition-colors hover:text-[var(--accent)]"
          >
            back to top
            <motion.span
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <FiArrowUp />
            </motion.span>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
