import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiGithub,
  FiLinkedin,
  FiArrowRight,
  FiCheckCircle,
} from "react-icons/fi";
import { FaWhatsapp, FaTelegramPlane } from "react-icons/fa";
import { SectionLabel, GridBg } from "../../ui/term";

const CONFIG = [
  ["EMAIL", "aysasiddikameem3141@gmail.com", "mailto:aysasiddikameem3141@gmail.com"],
  ["PHONE", "+880 1647760804", "tel:+8801647760804"],
  ["LOCATION", "Dhaka, Bangladesh", null],
  ["TIMEZONE", "GMT+6", null],
  ["STATUS", "open to work", null],
];

const SOCIALS = [
  { icon: <FiGithub />, url: "https://github.com/MRaysa", label: "github" },
  { icon: <FiLinkedin />, url: "https://www.linkedin.com/in/mst-aysa-siddika-meem/", label: "linkedin" },
  { icon: <FaWhatsapp />, url: "https://wa.me/8801647760804", label: "whatsapp" },
  { icon: <FaTelegramPlane />, url: "https://t.me/aysasiddikameem", label: "telegram" },
];

const field =
  "w-full rounded-md border border-[var(--border)] bg-[var(--bg-alt)] px-3 py-2 font-mono text-sm text-[var(--fg)] outline-none transition-colors placeholder:text-[var(--faint)] focus:border-[var(--accent)]";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    setStatus("sending");
    // NOTE: currently simulated. Wire to EmailJS/API to actually deliver.
    setTimeout(() => {
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    }, 1200);
  };

  return (
    <section id="contact" className="relative overflow-hidden py-24">
      <GridBg />
      <div className="relative z-10 mx-auto max-w-6xl px-5">
        <SectionLabel
          name="./contact --send"
          title="Get In Touch"
          description="Open to software engineering & research roles — let's build something."
        />

        <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-2xl">
          {/* window bar */}
          <div className="flex items-center gap-2 border-b border-[var(--border)] bg-[var(--surface-2)] px-4 py-2.5">
            <span className="term-dot bg-[#ff5f56]" />
            <span className="term-dot bg-[#ffbd2e]" />
            <span className="term-dot bg-[#27c93f]" />
            <span className="ml-3 font-mono text-xs text-[var(--muted)]">
              zsh — contact
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left: config */}
            <div className="border-b border-[var(--border)] p-6 font-mono text-sm lg:border-b-0 lg:border-r">
              <div className="flex gap-2">
                <span className="text-[var(--accent)]">$</span>
                <span className="text-[var(--fg)]">cat contact.config</span>
              </div>

              <div className="mt-3 space-y-1">
                {CONFIG.map(([k, v, link]) => (
                  <div key={k} className="flex flex-wrap gap-x-2">
                    <span className="w-24 shrink-0 text-[var(--blue)]">{k}</span>
                    <span className="text-[var(--faint)]">=</span>
                    {link ? (
                      <a
                        href={link}
                        className="text-[var(--cyan)] transition-colors hover:text-[var(--accent)]"
                      >
                        "{v}"
                      </a>
                    ) : (
                      <span className="text-[var(--cyan)]">"{v}"</span>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 flex gap-2">
                <span className="text-[var(--accent)]">$</span>
                <span className="text-[var(--fg)]">ls ./social</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-md border border-[var(--border)] bg-[var(--surface-2)] px-3 py-1.5 text-xs text-[var(--muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  >
                    {s.icon}
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Right: send-message */}
            <div className="p-6 font-mono text-sm">
              <div className="flex gap-2">
                <span className="text-[var(--accent)]">$</span>
                <span className="text-[var(--fg)]">./send-message</span>
              </div>

              <AnimatePresence mode="wait">
                {status === "sent" ? (
                  <motion.div
                    key="response"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-4 space-y-1.5"
                  >
                    <p className="text-[var(--muted)]">
                      <span className="text-[var(--faint)]">&gt; </span>POST
                      /api/contact
                    </p>
                    <p className="text-[var(--muted)]">
                      <span className="text-[var(--faint)]">&gt; </span>
                      <span className="text-[var(--accent)]">200 OK</span> ·
                      message queued
                    </p>
                    <p className="mt-3 flex items-center gap-2 text-[var(--accent)]">
                      <FiCheckCircle /> Thanks! I'll get back to you soon.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={submit}
                    className="mt-4 space-y-3"
                  >
                    <div>
                      <label className="mb-1 block text-[var(--faint)]">
                        --name
                      </label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={change}
                        required
                        placeholder="Jane Doe"
                        className={field}
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-[var(--faint)]">
                        --email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={change}
                        required
                        placeholder="jane@company.com"
                        className={field}
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-[var(--faint)]">
                        --message
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={change}
                        required
                        rows={4}
                        placeholder="Tell me about the role or project..."
                        className={`${field} resize-none`}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[var(--accent)] px-4 py-2.5 font-mono text-sm font-medium text-[var(--accent-fg)] transition-opacity hover:opacity-90 disabled:opacity-60"
                    >
                      {status === "sending" ? (
                        <>
                          <span className="inline-block h-3.5 w-3.5 rounded-full border-2 border-[var(--accent-fg)] border-t-transparent animate-spin" />
                          sending...
                        </>
                      ) : (
                        <>
                          run send <FiArrowRight />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
