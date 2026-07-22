import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "../../hooks/useTheme";

// Terminal-style theme switch.
const ThemeToggle = ({ className = "", iconSize = 16 }) => {
  const { isDark, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className={`group inline-flex items-center gap-2 rounded-md border border-[var(--border)] bg-[var(--surface-2)] px-2.5 py-1.5 font-mono text-xs text-[var(--muted)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--fg)] ${className}`}
    >
      {isDark ? (
        <FiSun size={iconSize} className="text-[var(--amber)]" />
      ) : (
        <FiMoon size={iconSize} className="text-[var(--blue)]" />
      )}
      <span className="hidden sm:inline">
        {isDark ? "light" : "dark"}
      </span>
    </button>
  );
};

export default ThemeToggle;
