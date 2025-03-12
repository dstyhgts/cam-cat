"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../Components/Navbar";

export default function About() {
  const aboutRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      aboutRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 85%", // Triggers when scrolled to 85% of the viewport
        },
      }
    );
  }, []);

  return (
    <div
      ref={aboutRef}
      style={{
        padding: "2rem",
        textAlign: "center",
        minHeight: "100vh",
        opacity: 0, // Initially hidden for animation
      }}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>About Me</h1>
      <p style={{ fontSize: "1.2rem", maxWidth: "600px", margin: "auto" }}>
        Hello! I'm a passionate web developer focused on creating interactive,
        smooth, and visually engaging websites using Next.js and GSAP.
      </p>
    </div>
  );
}
