"use client";

import BlogNavbar from "../Components2/BlogNavbar";
import { ThemeProvider } from "../Components2/ThemeProvider";
import "../globals.css";

export default function BlogLayout({ children }) {
  return (
    <ThemeProvider>
      <div data-theme="dark">
        <BlogNavbar />
        {children}
      </div>
    </ThemeProvider>
  );
}
