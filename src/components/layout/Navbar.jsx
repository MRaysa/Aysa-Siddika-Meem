import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-scroll";
import { FiMenu, FiX, FiDownload } from "react-icons/fi";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { name: "about", to: "about" },
  { name: "experience", to: "experience" },
  { name: "work", to: "projects" },
  { name: "skills", to: "skills" },
  { name: "education", to: "educations" },
  { name: "contact", to: "contact" },
];

const RESUME = "/Mst_Aysa_Siddika_Meem_Resume.pdf";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const sections = document.querySelectorAll("section[id], div[id]");
      sections.forEach((s) => {
        if (window.scrollY >= s.offsetTop - 120) setActive(s.id);
      });
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4 }}
      className={`fixed top-0 z-50 w-full border-b transition-colors duration-300 ${
        scrolled
          ? "border-[var(--border)] bg-[var(--bg)]/85 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        {/* Brand */}
        <Link
          to="home"
          smooth
          duration={500}
          className="cursor-pointer font-mono text-sm font-semibold tracking-tight"
          onClick={() => setActive("home")}
        >
          <span className="text-[var(--accent)]">~/</span>
          <span className="text-[var(--fg-strong)]">aysa</span>
          <span className="text-[var(--muted)]">-siddika-meem</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              smooth
              duration={500}
              offset={-72}
              spy
              onSetActive={() => setActive(link.to)}
              onClick={() => setActive(link.to)}
              className={`cursor-pointer rounded-md px-3 py-1.5 font-mono text-sm transition-colors ${
                active === link.to
                  ? "text-[var(--accent)]"
                  : "text-[var(--muted)] hover:text-[var(--fg)]"
              }`}
            >
              <span className="text-[var(--faint)]">/</span>
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden items-center gap-2.5 md:flex">
          <ThemeToggle />
          <a
            href={RESUME}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-[var(--accent)] px-3.5 py-1.5 font-mono text-xs font-medium text-[var(--accent-fg)] transition-opacity hover:opacity-90"
          >
            <FiDownload size={14} />
            resume.pdf
          </a>
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
            className="rounded-md border border-[var(--border)] p-2 text-[var(--fg)]"
          >
            {mobileOpen ? <FiX size={18} /> : <FiMenu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-[var(--border)] bg-[var(--bg)] md:hidden"
          >
            <div className="flex flex-col p-3">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  smooth
                  duration={500}
                  offset={-72}
                  onClick={() => {
                    setMobileOpen(false);
                    setActive(link.to);
                  }}
                  className={`cursor-pointer rounded-md px-3 py-2.5 font-mono text-sm ${
                    active === link.to
                      ? "bg-[var(--surface-2)] text-[var(--accent)]"
                      : "text-[var(--muted)]"
                  }`}
                >
                  <span className="text-[var(--faint)]">/</span>
                  {link.name}
                </Link>
              ))}
              <a
                href={RESUME}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-[var(--accent)] px-3.5 py-2.5 font-mono text-sm font-medium text-[var(--accent-fg)]"
              >
                <FiDownload size={14} />
                resume.pdf
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
