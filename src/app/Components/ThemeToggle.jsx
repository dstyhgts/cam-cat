"use client";
import { useTheme } from "../Components2/ThemeProvider";
import styles from "./ThemeToggle.module.css";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  const getNextTheme = () => {
    if (theme === 'light') return 'dark';
    // Dawn theme is temporarily hidden
    // if (theme === 'dark') return 'dawn';
    return 'light';
  };

  const getIcon = () => {
    if (theme === 'light') {
      return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      );
    } else if (theme === 'dark') {
      return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="5"/>
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
        </svg>
      );
    } else {
      // Dawn theme icon - sunrise/dawn icon (preserved for future use)
      return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
          <circle cx="12" cy="12" r="4"/>
        </svg>
      );
    }
  };

  return (
    <div 
      className={styles.toggleSwitch} 
      onClick={toggleTheme}
      role="switch"
      aria-checked={theme === 'dark'}
      aria-label={`Switch to ${getNextTheme()} mode`}
    >
      <div className={styles.toggleTrack}>
        <div className={`${styles.toggleThumb} ${styles[theme]}`}>
          {getIcon()}
        </div>
      </div>
    </div>
  );
} 