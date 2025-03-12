"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Preloader({ setLoadingComplete }) {
  const preloaderRef = useRef(null);

  useEffect(() => {
    gsap.to(preloaderRef.current, {
      opacity: 0,
      duration: 1.5,
      delay: 1.5,
      onComplete: () => setLoadingComplete(true),
    });
  }, []);

  return (
    <div ref={preloaderRef} style={{
      position: "fixed",
      width: "100vw",
      height: "100vh",
      backgroundColor: "#000",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      fontSize: "2rem",
      zIndex: 9999,
    }}>
      Unveiling...
    </div>
  );
}
