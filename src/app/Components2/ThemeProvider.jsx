"use client";
import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Helper to get time-based theme
  const getTimeBasedTheme = () => {
    // Get current time in Pacific Time (PST/PDT)
    const now = new Date();
    // Convert to Pacific Time (handles DST)
    const pacificTime = new Date(
      now.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })
    );
    const hour = pacificTime.getHours();
    // Dark mode: 2am <= hour < 8am
    if (hour >= 2 && hour < 8) {
      return "dark";
    }
    // Light mode: 8am <= hour < 2am (next day)
    return "light";
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