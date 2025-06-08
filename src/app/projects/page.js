"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Card from "../Components/Card.jsx"; // ✅ Corrected path

export default function Projects() {
  const cardsRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.2, // Adds delay between each card
        scrollTrigger: {
          trigger: cardsRef.current[0],
          start: "top 90%",
        },
      }
    );
  }, []);

  return (
    <div style={{ padding: "2rem", textAlign: "center", minHeight: "100vh" }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>My Projects</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          flexWrap: "wrap",
          maxWidth: "800px",
          margin: "auto",
        }}
      >
        <Card
          ref={(el) => (cardsRef.current[0] = el)}
          title="Project 1"
          description="A cool project I built"
        />
        <Card
          ref={(el) => (cardsRef.current[1] = el)}
          title="Project 2"
          description="Another great project"
        />
        <Card
          ref={(el) => (cardsRef.current[2] = el)}
          title="Project 3"
          description="Yet another awesome project"
        />
      </div>
    </div>
  );
}
