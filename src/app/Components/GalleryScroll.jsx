"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const GalleryScroll = () => {
  const sliderRef = useRef(null);

  // Linear interpolation helper
  const lerp = (start, end, t) => start * (1 - t) + end * t;

  // Original scaling function (from your initial effect)
  const getScaleFactor = (position, viewportWidth) => {
    const quarterWidth = viewportWidth / 4;
    if (position < 0 || position > viewportWidth) {
      return 0;
    } else if (position < quarterWidth) {
      return lerp(0, 0.45, position / quarterWidth);
    } else if (position < 2 * quarterWidth) {
      return lerp(0.45, 1.5, (position - quarterWidth) / quarterWidth);
    } else if (position < 3 * quarterWidth) {
      return lerp(1.5, 0.45, (position - 2 * quarterWidth) / quarterWidth);
    } else {
      return lerp(0.45, 0, (position - 3 * quarterWidth) / quarterWidth);
    }
  };

  // Update each card’s scale based on its center relative to the viewport
  const updateScales = () => {
    const slider = sliderRef.current;
    if (!slider) return;
    const viewportWidth = window.innerWidth;
    const cards = slider.querySelectorAll(".gs-card");
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const scaleFactor = getScaleFactor(cardCenter, viewportWidth);
      card.style.transform = `scale(${scaleFactor})`;
      const img = card.querySelector("img");
      if (img) {
        img.style.transform = `scale(${scaleFactor * 1})`;
      }
    });
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    const parent = slider.parentNode; // Expected to be the .ss-outro container

    // Compute total horizontal travel (in pixels) to show all images.
    const baseTravel = slider.scrollWidth - parent.clientWidth;
    // With 20 images total, to animate until only 5 remain:
    const tweenTravel = baseTravel * (20 / 25);

    // Horizontal tween: start early so images animate as soon as the section nears view.
    gsap.to(slider, {
      x: -tweenTravel,
      ease: "none",
      scrollTrigger: {
        trigger: parent,
        start: "top 80%", // Begin tween when parent's top reaches 80% of viewport height
        end: `+=${tweenTravel}`,
        scrub: true,
        onUpdate: updateScales,
      },
    });
  }, []);

  return (
    <div ref={sliderRef} className="gs-slider">
      {Array.from({ length: 25 }, (_, i) => {
        const imgIndex = (i % 10) + 1;
        return (
          <div key={i} className="gs-card">
            <img
              src={`/assets/gallery-${imgIndex}.jpg`}
              alt={`Gallery Image ${imgIndex}`}
            />
          </div>
        );
      })}
    </div>
  );
};

export default GalleryScroll;
