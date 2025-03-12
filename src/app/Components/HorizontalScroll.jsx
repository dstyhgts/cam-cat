"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Draggable from "gsap/Draggable";

gsap.registerPlugin(ScrollTrigger, Draggable);

export default function HorizontalScroll() {
  const hsWrapperRef = useRef(null);
  const hsInnerRef = useRef(null);
  const hsScrollerRef = useRef(null);
  const hsTimelineRef = useRef(null);

  useEffect(() => {
    const wrapper = hsWrapperRef.current;
    const inner = hsInnerRef.current;
    const scroller = hsScrollerRef.current;
    const timeline = hsTimelineRef.current;
    
    // Hide the timeline (drag bar) by default.
    gsap.set(timeline, { opacity: 0 });

    // Fade in timeline when user hovers over the horizontal scroll area
    wrapper.addEventListener("mouseenter", () => {
      gsap.to(timeline, { opacity: 1, duration: 0.3, ease: "power3.out" });
    });
    wrapper.addEventListener("mouseleave", () => {
      gsap.to(timeline, { opacity: 0, duration: 0.3, ease: "power3.out" });
    });

    // Set up ScrollTrigger to pin the horizontal scroll area and map vertical scroll to horizontal movement.
    const st = ScrollTrigger.create({
      trigger: wrapper,
      pin: true,
      scrub: 1,
      start: "top top",
      end: () => "+=" + (inner.scrollWidth - window.innerWidth),
      onUpdate: (self) => {
        // Update the inner container x based on scroll progress.
        gsap.to(inner, {
          x: -((inner.scrollWidth - window.innerWidth) * self.progress),
          duration: 0.1,
          ease: "none",
        });
        // Also update the drag bar (scroller) position.
        const timelineWidth = timeline.offsetWidth;
        const scrollerWidth = scroller.offsetWidth;
        const gap = 16; // unique gap for this component
        const maxDragX = timelineWidth - scrollerWidth - 2 * gap;
        const newX = gap + (maxDragX * self.progress);
        gsap.to(scroller, { x: newX, duration: 0.1, ease: "none" });
      },
    });

    // Enable horizontal dragging on the inner container.
    Draggable.create(inner, {
      type: "x",
      bounds: { minX: -(inner.scrollWidth - window.innerWidth), maxX: 0 },
      onDrag: function () {
        ScrollTrigger.refresh();
      },
    });

    // Enable horizontal dragging on the scroller (drag bar).
    Draggable.create(scroller, {
      type: "x",
      bounds: { minX: 16, maxX: timeline.offsetWidth - scroller.offsetWidth - 16 },
      onDrag: function () {
        // When dragging the scroller, update the horizontal progress.
        const timelineWidth = timeline.offsetWidth;
        const scrollerWidth = scroller.offsetWidth;
        const gap = 16;
        const maxDragX = timelineWidth - scrollerWidth - 2 * gap;
        const progress = (this.x - gap) / maxDragX;
        gsap.to(inner, {
          x: -((inner.scrollWidth - window.innerWidth) * progress),
          duration: 0.3,
          ease: "power3.out",
        });
      },
    });

  }, []);

  return (
    <>
      <div className="hs-wrapper" ref={hsWrapperRef}>
        <div className="hs-inner" ref={hsInnerRef}>
          <section id="hs-section-1" className="hs-section">
            <h1>
              Beyond the Veil, Threads Woven from the Shadows of Tomorrow is launching soon
            </h1>
            <p>
              In a world frayed at the edges, our garments emerge as relics of a darker future.
            </p>
          </section>
          <section id="hs-section-2" className="hs-section">
            <div className="hs-img hs-img-1">
              <img src="/assets/img-1.jpg" alt="Image 1" />
            </div>
            <div className="hs-img hs-img-2">
              <img src="/assets/img-2.jpg" alt="Image 2" />
            </div>
            <div className="hs-img hs-img-3">
              <img src="/assets/img-3.jpg" alt="Image 3" />
            </div>
          </section>
          <section id="hs-section-3" className="hs-section">
            <div className="hs-img hs-img-4">
              <img src="/assets/img-4.jpg" alt="Image 4" />
            </div>
            <div className="hs-img hs-img-5">
              <img src="/assets/img-5.jpg" alt="Image 5" />
            </div>
            <div className="hs-img hs-img-6">
              <img src="/assets/img-6.jpg" alt="Image 6" />
            </div>
          </section>
          <section id="hs-section-4" className="hs-section">
            <h1>
              Echoes of Rebellion, Couture Crafted for the Last Stand
            </h1>
            <p>
              In the shadows of crumbling skyscrapers and forgotten streets, our fashion emerges as a beacon of defiance.
            </p>
          </section>
          <section id="hs-section-5" className="hs-section">
            <div className="hs-img hs-img-7">
              <img src="/assets/img-7.jpg" alt="Image 7" />
            </div>
            <div className="hs-img hs-img-8">
              <img src="/assets/img-8.jpg" alt="Image 8" />
            </div>
            <div className="hs-img hs-img-9">
              <img src="/assets/img-9.jpg" alt="Image 9" />
            </div>
          </section>
        </div>
      </div>

      {/* The timeline with draggable scroller appears only when interacting */}
      <div className="hs-timeline" ref={hsTimelineRef}>
        <div className="hs-scroller" ref={hsScrollerRef}>
          <p>[<span>Drag</span>]</p>
        </div>
      </div>

      
    </>
  );
}
