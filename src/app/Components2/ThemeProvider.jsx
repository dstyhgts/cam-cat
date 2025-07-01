"use client";
import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Helper to get time-based theme
  const getTimeBasedTheme = () => {
    const hour = new Date().getHours();
    return hour >= 1 && hour < 13 ? "light" : "dark";
  };

  const [theme, setTheme] = useState(() => {
    // On first load, check localStorage or use time-based
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved === "light" || saved === "dark") return saved;
    }
    return getTimeBasedTheme();
  });

  // On mount, re-check localStorage and set theme
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") {
      setTheme(saved);
      document.documentElement.setAttribute("data-theme", saved);
    } else {
      const timeTheme = getTimeBasedTheme();
      setTheme(timeTheme);
      document.documentElement.setAttribute("data-theme", timeTheme);
    }
  }, []);

  // Update <html> and localStorage when theme changes
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // User can toggle theme (override)
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // User can reset to auto (time-based)
  const resetTheme = () => {
    localStorage.removeItem("theme");
    const timeTheme = getTimeBasedTheme();
    setTheme(timeTheme);
    document.documentElement.setAttribute("data-theme", timeTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, resetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

export default ThemeProvider; 