import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiSend,
  FiCheck,
  FiGithub,
  FiLinkedin,
} from "react-icons/fi";
import { FaWhatsapp, FaTelegramPlane } from "react-icons/fa";
import { SectionLabel, GridBg } from "../../ui/term";

const INFO = [
  { icon: <FiMail />, key: "email", value: "aysasiddikameem3141@gmail.com", link: "mailto:aysasiddikameem3141@gmail.com" },
  { icon: <FiPhone />, key: "phone", value: "+880 1647760804", link: "tel:+8801647760804" },
  { icon: <FiMapPin />, key: "location", value: "Dhaka, Bangladesh", link: null },
];

const SOCIALS = [
  { icon: <FiGithub />, url: "https://github.com/MRaysa", label: "github" },
  { icon: <FiLinkedin />, url: "https://www.linkedin.com/in/mst-aysa-siddika-meem/", label: "linkedin" },
  { icon: <FaWhatsapp />, url: "https://wa.me/8801647760804", label: "whatsapp" },
  { icon: <FaTelegramPlane />, url: "https://t.me/aysasiddikameem", label: "telegram" },
];

const field =
  "w-full rounded-md border border-[var(--border)] bg-[var(--surface-2)] px-3.5 py-2.5 font-mono text-sm text-[var(--fg)] outline-none transition-colors placeholder:text-[var(--faint)] focus:border-[var(--accent)]";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    setSending(true);
    // NOTE: currently simulated. Wire to EmailJS/API to actually deliver.
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 4000);
    }, 1200);
  };

  return (
    <section id="contact" className="relative overflow-hidden py-24">
      <GridBg />
      <div className="relative z-10 mx-auto max-w-5xl px-5">
        <SectionLabel
          name="./contact --send"
          title="Get In Touch"
          description="Open to software engineering & research roles. Let's talk."
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-3"
          >
            {INFO.map((it) => (
              <div
                key={it.key}
                className="flex items-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3.5"
              >
                <span className="text-[var(--accent)]">{it.icon}</span>
                <div className="min-w-0 font-mono text-sm">
                  <span className="text-[var(--faint)]">{it.key}: </span>
                  {it.link ? (
                    <a
                      href={it.link}
                      className="text-[var(--fg)] transition-colors hover:text-[var(--accent)]"
                    >
                      {it.value}
                    </a>
                  ) : (
                    <span className="text-[var(--fg)]">{it.value}</span>
                  )}
                </div>
              </div>
            ))}

            <div className="flex flex-wrap gap-2 pt-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 font-mono text-xs text-[var(--muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  {s.icon}
                  {s.label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6"
          >
            {sent && (
              <div className="mb-4 flex items-center gap-2 rounded-md border border-[var(--accent)] bg-[var(--surface-2)] px-3 py-2 font-mono text-sm text-[var(--accent)]">
                <FiCheck /> message sent — thanks!
              </div>
            )}

            <label className="mb-1 block font-mono text-xs text-[var(--muted)]">
              name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={change}
              required
              placeholder="Jane Doe"
              className={`${field} mb-4`}
            />

            <label className="mb-1 block font-mono text-xs text-[var(--muted)]">
              email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={change}
              required
              placeholder="jane@company.com"
              className={`${field} mb-4`}
            />

            <label className="mb-1 block font-mono text-xs text-[var(--muted)]">
              message
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={change}
              required
              rows={4}
              placeholder="Tell me about the role or project..."
              className={`${field} mb-5 resize-none`}
            />

            <button
              type="submit"
              disabled={sending}
              className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[var(--accent)] px-4 py-2.5 font-mono text-sm font-medium text-[var(--accent-fg)] transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              <FiSend size={15} />
              {sending ? "sending..." : "send message"}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
