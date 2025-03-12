"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HoverEffect({ children }) {
  const hoverRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      hoverRef.current,
      { scale: 1 },
      {
        scale: 1.05,
        duration: 0.3,
        ease: "power1.out",
        paused: true,
      }
    );

    hoverRef.current.addEventListener("mouseenter", () => gsap.to(hoverRef.current, { scale: 1.05 }));
    hoverRef.current.addEventListener("mouseleave", () => gsap.to(hoverRef.current, { scale: 1 }));
  }, []);

  return (
    <div ref={hoverRef} style={{ display: "inline-block", transition: "transform 0.3s" }}>
      {children}
    </div>
  );
}
