import { motion } from "framer-motion";
import { SectionLabel, GridBg } from "../../ui/term";

const STATS = [
  { value: "2+", label: "years shipping production" },
  { value: "3", label: "US-based companies" },
  { value: "10+", label: "projects delivered" },
  { value: "3.82", label: "CGPA / 4.00" },
];

// A syntax-highlighted key/value line for the profile object.
const Field = ({ k, v, accent = "var(--cyan)" }) => (
  <div className="flex flex-wrap gap-x-2 pl-4">
    <span className="text-[var(--purple)]">{k}</span>
    <span className="text-[var(--faint)]">:</span>
    <span style={{ color: accent }}>{typeof v === "string" ? `"${v}"` : v}</span>
    <span className="text-[var(--faint)]">,</span>
  </div>
);

const About = () => {
  return (
    <section id="about" className="relative overflow-hidden py-24">
      <GridBg glow={false} />

      <div className="relative z-10 mx-auto max-w-6xl px-5">
        <SectionLabel
          name="whoami"
          title="About"
          description="Computer Science graduate turned full-stack engineer, focused on building data-driven products that scale."
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* Profile image card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)]">
              <div className="flex items-center gap-2 border-b border-[var(--border)] bg-[var(--surface-2)] px-4 py-2.5">
                <span className="term-dot bg-[#ff5f56]" />
                <span className="term-dot bg-[#ffbd2e]" />
                <span className="term-dot bg-[#27c93f]" />
                <span className="ml-3 font-mono text-xs text-[var(--muted)]">
                  aysa-siddika-meem.jpeg
                </span>
              </div>
              <div className="relative aspect-[4/5] w-full">
                <img
                  src="/aysa.jpeg"
                  alt="Aysa Siddika Meem"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <p className="font-mono text-sm font-semibold text-white">
                    Aysa Siddika Meem
                  </p>
                  <p className="font-mono text-xs text-white/70">
                    Full-Stack Software Engineer
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bio + profile object */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <p className="leading-relaxed text-[var(--fg)]">
              I'm a full-stack software engineer with{" "}
              <span className="text-[var(--accent)]">2+ years</span> of
              professional experience building scalable applications for
              companies across the{" "}
              <span className="text-[var(--fg-strong)]">US and Australia</span> —
              multi-tenant SaaS platforms, Stripe billing, AI integrations
              (OpenAI, Gemini, Claude), and custom CRM systems.
            </p>
            <p className="mt-4 leading-relaxed text-[var(--muted)]">
              I care deeply about clean architecture, type safety, and
              performance — writing code that's maintainable as much as it works.
              Alongside engineering, I'm an undergraduate researcher at CCDS,
              working on geospatial analysis and remote sensing.
            </p>

            {/* profile object literal */}
            <div className="mt-6 overflow-x-auto rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4 font-mono text-sm leading-relaxed">
              <div>
                <span className="text-[var(--red)]">const</span>{" "}
                <span className="text-[var(--blue)]">profile</span>{" "}
                <span className="text-[var(--faint)]">= {"{"}</span>
              </div>
              <Field k="role" v="Full-Stack Software Engineer" />
              <Field k="location" v="Dhaka, Bangladesh" />
              <Field k="currentlyAt" v="NAFCORP Technologies (Remote · Australia)" />
              <Field k="focus" v="SaaS · AI · Scalable APIs" />
              <Field k="education" v="B.Sc CSE — IUB" />
              <div className="flex flex-wrap gap-x-2 pl-4">
                <span className="text-[var(--purple)]">openToWork</span>
                <span className="text-[var(--faint)]">:</span>
                <span className="text-[var(--amber)]">true</span>
                <span className="text-[var(--faint)]">,</span>
              </div>
              <div className="text-[var(--faint)]">{"}"}</div>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              viewport={{ once: true }}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5"
            >
              <div className="font-mono text-3xl font-bold text-[var(--accent)]">
                {s.value}
              </div>
              <div className="mt-1 text-sm text-[var(--muted)]">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
