"use client";

import React, { useEffect } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import PhotoScroll from "./PhotoScroll"; // import the new component

const ZoomScroll = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const scrollTriggerInstance = ScrollTrigger.create({
      trigger: ".zs-ws",          // Extra scroll area driving the animation
      start: "top 100%",          // Begin a little before the trigger is fully in view
      end: "bottom top",          // End when the trigger's bottom reaches the top of the viewport
      scrub: 1,
      pin: ".zs-sticky",          // Pin the entire section during the scroll-triggered duration
      onUpdate: (self) => {
        const effectiveProgress = Math.min(self.progress * 1.05, 1);
        const galleryProgress = Math.min(effectiveProgress + 0.15, 1);

        const galleryWrapper = document.querySelector(".zs-gallery-wrapper");
        const sideCols = document.querySelectorAll(".zs-col:not(.zs-main)");
        const mainImg = document.querySelector(".zs-img.zs-main img");

        const screenWidth = window.innerWidth;
        const maxScale = screenWidth < 900 ? 4 : 2.65;
        const scale = 1 + galleryProgress * maxScale;
        const yTranslate = galleryProgress * 300;
        const mainImgScale = 2 - galleryProgress * 0.85;

        if (galleryWrapper) {
          galleryWrapper.style.transform = `translate(-50%, -50%) scale(${scale})`;
        }
        sideCols.forEach((col) => {
          col.style.transform = `translateY(${yTranslate}px)`;
        });
        if (mainImg) {
          mainImg.style.transform = `scale(${mainImgScale})`;
        }

        const heroOverlay = document.querySelector(".zs-hero-overlay");
        if (heroOverlay) {
          const heroThreshold = 0.1;
          const t = Math.min(effectiveProgress / heroThreshold, 1) * 100;
          heroOverlay.style.transform = `translateY(-${t}%)`;
        }

        // --- New Text Overlay Animation ---
        // The text overlay container is centered in the viewport and softly scales up with gallery scroll.
        const textOverlay = document.querySelector(".zs-text-overlay");
        if (textOverlay) {
          // Scale from 0.8 (initial) to 1.0 at maximum gallery progress
          const textScale = 0.8 + 0.2 * galleryProgress;
          textOverlay.style.transform = `translate(-50%, -50%) scale(${textScale})`;
        }

        // Individual text layer animation: fade in and slide vertically
        const textLayers = document.querySelectorAll(".zs-text-layer");
        const textRevealStart = 0.1; // progress at which text animation begins
        const fadeDuration = 0.1;    // each text layer fades in over 10% of the scroll progress
        const spacing = 90;          // vertical spacing (in pixels) between text layers
        let textActive = 0;
        if (effectiveProgress > textRevealStart) {
          textActive = ((effectiveProgress - textRevealStart) / (1 - textRevealStart)) * (textLayers.length - 1);
        }
        textLayers.forEach((layer, index) => {
          const fadeStart = textRevealStart + index * fadeDuration;
          const fadeProgress = Math.min(Math.max((effectiveProgress - fadeStart) / fadeDuration, 0), 1);
          layer.style.opacity = fadeProgress;
          const offset = (index - textActive) * spacing;
          layer.style.transform = `translateY(${offset}px)`;
        });
        // --- End Text Overlay Animation ---
      },
    });

    return () => {
      scrollTriggerInstance.kill();
    };
  }, []);

  return (
    <div className="zs-animation-wrapper">
      <section className="zs-sticky">
        {/* Animated gallery remains as before */}
        <div className="zs-gallery-wrapper">
          <div className="zs-col zs-side-1">
            <div className="zs-img">
              <img src="/assets/img1.jpg" alt="" />
            </div>
            <div className="zs-img">
              <img src="/assets/img2.jpg" alt="" />
            </div>
            <div className="zs-img">
              <img src="/assets/img3.jpg" alt="" />
            </div>
          </div>
          <div className="zs-col zs-side-2">
            <div className="zs-img">
              <img src="/assets/img4.jpg" alt="" />
            </div>
            <div className="zs-img">
              <img src="/assets/img5.jpg" alt="" />
            </div>
            <div className="zs-img">
              <img src="/assets/img6.jpg" alt="" />
            </div>
          </div>
          <div className="zs-col zs-main">
            <div className="zs-img">
              <img src="/assets/img7.jpg" alt="" />
            </div>
            <div className="zs-img zs-main">
              <img src="/assets/img8.jpg" alt="" />
            </div>
            <div className="zs-img">
              <img src="/assets/img9.jpg" alt="" />
            </div>
          </div>
          <div className="zs-col zs-side-3">
            <div className="zs-img">
              <img src="/assets/img10.jpg" alt="" />
            </div>
            <div className="zs-img">
              <img src="/assets/img11.jpg" alt="" />
            </div>
            <div className="zs-img">
              <img src="/assets/img12.jpg" alt="" />
            </div>
          </div>
          <div className="zs-col zs-side-4">
            <div className="zs-img">
              <img src="/assets/img1.jpg" alt="" />
            </div>
            <div className="zs-img">
              <img src="/assets/img2.jpg" alt="" />
            </div>
            <div className="zs-img">
              <img src="/assets/img3.jpg" alt="" />
            </div>
          </div>
        </div>
        {/* New text overlay over the gallery portion, centered in the frame */}
        <div className="zs-text-overlay">
          <div className="zs-text-layer">
            Photography has always been about quality. But memories? They’re about feeling.
          </div>
          <div className="zs-text-layer">
            We believe memories have an aesthetic. That’s why we bring a camera bar to your event—stocked with vintage cameras, instant print cameras, and the tools of nostalgia.
          </div>
          <div className="zs-text-layer">
            No photographers telling people where to stand. No stiff posing. Just real moments, captured by the people living them.
          </div>
          {/* Uncomment to add a fourth text layer if needed */}
          {/* <div className="zs-text-layer">Layer Four</div> */}
        </div>
        {/* Existing hero overlay remains unchanged */}
        <div className="zs-hero-overlay">
          <PhotoScroll />
        </div>
      </section>
      <section className="zs-ws"></section>
    </div>
  );
};

export default ZoomScroll;
