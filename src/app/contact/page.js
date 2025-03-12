"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Contact() {
  const formRef = useRef([]);
  const contactSectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      contactSectionRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: contactSectionRef.current,
          start: "top 85%",
        },
      }
    );

    gsap.fromTo(
      formRef.current,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        stagger: 0.2, // Fields animate one after another
        scrollTrigger: {
          trigger: formRef.current[0],
          start: "top 90%",
        },
      }
    );
  }, []);

  return (
    <div
      ref={contactSectionRef}
      style={{
        padding: "2rem",
        textAlign: "center",
        minHeight: "100vh",
        opacity: 0, // Initially hidden for animation
      }}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>Contact Me</h1>
      <form style={{ maxWidth: "400px", margin: "auto" }}>
        <input
          ref={(el) => (formRef.current[0] = el)}
          type="text"
          placeholder="Your Name"
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            fontSize: "1rem",
          }}
        />
        <input
          ref={(el) => (formRef.current[1] = el)}
          type="email"
          placeholder="Your Email"
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            fontSize: "1rem",
          }}
        />
        <textarea
          ref={(el) => (formRef.current[2] = el)}
          placeholder="Your Message"
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            fontSize: "1rem",
            height: "100px",
          }}
        ></textarea>
        <button
          ref={(el) => (formRef.current[3] = el)}
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "1rem",
            backgroundColor: "#1a202c",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
