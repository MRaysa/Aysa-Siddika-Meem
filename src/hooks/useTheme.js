import { useEffect, useState, useCallback } from "react";

// Reads/writes the .dark class + data-theme on <html> and persists to
// localStorage. The initial theme is already applied by an inline script
// in index.html (prevents flash), so this just mirrors + toggles it.
export function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof document === "undefined") return "dark";
    return document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
  });

  const apply = useCallback((next) => {
    const root = document.documentElement;
    root.classList.toggle("dark", next === "dark");
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    setTheme(next);
  }, []);

  const toggle = useCallback(() => {
    apply(theme === "dark" ? "light" : "dark");
  }, [theme, apply]);

  // Keep state in sync if another tab changes it.
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "theme" && e.newValue) apply(e.newValue);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [apply]);

  return { theme, toggle, isDark: theme === "dark" };
}

export default useTheme;
